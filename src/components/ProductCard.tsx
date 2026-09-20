import React from 'react';
import { Heart, ShoppingBag, Eye, Star, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { createProductInquiryWhatsAppUrl } from '../utils/whatsapp';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  currentCurrency?: CurrencyCode;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  currentCurrency = 'NGN'
}) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-stone-200/80 hover:border-rose-200 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/golden-glow-body-oil.jpg';
          }}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 max-w-[calc(100%-2.5rem)] flex flex-col items-start gap-1 z-10">
          {product.badge && (
            <span
              className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-2xs ${
                product.badge === 'Bestseller'
                  ? 'bg-amber-600 text-white'
                  : product.badge === 'Trending'
                  ? 'bg-[#c83264] text-white'
                  : 'bg-stone-900 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-[9px] sm:text-[10px] font-bold bg-rose-100 text-[#c83264] px-1.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs z-10 ${
            isWishlisted
              ? 'bg-[#c83264] text-white'
              : 'bg-white/90 text-stone-600 hover:text-[#c83264] hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button on Desktop/Laptop Hover */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 px-3 bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold rounded-lg shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-2.5 xs:p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Volume: wraps gracefully so text is never truncated */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-[11px] text-stone-500 mb-1">
            <span className="font-semibold tracking-wider text-rose-700/90 uppercase whitespace-nowrap">
              {product.category}
            </span>
            {product.volume && (
              <span className="text-stone-400 text-[10px] whitespace-nowrap">
                • {product.volume}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-2 hover:text-[#c83264] transition-colors cursor-pointer leading-snug min-h-[2.25rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <div className="flex text-amber-400 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-stone-500 whitespace-nowrap">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-stone-100 flex flex-col gap-2">
          {/* Price with flex-wrap: if original price doesn't fit on the side, it moves below */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm xs:text-base sm:text-lg font-bold text-stone-900 whitespace-nowrap">
              {formatPrice(product.price, currentCurrency)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through whitespace-nowrap">
                {formatPrice(product.originalPrice, currentCurrency)}
              </span>
            )}
          </div>

          {/* Action Buttons: Stacked on mobile so full text is always readable, 2-cols on desktop */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2 px-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] sm:text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
              title="Add to shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Add to Bag</span>
            </button>

            <a
              href={createProductInquiryWhatsAppUrl(product.name, product.price, product.volume, currentCurrency)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] sm:text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-all text-center whitespace-nowrap"
              title="Order this product directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
