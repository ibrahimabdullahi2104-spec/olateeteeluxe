import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { createProductInquiryWhatsAppUrl, FORMATTED_WHATSAPP } from '../utils/whatsapp';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currentCurrency?: CurrencyCode;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  currentCurrency = 'NGN'
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const images = [product.image, ...(product.secondaryImages || [])];
  const activeImage = images[activeImageIndex] || product.image;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-stone-200 animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 bg-white/90 hover:bg-white rounded-full shadow-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: High-Resolution Gallery */}
            <div className="p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-100">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-stone-200/80">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/golden-glow-body-oil.jpg';
                  }}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#c83264] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#c83264] ring-2 ring-[#c83264]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold text-rose-700 tracking-wider uppercase">
                    {product.category} {product.subcategory && `• ${product.subcategory}`}
                  </span>
                  {product.volume && (
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-medium">
                      {product.volume}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900 leading-tight">
                  {product.name}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-700">
                    {product.rating} ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-bold text-stone-900">
                    {formatPrice(product.price, currentCurrency)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(product.originalPrice, currentCurrency)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>

                {/* Key Benefits */}
                {product.benefits && (
                  <div className="mt-4 space-y-1.5 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                    <p className="text-[11px] font-bold text-[#8d5b1d] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#c83264]" />
                      <span>Key Benefits</span>
                    </p>
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                {/* Quantity & Wishlist */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`flex-1 py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-[#c83264] text-[#c83264]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#c83264]' : ''}`} />
                    <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                </div>

                {/* Primary Action Buttons: Add to Bag + WhatsApp Direct Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(product.price * quantity, currentCurrency)}</span>
                  </button>

                  <a
                    href={createProductInquiryWhatsAppUrl(product.name, product.price * quantity, product.volume, currentCurrency)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

                <p className="text-[10px] text-center text-stone-400">
                  Direct WhatsApp Hotline: {FORMATTED_WHATSAPP}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
