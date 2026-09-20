import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryCollectionsProps {
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
  deviceMode?: 'auto' | 'mobile' | 'laptop' | 'desktop';
}

export const CategoryCollections: React.FC<CategoryCollectionsProps> = ({
  activeCategory,
  onSelectCategory,
  deviceMode = 'auto'
}) => {
  const isForcedMobile = deviceMode === 'mobile';
  return (
    <section className="w-full py-8 sm:py-12 lg:py-14 bg-[#faf7f5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Heading with decorative lines matching image */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <p className="text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#c83264] uppercase mb-1">
            SHOP BY CATEGORY
          </p>
          <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4">
            <span className="h-[1px] w-8 xs:w-12 sm:w-20 bg-stone-300" />
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-normal text-stone-900 tracking-tight">
              Explore Our Collections
            </h2>
            <span className="h-[1px] w-8 xs:w-12 sm:w-20 bg-stone-300" />
          </div>
        </div>

        {/* Categories Grid:
            - Mobile (< sm): 3 items row 1 + 2 items row 2, exactly as shown on the phone mockup
            - Tablet (sm - lg): 3 or 5 items
            - Laptop & Desktop (lg+): 5 columns in 1 row
        */}
        <div className="space-y-2.5 sm:space-y-0">
          {/* Mobile view (< sm or isForcedMobile) */}
          <div className={`${isForcedMobile ? 'block' : 'block sm:hidden'} space-y-2.5`}>
            {/* Row 1: 3 cards (Skincare, Makeup, Body Care) */}
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.slice(0, 3).map((cat) => {
                const isSelected = activeCategory === cat.name;
                return (
                  <div
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.name)}
                    className={`group cursor-pointer rounded-xl overflow-hidden bg-white border transition-all duration-200 shadow-2xs flex flex-col ${
                      isSelected
                        ? 'border-[#c83264] ring-1 ring-[#c83264]'
                        : 'border-stone-200/90 hover:border-rose-300'
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/category-body-care.jpg';
                        }}
                      />
                    </div>
                    <div className="p-1.5 xs:p-2 flex items-center justify-center text-center bg-white">
                      <span className="text-[10px] xs:text-[11px] font-semibold text-stone-800 leading-tight">
                        {cat.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Row 2: 2 cards centered (Hair Care, Fragrance) */}
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              {CATEGORIES.slice(3, 5).map((cat) => {
                const isSelected = activeCategory === cat.name;
                return (
                  <div
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.name)}
                    className={`group cursor-pointer rounded-xl overflow-hidden bg-white border transition-all duration-200 shadow-2xs flex flex-col ${
                      isSelected
                        ? 'border-[#c83264] ring-1 ring-[#c83264]'
                        : 'border-stone-200/90 hover:border-rose-300'
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/category-body-care.jpg';
                        }}
                      />
                    </div>
                    <div className="p-1.5 xs:p-2 flex items-center justify-center text-center bg-white">
                      <span className="text-[10px] xs:text-[11px] font-semibold text-stone-800 leading-tight">
                        {cat.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tablet, Laptop, and Desktop view (sm+) */}
          <div className={`${isForcedMobile ? 'hidden' : 'hidden sm:grid'} sm:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-4 lg:gap-5`}>
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.name;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.name)}
                  className={`group cursor-pointer rounded-2xl overflow-hidden bg-white border transition-all duration-300 hover:shadow-lg flex flex-col ${
                    isSelected
                      ? 'border-[#c83264] ring-2 ring-[#c83264]/20 shadow-md'
                      : 'border-stone-200/90 hover:border-rose-200'
                  }`}
                >
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/category-body-care.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />

                    <span className="absolute top-2 right-2 text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-stone-700 px-2 py-0.5 rounded-full shadow-2xs">
                      {cat.itemCount} items
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white border-t border-stone-100">
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors truncate ${
                        isSelected ? 'text-[#c83264]' : 'text-stone-800 group-hover:text-[#c83264]'
                      }`}
                    >
                      {cat.name}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ml-1 ${
                        isSelected
                          ? 'bg-[#c83264] text-white'
                          : 'bg-stone-100 text-stone-500 group-hover:bg-rose-100 group-hover:text-[#c83264]'
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
