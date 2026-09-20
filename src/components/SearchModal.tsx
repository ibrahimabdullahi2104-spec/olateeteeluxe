import React, { useState, useMemo } from 'react';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currentCurrency?: CurrencyCode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  currentCurrency = 'NGN'
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.benefits && p.benefits.some((b) => b.toLowerCase().includes(q))) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 text-center">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-stone-200 animate-in zoom-in-95 duration-150">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#c83264]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search face creams, serums, body oils, makeup, fragrances..."
              className="flex-1 text-sm sm:text-base text-stone-800 placeholder-stone-400 focus:outline-none bg-transparent"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-2 py-1 rounded hover:bg-stone-100"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="p-6 bg-stone-50/70 space-y-4">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Face Cream',
                  'Glow Body Oil',
                  'Vitamin C Serum',
                  'Cleanser',
                  'Lip Elixir',
                  'Royal Oud',
                  'Brightening'
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-700 hover:border-[#c83264] hover:text-[#c83264] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="max-h-96 overflow-y-auto p-4 sm:p-5">
              {searchResults.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm font-semibold text-stone-800">
                    No results found for "{query}"
                  </p>
                  <p className="text-xs text-stone-500">
                    Try searching for terms like "cream", "oil", "serum", or "perfume".
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                    {searchResults.length} Products Found
                  </p>
                  <div className="divide-y divide-stone-100">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-rose-50/30 p-2 rounded-xl transition-colors"
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-stone-200 bg-stone-50"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#c83264] transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-stone-500">{product.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-bold text-stone-900">
                            {formatPrice(product.price, currentCurrency)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product);
                            }}
                            className="p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
