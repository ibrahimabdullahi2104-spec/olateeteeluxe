import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { CurrencyCode } from '../utils/currency';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  currentCurrency?: CurrencyCode;
  deviceMode?: 'auto' | 'mobile' | 'laptop' | 'desktop';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  currentCurrency = 'NGN',
  deviceMode = 'auto'
}) => {
  const isForcedMobile = deviceMode === 'mobile';
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = ['All', 'Skincare', 'Makeup', 'Body Care', 'Hair Care', 'Fragrance'];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all' && activeCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, activeCategory, sortBy]);

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-[#faf7f5]" id="products-section">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-medium text-stone-900 tracking-tight">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-normal mt-1">
            Our most loved products, trusted by thousands
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 sm:pb-6 mb-5 sm:mb-6 border-b border-stone-200/80">
          {/* Category Pill Filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isSelected =
                (cat === 'All' && (activeCategory === 'all' || activeCategory === 'All')) ||
                activeCategory.toLowerCase() === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat === 'All' ? 'all' : cat)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#c83264] text-white shadow-2xs'
                      : 'bg-white text-stone-700 hover:bg-rose-50/80 hover:text-[#c83264] border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-stone-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-stone-400 hidden xs:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200 text-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#c83264] cursor-pointer"
            >
              <option value="featured">Featured &amp; Bestselling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid:
            - Phone (xs, < sm): 2 columns
            - Tablet (sm - md): 2 to 3 columns
            - Laptop (lg): 4 columns
            - Desktop (xl+): 4 columns
        */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-base font-serif-luxury text-stone-700">No products found in this category</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-3 text-xs text-[#c83264] font-semibold hover:underline cursor-pointer"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-2 ${isForcedMobile ? 'grid-cols-2 gap-2.5 xs:gap-3' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-5 lg:gap-6'}`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                currentCurrency={currentCurrency}
                deviceMode={deviceMode}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
