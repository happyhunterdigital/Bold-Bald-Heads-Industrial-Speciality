import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, ShieldCheck, Beaker, RotateCcw } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductToQuote?: (sku: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am the Bold Bald Heads Chemical Consultant AI, powered by Gemini on our server. Ask me anything about chemical dilution ratios, NRCS/Intertek compliance, hospital pathogen eradication, or site-specific chemical selection for your facility!'
    }
  ]);

  const [input, setInput] = useState('');
  const [sector, setSector] = useState('Healthcare');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          sector,
          facilityType: 'Commercial Facility',
          targetArea: 'Hygiene & Chemical Selection'
        })
      });

      const data = await res.json();
      setLoading(false);

      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: 'For immediate technical assistance, please call our Thohoyandou engineering desk at 015 969 1102 or email info@bbhchemicals.co.za.'
          }
        ]);
      }
    } catch (err) {
      setLoading(false);
      console.error('AI Advisor error:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Our technical advice desk is available at 015 969 1102. For your query, we recommend using NRCS-registered disinfectants and SABS ISO 9001 certified cleaning products with site-specific dilution ratios.'
        }
      ]);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInput(promptText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-hidden">
      <div className="bg-white border-2 border-[#6ee7b7] rounded-3xl w-full max-w-3xl text-[#064e3b] shadow-2xl flex flex-col h-[85vh] max-h-[700px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#064e3b] px-5 py-4 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#6ee7b7] text-[#064e3b]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base font-sans">BBH AI Chemical Consultant</h3>
                <span className="text-[10px] font-bold text-[#064e3b] bg-[#6ee7b7] px-2 py-0.5 rounded-full">
                  Gemini AI
                </span>
              </div>
              <p className="text-xs text-[#6ee7b7]">
                Site-Specific Formulations & Compliance Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sector Context Picker */}
        <div className="bg-[#f0fdf4] px-5 py-2.5 border-b border-[#6ee7b7] flex items-center justify-between gap-2 shrink-0 text-xs font-bold">
          <span className="text-[#047857] text-xs flex items-center gap-1">
            <Beaker className="w-4 h-4 text-[#064e3b]" /> Sector Context:
          </span>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="bg-white text-[#064e3b] border border-[#6ee7b7] rounded-full px-3 py-1 text-xs font-bold focus:outline-none"
          >
            <option value="Healthcare">Healthcare / Hospitals</option>
            <option value="Food Processing">Food Processing & Dairies</option>
            <option value="Hospitality">Hospitality & Safari Lodges</option>
            <option value="Facilities Management">Facilities Management</option>
            <option value="Mortuaries">Mortuaries & Funeral Parlors</option>
            <option value="Automotive">Automotive & Car Wash</option>
            <option value="Commercial Laundry">Commercial Laundries</option>
          </select>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-white">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-4 space-y-1 shadow-md leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#6ee7b7] text-[#064e3b] font-bold rounded-br-none'
                    : 'bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7] rounded-bl-none font-semibold'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="text-xs font-bold text-[#064e3b] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#064e3b]" /> BBH Technical Consultant
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7] p-3.5 rounded-3xl text-xs flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 animate-spin text-[#064e3b]" />
                <span>Consulting BBH ISO 9001 Technical Database...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-[#f0fdf4] border-t border-[#6ee7b7] flex items-center gap-2 overflow-x-auto shrink-0 text-xs">
          <span className="text-[#047857] font-bold whitespace-nowrap">Suggested:</span>
          <button
            onClick={() => handleQuickPrompt("What chemical dilution is best for hospital operating theater floor sanitization?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#6ee7b7]/30 border border-[#6ee7b7] whitespace-nowrap text-[#064e3b] font-semibold"
          >
            Hospital Floor Dilution?
          </button>
          <button
            onClick={() => handleQuickPrompt("Which BBH products carry Intertek, Halaal, and Kosher certifications for dairy plants?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#6ee7b7]/30 border border-[#6ee7b7] whitespace-nowrap text-[#064e3b] font-semibold"
          >
            Dairy Intertek & Halaal Products?
          </button>
          <button
            onClick={() => handleQuickPrompt("How can our safari lodge reduce commercial laundry chemical costs by 30%?")}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#6ee7b7]/30 border border-[#6ee7b7] whitespace-nowrap text-[#064e3b] font-semibold"
          >
            Safari Lodge Laundry Savings?
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-[#f0fdf4] border-t border-[#6ee7b7] flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ask a technical chemical question (e.g., dilution, compliance, surface safety)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white text-[#064e3b] text-xs p-3 rounded-full border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none font-semibold placeholder-[#047857]/60"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] disabled:opacity-50 text-[#064e3b] font-bold transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
