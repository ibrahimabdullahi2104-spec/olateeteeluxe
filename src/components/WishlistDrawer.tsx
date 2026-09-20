import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: () => void;
  currentCurrency?: CurrencyCode;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onAddAllToCart,
  currentCurrency = 'NGN'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-2 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fefdfc] shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300 border-l border-stone-200">
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#c83264] fill-[#c83264]" />
              <h2 className="text-base sm:text-lg font-serif-luxury font-bold text-stone-900">
                Your Saved Wishlist
              </h2>
              <span className="text-xs bg-rose-100 text-[#c83264] px-2 py-0.5 rounded-full font-bold">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-rose-50 text-[#c83264] rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-base font-serif-luxury text-stone-800 font-semibold">
                  Your wishlist is empty
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any product to save it here for later.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="py-3.5 flex gap-3.5 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">{product.category}</p>
                      <p className="text-xs font-bold text-stone-900 mt-1">
                        {formatPrice(product.price, currentCurrency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                        }}
                        className="p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="Add to Shopping Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {wishlistProducts.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200">
              <button
                onClick={onAddAllToCart}
                className="w-full py-3 px-4 bg-[#a06922] hover:bg-[#89571a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
