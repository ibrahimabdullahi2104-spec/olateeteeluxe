import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  X,
  Package,
  User,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Landmark,
  Globe
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl } from '../utils/whatsapp';
import { DeviceMode } from './DeviceModeBar';
import { CurrencyCode } from '../utils/currency';
import { CurrencySelector } from './CurrencySelector';

interface HeaderProps {
  deviceMode?: DeviceMode;
  currentPage?: 'home' | 'about';
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onNavigateHome?: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenTrackOrder: () => void;
  onOpenAccount: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
  onOpenInternationalGuide?: () => void;
  currentCurrency?: CurrencyCode;
  onSelectCurrency?: (currency: CurrencyCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  deviceMode = 'auto',
  currentPage = 'home',
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  onNavigateHome,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenTrackOrder,
  onOpenAccount,
  onOpenContact,
  onOpenAbout,
  onOpenInternationalGuide,
  currentCurrency = 'NGN',
  onSelectCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isForcedComputer = deviceMode === 'laptop' || deviceMode === 'desktop';
  const isForcedMobile = deviceMode === 'mobile';

  const navItems = [
    { name: 'HOME', id: 'all', hasDropdown: false },
    {
      name: 'SHOP ALL',
      id: 'shop',
      hasDropdown: true,
      subItems: ['All Products', 'Best Sellers', 'New Arrivals', 'Special Discounts']
    },
    {
      name: 'SKINCARE',
      id: 'Skincare',
      hasDropdown: true,
      subItems: ['Face Creams', 'Cleansers & Toners', 'Glowing Serums & Oils', 'Sun Protection SPF']
    },
    {
      name: 'MAKEUP',
      id: 'Makeup',
      hasDropdown: true,
      subItems: ['Lipsticks & Glosses', 'Highlighters & Glow', 'Foundation & Powder', 'Beauty Tools']
    },
    {
      name: 'BODY CARE',
      id: 'Body Care',
      hasDropdown: true,
      subItems: ['Body Oils & Butters', 'Hydrating Lotions', 'Exfoliating Scrubs', 'Soothing Balms']
    },
    {
      name: 'HAIR CARE',
      id: 'Hair Care',
      hasDropdown: true,
      subItems: ['Growth Oils & Serums', 'Moisturizing Shampoos', 'Deep Conditioners']
    },
    {
      name: 'FRAGRANCE',
      id: 'Fragrance',
      hasDropdown: true,
      subItems: ['Luxury Perfumes', 'Body Mists', 'Scented Oils']
    },
    { name: 'ABOUT US', id: 'about', hasDropdown: false },
    { name: 'CONTACT', id: 'contact', hasDropdown: false }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.name === 'ABOUT US') {
      onOpenAbout();
    } else if (item.name === 'CONTACT') {
      onOpenContact();
    } else if (item.id === 'all' || item.id === 'shop') {
      if (onNavigateHome) onNavigateHome();
      onSelectCategory('all');
    } else {
      if (onNavigateHome) onNavigateHome();
      onSelectCategory(item.id);
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSubItemClick = (categoryId: string) => {
    if (onNavigateHome) onNavigateHome();
    if (categoryId === 'shop') {
      onSelectCategory('all');
    } else {
      onSelectCategory(categoryId);
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#fdfbf9] border-b border-stone-200/80 sticky top-0 z-40 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#c83264] text-white text-[10px] xs:text-[11px] sm:text-xs font-medium py-1.5 px-3 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Announcement text */}
          <div className="flex items-center gap-1.5 sm:gap-4 truncate text-rose-100 font-sans tracking-wide">
            <span className="flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-yellow-300 shrink-0" />
              <span className="font-semibold text-white">Olateetee Luxe</span>
            </span>
            {!isForcedMobile && (
              <>
                <span className="text-rose-300 hidden sm:inline">✦</span>
                <span className="hidden sm:inline font-script text-xs sm:text-sm text-yellow-200 font-normal truncate">
                  Grow Naturally, Glow Confidently ❤️
                </span>
              </>
            )}
          </div>

          {/* Right Links: Currency, Track Order & My Account */}
          <div className="flex items-center gap-2 sm:gap-3 text-rose-100 shrink-0">
            {onSelectCurrency && (
              <div className="text-stone-900 shrink-0">
                <CurrencySelector
                  currentCurrency={currentCurrency}
                  onSelectCurrency={onSelectCurrency}
                  compact
                />
              </div>
            )}
            {!isForcedMobile && (
              <>
                <span className="text-rose-300/60 hidden xl:inline">|</span>
                <a
                  href={createWhatsAppChatUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden xl:flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px] xs:text-[11px] sm:text-xs whitespace-nowrap"
                  title="Order on WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300" />
                  <span className="font-medium text-emerald-200 hover:text-white">WhatsApp: {FORMATTED_WHATSAPP}</span>
                </a>
              </>
            )}
            <span className="text-rose-300/60 hidden xs:inline">|</span>
            <button
              onClick={onOpenTrackOrder}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px] xs:text-[11px] sm:text-xs whitespace-nowrap shrink-0"
              id="track-order-topbar-btn"
            >
              <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className={isForcedMobile ? 'hidden' : 'hidden xs:inline'}>Track Order</span>
              <span className={isForcedMobile ? 'inline' : 'xs:hidden'}>Track</span>
            </button>
            {!isForcedMobile && onOpenInternationalGuide && (
              <>
                <span className="text-rose-300/60 hidden lg:inline">|</span>
                <button
                  onClick={onOpenInternationalGuide}
                  className="hidden lg:flex items-center gap-1 hover:text-emerald-200 text-rose-100 transition-colors cursor-pointer text-[10px] xs:text-[11px] sm:text-xs font-semibold whitespace-nowrap"
                  id="intl-payment-topbar-btn"
                >
                  <Globe className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span>Pay from Abroad</span>
                </button>
              </>
            )}
            {!isForcedMobile && (
              <>
                <span className="text-rose-300/60 hidden sm:inline">|</span>
                <button
                  onClick={onOpenAccount}
                  className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px] xs:text-[11px] sm:text-xs whitespace-nowrap"
                  id="my-account-topbar-btn"
                >
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>My Account</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Row */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile hamburger menu toggle (ONLY on mobile phone mode, NEVER on computer mode) */}
          {!isForcedComputer && (
            <div className={`flex items-center ${isForcedMobile ? 'flex' : 'md:hidden'} shrink-0`}>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-stone-700 hover:text-[#c83264] hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Open mobile menu"
                id="mobile-menu-open-btn"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Brand Logo - High Resolution Official Olateetee Luxe Emblem */}
          <div
            className="flex items-center justify-center md:justify-start cursor-pointer shrink-0"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              onSelectCategory('all');
            }}
            title="Olateetee Luxe - Return to Home"
          >
            <BrandLogo size="md" />
          </div>

          {/* Center Search Input Bar (Shown on Computer mode, hidden on mobile) */}
          <div
            className={`${
              isForcedComputer ? 'flex' : isForcedMobile ? 'hidden' : 'hidden md:flex'
            } flex-1 max-w-lg mx-2 lg:mx-6`}
          >
            <div
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between bg-stone-100/90 hover:bg-stone-100 border border-stone-200/90 hover:border-[#c83264]/40 rounded-full pl-4 pr-1.5 py-1.5 text-xs text-stone-500 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Search className="w-4 h-4 text-stone-400 group-hover:text-[#c83264] transition-colors shrink-0" />
                <span className="truncate text-stone-500 text-[11px] sm:text-xs">
                  Search skincare, glowing oils, lipsticks, makeup, perfume...
                </span>
              </div>
              <span className="shrink-0 text-[11px] bg-[#c83264] text-white px-3 py-1 rounded-full font-semibold shadow-xs hover:bg-[#b02553] transition-colors">
                Search
              </span>
            </div>
          </div>

          {/* Right Action Controls: Search (mobile), WhatsApp, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile-only search icon */}
            <button
              onClick={onOpenSearch}
              className={`${
                isForcedComputer ? 'hidden' : isForcedMobile ? 'flex' : 'md:hidden'
              } p-2 text-stone-700 hover:text-[#c83264] hover:bg-rose-50 rounded-full transition-colors cursor-pointer`}
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Fast Order Pill (Desktop / Computer) */}
            <a
              href={createWhatsAppChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isForcedComputer ? 'flex' : isForcedMobile ? 'hidden' : 'hidden lg:flex'
              } items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200/80 transition-all cursor-pointer shadow-2xs`}
              title="Chat with Beauty Consultant"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>WhatsApp Direct</span>
            </a>

            {/* Wishlist Button with Counter Badge */}
            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-stone-700 hover:text-[#c83264] hover:bg-rose-50 rounded-full transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              id="header-wishlist-btn"
            >
              <div className="relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c83264] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium hidden xl:inline">Wishlist</span>
            </button>

            {/* Shopping Bag Button with Counter Badge & Label */}
            <button
              onClick={onOpenCart}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 ${
                isForcedMobile ? 'w-9 h-9 p-0' : 'w-9 h-9 sm:w-auto p-0 sm:px-3.5 sm:py-2'
              } bg-[#c83264] hover:bg-[#b02553] text-white rounded-full transition-all relative cursor-pointer shadow-sm active:scale-95 shrink-0`}
              aria-label="Shopping Cart"
              id="header-cart-btn"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-300 text-stone-900 text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </div>
              {!isForcedMobile && (
                <span className="text-xs font-semibold hidden xl:inline whitespace-nowrap">Shopping Bag</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. DEDICATED COMPUTER MENU BAR — DIRECTLY ABOVE THE HERO SECTION (NO THREE DASHES) */}
      <div
        className={`${
          isForcedComputer ? 'block' : isForcedMobile ? 'hidden' : 'hidden md:block'
        } w-full bg-white border-t border-b border-stone-200/90 shadow-2xs`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-5 xl:gap-7 py-1.5 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive =
                currentPage === 'about'
                  ? item.id === 'about'
                  : (item.id === 'all' && activeCategory === 'all') ||
                    item.id === activeCategory;

              return (
                <div
                  key={item.name}
                  className="relative group shrink-0"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`px-2.5 lg:px-3 py-2 text-[11px] lg:text-xs font-bold tracking-[0.12em] transition-all flex items-center gap-1 cursor-pointer relative uppercase whitespace-nowrap ${
                      isActive
                        ? 'text-[#c83264]'
                        : 'text-stone-700 hover:text-[#c83264]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-[#c83264] transition-transform group-hover:rotate-180 duration-200" />
                    )}

                    {/* Active highlight bar directly under the menu link */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#c83264] rounded-full" />
                    )}
                  </button>

                  {/* Dropdown Menu on hover */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white border border-stone-200 shadow-xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1 border-b border-stone-100 mb-1">
                        <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                          {item.name} Categories
                        </span>
                      </div>
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSubItemClick(item.id)}
                          className="w-full text-left px-3.5 py-1.5 text-xs text-stone-600 hover:text-[#c83264] hover:bg-rose-50/70 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span>{sub}</span>
                          <span className="text-[10px] text-stone-300 group-hover:text-[#c83264]">→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 4. Mobile Drawer Navigation (Phone view only) */}
      {!isForcedComputer && mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#fefdfc] shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-white">
              <BrandLogo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close mobile navigation"
                id="close-mobile-nav-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick WhatsApp Contact Banner */}
            <div className="p-3.5 bg-gradient-to-r from-rose-50 to-amber-50 border-b border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#8d5b1d]">Need Beauty Advice?</p>
                <p className="text-[11px] text-stone-600">Chat with us on WhatsApp</p>
              </div>
              <a
                href={createWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-xs transition-all"
              >
                <span>{FORMATTED_WHATSAPP}</span>
              </a>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 mb-2">
                Explore Collections
              </p>
              {navItems.map((item) => {
                const isActive =
                  currentPage === 'about'
                    ? item.id === 'about'
                    : (item.id === 'all' && activeCategory === 'all') ||
                      item.id === activeCategory;

                return (
                  <div key={item.name} className="border-b border-stone-100 last:border-0 pb-1">
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-rose-50 text-[#c83264] font-semibold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4 text-stone-400" />}
                    </button>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-stone-200 mt-3 space-y-2">
                {onSelectCurrency && (
                  <div className="px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-700">Display Currency:</span>
                      <CurrencySelector
                        currentCurrency={currentCurrency}
                        onSelectCurrency={onSelectCurrency}
                        compact
                      />
                    </div>
                  </div>
                )}

                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 mb-1">
                  Customer Care
                </p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrackOrder();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 rounded-lg text-left cursor-pointer"
                >
                  <Package className="w-4 h-4 text-[#c83264]" />
                  <span>Track My Package</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 rounded-lg text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#c83264]" />
                  <span>My Account &amp; Orders</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 rounded-lg text-left cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#c83264]" />
                  <span>Contact &amp; Support</span>
                </button>
                {onOpenInternationalGuide && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInternationalGuide();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-left font-semibold cursor-pointer border border-emerald-200/60"
                  >
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>Pay from Abroad (Wise, Remitly, LemFi)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom info */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
              <span className="font-script text-sm text-[#c83264] font-semibold">
                Grow Naturally, Glow Confidently ❤️
              </span>
              <p className="text-[10px] text-stone-500 mt-0.5">
                WhatsApp Order Line: {FORMATTED_WHATSAPP}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
