import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { CurrencyCode } from './utils/currency';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TrustBadges } from './components/TrustBadges';
import { CategoryCollections } from './components/CategoryCollections';
import { PromoBanner } from './components/PromoBanner';
import { DrySkinRoutineSpotlight } from './components/DrySkinRoutineSpotlight';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductQuickView } from './components/ProductQuickView';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AccountModal } from './components/AccountModal';
import { AboutContactModal } from './components/AboutContactModal';
import { AboutPage } from './components/AboutPage';
import { InternationalPaymentsModal } from './components/InternationalPaymentsModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { DeviceModeBar, DeviceMode } from './components/DeviceModeBar';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Device viewport simulator mode: 'auto' | 'mobile' | 'laptop' | 'desktop'
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');

  // Currency selection state (supports all global currencies, default NGN for OPAY)
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('olateetee_currency');
      return (saved as CurrencyCode) || 'NGN';
    } catch {
      return 'NGN';
    }
  });

  // 1. Cart state (with localStorage persistence)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('olateetee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Wishlist state (with localStorage persistence)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('olateetee_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // 3. UI Navigation and Modals state
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'shop'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [aboutContact, setAboutContact] = useState<{ isOpen: boolean; initialTab: 'about' | 'contact' }>({
    isOpen: false,
    initialTab: 'about'
  });
  const [isInternationalPaymentsOpen, setIsInternationalPaymentsOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 4. Toast notification state
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('olateetee_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('olateetee_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Sync currency to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('olateetee_currency', currentCurrency);
    } catch (e) {
      console.error(e);
    }
  }, [currentCurrency]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to your shopping bag! ✨`);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from wishlist.`);
      } else {
        next.add(product.id);
        showToast(`Saved "${product.name}" to your wishlist! ❤️`);
      }
      return next;
    });
  };

  const handleAddAllWishlistToCart = () => {
    const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
    wishlistProducts.forEach((p) => handleAddToCart(p, 1));
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Navigation handlers
  const navigateToHome = () => {
    setCurrentPage('home');
    setActiveCategory('all');
    setActiveMobileTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAboutPage = () => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category selection handler
  const handleSelectCategory = (categoryName: string) => {
    setCurrentPage('home');
    setActiveCategory(categoryName);
    setActiveMobileTab('shop');
    setTimeout(() => {
      const elem = document.getElementById('products-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToShop = () => {
    setCurrentPage('home');
    setActiveCategory('all');
    setActiveMobileTab('shop');
    setTimeout(() => {
      const elem = document.getElementById('products-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  // Determine wrapper styling based on simulated device mode
  const getContainerClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-full max-w-[390px] mx-auto shadow-2xl border-x border-stone-300 min-h-screen relative bg-[#faf7f5] overflow-x-hidden';
      case 'laptop':
        return 'w-full max-w-[1024px] mx-auto shadow-2xl border-x border-stone-300 min-h-screen relative bg-[#faf7f5] overflow-x-hidden';
      case 'desktop':
        return 'w-full max-w-[1440px] mx-auto shadow-2xl border-x border-stone-300 min-h-screen relative bg-[#faf7f5] overflow-x-hidden';
      case 'auto':
      default:
        return 'w-full min-h-screen relative bg-[#faf7f5] overflow-x-hidden';
    }
  };

  return (
    <div className={`min-h-screen ${deviceMode !== 'auto' ? 'bg-stone-900/90 py-4 px-2 flex flex-col items-center' : 'bg-[#faf7f5]'}`}>
      {/* 0. Responsive Device Mode Switcher Bar */}
      <DeviceModeBar currentMode={deviceMode} onModeChange={setDeviceMode} />

      {/* Main Responsive Storefront Container */}
      <div className={`${getContainerClass()} flex flex-col font-sans antialiased text-stone-800 selection:bg-rose-100 selection:text-rose-900`}>
        {/* Toast Notification */}
        {toast.visible && (
          <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-stone-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-700 animate-in slide-in-from-top-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{toast.message}</span>
          </div>
        )}

        {/* 1. Header with Announcement Bar & Navigation */}
        <Header
          deviceMode={deviceMode}
          currentPage={currentPage}
          cartCount={cartCount}
          wishlistCount={wishlistIds.size}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onNavigateHome={navigateToHome}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenContact={() => setAboutContact({ isOpen: true, initialTab: 'contact' })}
          onOpenAbout={openAboutPage}
          onOpenInternationalGuide={() => setIsInternationalPaymentsOpen(true)}
          currentCurrency={currentCurrency}
          onSelectCurrency={setCurrentCurrency}
        />

        <main className="flex-1 pb-16 lg:pb-0">
          {currentPage === 'about' ? (
            <AboutPage
              onBackToShop={scrollToShop}
              onSelectCategory={handleSelectCategory}
              onOpenInternationalGuide={() => setIsInternationalPaymentsOpen(true)}
            />
          ) : (
            <>
              {/* 2. Hero Banner: Reveal Your Natural Glow */}
              <HeroBanner onShopNow={scrollToShop} deviceMode={deviceMode} />

              {/* 3. Trust Badges: Fast Delivery, 100% Authentic, Secure, Support */}
              <TrustBadges />

              {/* 4. Category Collections: Explore Our Collections */}
              <CategoryCollections
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
              />

              {/* 5. Promotional Feature Banner: Healthy Skin, Happy You */}
              <PromoBanner
                onShopSkincare={() => handleSelectCategory('Skincare')}
                deviceMode={deviceMode}
              />

              {/* 5.1 Dry Skin Girlie Routine Spotlight & Video Reel */}
              <DrySkinRoutineSpotlight
                packageProduct={PRODUCTS.find((p) => p.id === 'ol-24')}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setQuickViewProduct(p)}
                currentCurrency={currentCurrency}
                deviceMode={deviceMode}
              />

              {/* 6. Best Sellers Grid: Our most loved products, trusted by thousands */}
              <ProductGrid
                products={PRODUCTS}
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat)}
                wishlistIds={wishlistIds}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                currentCurrency={currentCurrency}
              />
            </>
          )}
        </main>

        {/* 7. Footer */}
        <Footer
          onSelectCategory={handleSelectCategory}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          onOpenAbout={openAboutPage}
          onOpenContact={() => setAboutContact({ isOpen: true, initialTab: 'contact' })}
          onOpenInternationalGuide={() => setIsInternationalPaymentsOpen(true)}
        />

        {/* 8. Floating WhatsApp Action Button (+21891-3097994) */}
        <WhatsAppFloatingButton />

        {/* 9. Mobile Bottom Navigation Bar (Phone & Tablet viewports) */}
        <MobileBottomNav
          activeTab={activeMobileTab}
          cartCount={cartCount}
          wishlistCount={wishlistIds.size}
          onSelectHome={navigateToHome}
          onSelectShop={scrollToShop}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 10. Drawers & Modals */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          currentCurrency={currentCurrency}
          onSelectCurrency={setCurrentCurrency}
          onOpenInternationalGuide={() => setIsInternationalPaymentsOpen(true)}
          onOpenTrackOrder={() => {
            setIsCartOpen(false);
            setIsTrackOrderOpen(true);
          }}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={(id) => {
            const p = PRODUCTS.find((x) => x.id === id);
            if (p) handleToggleWishlist(p);
          }}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onAddAllToCart={handleAddAllWishlistToCart}
          currentCurrency={currentCurrency}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          currentCurrency={currentCurrency}
        />

        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
          currentCurrency={currentCurrency}
        />

        <TrackOrderModal
          isOpen={isTrackOrderOpen}
          onClose={() => setIsTrackOrderOpen(false)}
        />

        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onOpenWishlist={() => {
            setIsAccountOpen(false);
            setIsWishlistOpen(true);
          }}
        />

        <AboutContactModal
          isOpen={aboutContact.isOpen}
          initialTab={aboutContact.initialTab}
          onClose={() => setAboutContact({ isOpen: false, initialTab: 'about' })}
        />

        <InternationalPaymentsModal
          isOpen={isInternationalPaymentsOpen}
          onClose={() => setIsInternationalPaymentsOpen(false)}
          defaultCurrency={currentCurrency}
        />
      </div>
    </div>
  );
}
