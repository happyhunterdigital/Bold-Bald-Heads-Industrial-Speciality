import React, { useState, useMemo } from 'react';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/productsData';
import { Product, CategoryId, ChemicalBase } from '../types';
import { 
  Search, 
  Filter, 
  Beaker, 
  FileText, 
  Plus, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  Tag
} from 'lucide-react';

interface ProductCatalogProps {
  onSelectProductSDS: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartProductIds: string[];
}

// Individual Product Card Component with On-Card Dilution Calculator
const ProductCard: React.FC<{
  product: Product;
  inCart: boolean;
  onSelectProductSDS: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}> = ({ product, inCart, onSelectProductSDS, onAddToCart }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [tankCapacityL, setTankCapacityL] = useState<number>(500);

  // Dilution calculation logic
  const dilutionFactor = product.dilutionRatioNumeric && product.dilutionRatioNumeric > 0 
    ? product.dilutionRatioNumeric 
    : 50;
  
  const concentrateNeededL = Math.round((tankCapacityL / dilutionFactor) * 10) / 10;

  return (
    <div className="bg-white rounded-3xl border-t-4 border-[#6ee7b7] shadow-xl hover:shadow-2xl hover:border-[#fda4af] p-8 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
      <div>
        {/* Top Bar: SKU, Base & pH */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono font-bold text-[#064e3b] bg-[#f0fdf4] px-3 py-1 rounded-full border border-[#6ee7b7]/40">
            SKU: {product.sku}
          </span>
          <div className="flex items-center gap-1.5">
            {product.phLevel !== undefined && (
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                product.phLevel < 6 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : product.phLevel > 8 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                pH {product.phLevel}
              </span>
            )}
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#064e3b] text-[#f0fdf4]">
              {product.base} Base
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-[#064e3b] group-hover:text-[#047857] transition-colors font-sans mb-2">
          {product.name}
        </h3>

        {/* Compliance & GHS Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.compliance.map((badge, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#f0fdf4] text-[#047857] border border-[#6ee7b7]"
            >
              {badge}
            </span>
          ))}
          {product.ghsPictograms?.map((ghs, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#fda4af]/20 text-[#064e3b] border border-[#fda4af]/40"
            >
              {ghs}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs text-[#047857] leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Specs List */}
        <div className="space-y-1.5 text-[11px] text-[#047857] border-t border-[#6ee7b7]/30 pt-3 mb-3 font-medium">
          <div className="flex justify-between">
            <span className="text-[#047857]/70 font-mono">Dilution:</span>
            <span className="text-[#064e3b] font-bold">{product.dilutionRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#047857]/70 font-mono">Packs:</span>
            <span className="text-[#064e3b] font-bold">{product.packSizes.join(', ')}</span>
          </div>
          {product.stockStatus && (
            <div className="flex justify-between text-[10px] font-mono text-[#064e3b] pt-1 font-bold">
              <span>Plant Stock:</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#064e3b] animate-pulse"></span>
                In Stock
              </span>
            </div>
          )}
        </div>

        {/* Toggleable On-Card Dilution Calculator */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="w-full py-2 px-3 rounded-2xl bg-[#f0fdf4] hover:bg-[#6ee7b7]/30 text-[#064e3b] text-[11px] font-bold border border-[#6ee7b7] transition-all flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-[#047857]" />
              <span>Dilution & Tank Calculator</span>
            </span>
            <span className="text-xs">{showCalculator ? '▲ Hide' : '▼ Calculate'}</span>
          </button>

          {showCalculator && (
            <div className="mt-2 p-3 rounded-2xl bg-[#f0fdf4] border border-[#6ee7b7] space-y-2 text-xs font-mono animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between gap-2">
                <label className="text-[11px] text-[#047857]">Target Tank (Litres):</label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  step="50"
                  value={tankCapacityL}
                  onChange={(e) => setTankCapacityL(Math.max(10, Number(e.target.value)))}
                  className="w-24 px-2 py-1 rounded-xl bg-white border border-[#6ee7b7] text-[#064e3b] font-bold text-xs text-right focus:border-[#064e3b] focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-[#6ee7b7]/30 flex items-center justify-between text-[11px]">
                <span className="text-[#047857]">Required Concentrate:</span>
                <span className="text-[#064e3b] font-extrabold text-sm bg-white px-2 py-0.5 rounded-full border border-[#6ee7b7]">
                  {concentrateNeededL} Litres
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Bottom Actions */}
      <div className="pt-3 border-t border-[#6ee7b7]/30 flex items-center gap-2">
        {/* Open SDS Modal */}
        <button
          onClick={() => onSelectProductSDS(product)}
          className="flex-1 py-2.5 px-3 rounded-full bg-[#f0fdf4] hover:bg-white text-[#064e3b] text-xs font-bold border border-[#6ee7b7] transition-colors flex items-center justify-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-[#047857]" />
          <span>View SDS</span>
        </button>

        {/* Add to Quote Estimator */}
        <button
          onClick={() => onAddToCart(product)}
          className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            inCart
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] shadow-md'
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>In Quote</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Quote</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProductSDS,
  onAddToCart,
  cartProductIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedBase, setSelectedBase] = useState<ChemicalBase | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBase = selectedBase === 'all' || product.base === selectedBase;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.compliance.some(c => c.toLowerCase().includes(query)) ||
        product.recommendedSectors.some(s => s.toLowerCase().includes(query));

      return matchesCategory && matchesBase && matchesSearch;
    });
  }, [selectedCategory, selectedBase, searchQuery]);

  return (
    <section id="products" className="py-24 bg-[#f0fdf4] text-[#064e3b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ee7b7]/30 text-[#064e3b] text-xs font-bold border border-[#6ee7b7]">
            <Beaker className="w-4 h-4 text-[#064e3b]" />
            ISO 9001 Batch-Certified Chemical Catalog
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#064e3b] font-sans">
            Products & Service Ranges
          </h2>
          <div className="w-24 h-2 bg-[#fda4af] rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-[#047857]">
            Browse our complete range of industrial cleaning detergents, NRCS disinfectants, food processing sanitizers, automotive formulations, and private label blending solutions.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#6ee7b7]/40 shadow-xl mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-[#047857] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search chemical name, SKU (e.g. BBH-IND), compliance (NRCS, Intertek)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#f0fdf4] text-[#064e3b] text-sm font-semibold border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#047857] hover:text-[#064e3b]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Base Chemical Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-[#047857] font-bold uppercase whitespace-nowrap flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#064e3b]" /> Base:
              </span>
              {(['all', 'Water', 'Solvent', 'Oil', 'Powder', 'Gel'] as const).map((base) => (
                <button
                  key={base}
                  onClick={() => setSelectedBase(base)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedBase === base
                      ? 'bg-[#064e3b] text-white'
                      : 'bg-[#f0fdf4] text-[#047857] hover:bg-[#6ee7b7]/30'
                  }`}
                >
                  {base === 'all' ? 'All Bases' : base}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-[#6ee7b7]/30 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#6ee7b7] text-[#064e3b] shadow-md'
                  : 'bg-[#f0fdf4] text-[#047857] hover:bg-[#6ee7b7]/20'
              }`}
            >
              All Ranges ({PRODUCTS.length})
            </button>

            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#064e3b] text-white font-bold shadow-md'
                    : 'bg-[#f0fdf4] text-[#047857] hover:bg-[#6ee7b7]/20 border border-[#6ee7b7]/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter & Active Filter Badge */}
        <div className="flex items-center justify-between text-xs text-[#047857] mb-6 font-bold">
          <span>
            Showing <strong className="text-[#064e3b]">{filteredProducts.length}</strong> formulation(s)
          </span>
          {(selectedCategory !== 'all' || selectedBase !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBase('all');
                setSearchQuery('');
              }}
              className="text-[#fda4af] hover:underline cursor-pointer font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inCart={cartProductIds.includes(product.id)}
                onSelectProductSDS={onSelectProductSDS}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-[#6ee7b7] p-8 space-y-3 shadow-lg">
            <AlertCircle className="w-10 h-10 text-[#064e3b] mx-auto" />
            <h3 className="text-lg font-bold text-[#064e3b]">No chemical products match your filter criteria.</h3>
            <p className="text-xs text-[#047857] max-w-md mx-auto">
              Try resetting your search query, or contact our Thohoyandou R&D lab for custom private label blending or third-party chemical formulation.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBase('all');
                setSearchQuery('');
              }}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#064e3b] text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
