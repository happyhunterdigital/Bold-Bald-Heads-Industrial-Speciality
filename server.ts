import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // Initialize Gemini AI Client lazily or at server startup
  const getGeminiAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "online",
      company: "Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd",
      location: "Thohoyandou, Limpopo Province, South Africa",
      bbbee: "Level 1 Accredited",
      timestamp: new Date().toISOString(),
    });
  });

  // Quote Request Handler
  app.post("/api/quote", (req, res) => {
    const quoteData = req.body;
    
    if (!quoteData || !quoteData.companyName || !quoteData.email) {
      return res.status(400).json({
        success: false,
        message: "Missing required company contact details.",
      });
    }

    const referenceNumber = `BBH-QT-${Date.now().toString().slice(-6)}`;
    
    // Simulate quote processing & storage
    return res.json({
      success: true,
      referenceNumber,
      message: `Quote request ${referenceNumber} received successfully! A BBH chemical specialist will reach out within 2 hours.`,
      quoteDetails: {
        ...quoteData,
        referenceNumber,
        submittedAt: new Date().toISOString(),
      },
    });
  });

  // Distributor Registration Handler (Fabri Fresh SLA)
  // Accepts JSON with base64-encoded files (ID + proof of payment) to avoid
  // multipart deps. Files: [{ kind, name, type, size, dataUrl }]
  app.post("/api/distributors", (req, res) => {
    const {
      fullName,
      idNumber,
      cellphone,
      email,
      address,
      tradingLocation,
      distributorType,
      paymentMethod,
      signedAt,
      signatureName,
      acceptTerms,
      files,
    } = req.body ?? {};

    if (!fullName || !idNumber || !cellphone || !email || !address || !tradingLocation || !signedAt || !signatureName) {
      return res.status(400).json({
        success: false,
        message: "Missing required distributor fields. Please complete all marked fields.",
      });
    }
    if (!/^\d{13}$/.test(String(idNumber).trim())) {
      return res.status(400).json({
        success: false,
        message: "SA ID number must be exactly 13 digits.",
      });
    }
    if (!acceptTerms) {
      return res.status(400).json({
        success: false,
        message: "You must accept the Distribution Terms (SLA) to register.",
      });
    }
    const fileList: any[] = Array.isArray(files) ? files : [];
    const hasId = fileList.some((f) => f?.kind === "id");
    const hasPayment = fileList.some((f) => f?.kind === "payment");
    if (!hasId) {
      return res.status(400).json({
        success: false,
        message: "Identity Document upload is required.",
      });
    }
    if (!hasPayment) {
      return res.status(400).json({
        success: false,
        message: "Proof of payment upload is required.",
      });
    }
    // Guard against oversized payloads (~5MB per file base64 => ~7MB encoded)
    const totalBytes = fileList.reduce((sum, f) => sum + (Number(f?.size) || 0), 0);
    if (totalBytes > 16 * 1024 * 1024) {
      return res.status(413).json({
        success: false,
        message: "Uploaded documents exceed the 15MB total limit. Please compress and retry.",
      });
    }

    const referenceNumber = `BBH-DIST-${Date.now().toString().slice(-6)}`;

    // TODO: persist to CRM / object storage + notify info@bbhchemicals.co.za
    console.log(
      `[distributors] ${referenceNumber} ${fullName} (${distributorType ?? "Individual"}) ` +
        `${tradingLocation} | ${paymentMethod ?? "EFT"} | files=${fileList.length}`
    );

    return res.json({
      success: true,
      referenceNumber,
      message:
        `Distributor application ${referenceNumber} received! Our sales office will verify your ID ` +
        `and payment, then issue your starter-stock invoice. Delivery within 48 hours via The Courier Guy.`,
      application: {
        fullName,
        idNumber: String(idNumber).slice(0, 6) + "******",
        cellphone,
        email,
        tradingLocation,
        distributorType,
        paymentMethod,
        signedAt,
        referenceNumber,
        submittedAt: new Date().toISOString(),
        fileCount: fileList.length,
        fileNames: fileList.map((f) => f?.name),
      },
    });
  });

  // On-Site Facility Audit / Contact Form Handler
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, company, sector, message, requestAudit } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid name and email address.",
      });
    }

    const inquiryId = `BBH-INQ-${Date.now().toString().slice(-5)}`;

    return res.json({
      success: true,
      inquiryId,
      message: requestAudit
        ? `Audit request ${inquiryId} logged! Our Limpopo field technical advisor will contact you to schedule the on-site consultation.`
        : `Thank you for contacting Bold Bald Heads Chemicals. Inquiry ${inquiryId} sent to info@bbhchemicals.co.za.`,
    });
  });

  // AI Chemical Advisor Endpoint using Gemini 3.6 Flash
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { prompt, sector, facilityType, targetArea } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const ai = getGeminiAI();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set
        return res.json({
          reply: `Thank you for consulting Bold Bald Heads Chemicals. Based on your query regarding "${prompt}" in the ${sector || "industrial"} sector, our technical engineers recommend using our NRCS-registered disinfectants and SABS ISO 9001 certified cleaning products with site-specific dilution ratios. Please request a formal on-site audit with our Thohoyandou engineering team at 015 969 1102 for guaranteed performance!`,
          isFallback: true,
        });
      }

      const systemInstruction = `
You are the Chief Chemical Consultant and Technical Engineer for Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd (BBH Chemicals), located in Thohoyandou, Limpopo Province, South Africa.
BBH Chemicals is a 100% Black-Owned, Level 1 BBBEE-accredited manufacturer & supplier of industrial and specialty chemicals, detergents, disinfectants, pest control management, and third-party manufacturing.

Company Credentials & Compliance:
- SABS ISO 9001 Quality Management Standards
- NRCS Registered Disinfectants
- Intertek Certified Detergents for Food & Hospitality Industry
- N.H.I.T Halaal & Kosher Kashrut Certified
- NCCA (National Contract Cleaners Association) & PCIPC (Pest Control Industries Professional Council) Member
- Proudly South African Member

Product Ranges Offered:
1. Industrial Range (Heavy duty solvent/water degreasers, descalers, rust treatment)
2. Housekeeping Range (All-surface sanitizers, glass cleaner, odor control)
3. Food Processing Range (Intertek certified CIP cleaners, food-contact QAC-free sanitizers)
4. Kitchen Range (Commercial dishwasher gels, oven/grill degreasers)
5. Laundry Range (Bio-detergents, oxygen bleach, fabric softeners for commercial laundries)
6. Floor Care Range (High-gloss polymer polishes, heavy-duty floor strippers)
7. Eco / Green Range (Bio-degradable, eco-certified detergents)
8. Automotive / Motor Car Wash Range (High-foam auto shampoos, wheel degreasers, engine gel)
9. Pest Control Management Services (PCIPC accredited rodent & insect control)
10. Third-Party Manufacturing (Private label chemical blending & custom formulation)
11. Hygiene Cleaning & COVID-19 / Pathogen Disinfection (ULV cold fogging & deep sanitization)
12. Staff Training & In-Field Consultations (Product knowledge training & performance guarantees)

Answer the user's technical chemical question expertly, professionally, and concisely in South African English. Reference exact compliance standards (e.g. NRCS, Intertek, ISO 9001, Halaal/Kosher) where appropriate, recommend ideal chemical bases (Water, Solvent, Oil, Powder, Gel) and dilution practices, and highlight BBH Chemical's guaranteed workmanship.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Sector: ${sector || "General Industrial"}\nFacility Type: ${facilityType || "Commercial Facility"}\nTarget Area: ${targetArea || "General Cleanliness"}\n\nClient Query: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || "No recommendation generated.",
        isFallback: false,
      });
    } catch (err: any) {
      console.error("Gemini AI Advisor Error:", err);
      return res.status(500).json({
        error: "Failed to generate chemical recommendation.",
        details: err.message,
      });
    }
  });

  // Vite Middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BBH Chemicals App running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
