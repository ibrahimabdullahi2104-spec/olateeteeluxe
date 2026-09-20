import React from 'react';
import { Home, ShoppingBag, Heart, User, ShoppingCart } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  cartCount: number;
  wishlistCount: number;
  onSelectHome: () => void;
  onSelectShop: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  cartCount,
  wishlistCount,
  onSelectHome,
  onSelectShop,
  onOpenWishlist,
  onOpenAccount,
  onOpenCart
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200/90 z-40 lg:hidden shadow-lg safe-area-bottom">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {/* 1. Home */}
        <button
          onClick={onSelectHome}
          className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#c83264]' : 'text-stone-500 hover:text-stone-800'
          }`}
          id="mobile-bottom-home-btn"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">Home</span>
        </button>

        {/* 2. Shop */}
        <button
          onClick={onSelectShop}
          className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === 'shop' ? 'text-[#c83264]' : 'text-stone-500 hover:text-stone-800'
          }`}
          id="mobile-bottom-shop-btn"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">Shop</span>
        </button>

        {/* 3. Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center gap-1 text-stone-500 hover:text-[#c83264] transition-colors relative cursor-pointer"
          id="mobile-bottom-wishlist-btn"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#c83264] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium leading-none">Wishlist</span>
        </button>

        {/* 4. Account */}
        <button
          onClick={onOpenAccount}
          className="flex flex-col items-center justify-center gap-1 text-stone-500 hover:text-[#c83264] transition-colors cursor-pointer"
          id="mobile-bottom-account-btn"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">Account</span>
        </button>

        {/* 5. Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 text-stone-500 hover:text-[#c83264] transition-colors relative cursor-pointer"
          id="mobile-bottom-cart-btn"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-2 bg-[#c83264] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="text-[10px] font-medium leading-none">Cart</span>
        </button>
      </div>
    </nav>
  );
};
