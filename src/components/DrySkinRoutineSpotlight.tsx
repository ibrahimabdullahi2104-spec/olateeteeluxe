import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Eye, 
  Heart,
  ShieldCheck,
  Package,
  ArrowRight,
  MessageCircle,
  Clock,
  Sun,
  Moon,
  Droplets
} from 'lucide-react';
import { Product } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { WHATSAPP_NUMBER } from '../data/products';

interface DrySkinRoutineSpotlightProps {
  packageProduct: Product | undefined;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  currentCurrency: CurrencyCode;
  deviceMode?: 'auto' | 'mobile' | 'laptop' | 'desktop';
}

interface RoutineStep {
  id: number;
  emoji: string;
  name: string;
  timeOfDay: 'morning' | 'night' | 'both';
  tagline: string;
  image: string;
  badge: string;
}

export const DrySkinRoutineSpotlight: React.FC<DrySkinRoutineSpotlightProps> = ({
  packageProduct,
  onAddToCart,
  onQuickView,
  currentCurrency,
  deviceMode = 'auto'
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const steps: RoutineStep[] = [
    {
      id: 1,
      emoji: '🧴',
      name: 'CeraVe Hydrating Facial Cleanser',
      timeOfDay: 'both',
      tagline: 'Gentle cleansing for dry skin without stripping natural barrier',
      image: '/cerave-cream-to-foam-cleanser.jpg',
      badge: 'Step 1 • Cleanse'
    },
    {
      id: 2,
      emoji: '💧',
      name: 'The Ordinary Hyaluronic Acid 2% + B5',
      timeOfDay: 'both',
      tagline: 'Helps give the skin intense multi-depth hydration & plumpness',
      image: '/the-ordinary-hyaluronic-acid.jpg',
      badge: 'Step 2 • Hydrate'
    },
    {
      id: 3,
      emoji: '✨',
      name: 'Eqqual Berry Vitamin Illuminating Serum',
      timeOfDay: 'morning',
      tagline: 'For a brighter, healthier-looking lit-from-within glow',
      image: '/eqqualberry-vitamin-serum.jpg',
      badge: 'Step 3 • Illuminate'
    },
    {
      id: 4,
      emoji: '🌙',
      name: 'Celimax Retinal/Retinol Shot',
      timeOfDay: 'night',
      tagline: 'For a nighttime routine, pore tightening and skin renewal',
      image: '/celimax-retinal-shot.jpg',
      badge: 'Step 4 • Renew'
    },
    {
      id: 5,
      emoji: '☀️',
      name: 'La Roche-Posay Anthelios 50+ Sunscreen',
      timeOfDay: 'morning',
      tagline: 'Daily broad-spectrum UV protection against premature aging',
      image: '/dry-skin-girlie-routine.jpg',
      badge: 'Step 5 • Protect'
    }
  ];

  // Auto-play reel progress loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveStepIndex((idx) => (idx + 1) % steps.length);
            return 0;
          }
          return prev + 2.5; // ~4 seconds per step
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    setProgress(0);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Olateetee! 🤍✨\n\nI want to order the "For My Dry-Skin Girlies Routine Package" (#75,000).\n\nWhat is included in this set:\n1. CeraVe Hydrating Facial Cleanser\n2. The Ordinary Hyaluronic Acid Serum\n3. Eqqual Berry Vitamin Illuminating Serum\n4. Celimax Retinal Shot\n5. La Roche-Posay Sunscreen\n\nPlease confirm availability and delivery details. Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const currentStep = steps[activeStepIndex];

  return (
    <section id="dry-skin-routine-spotlight" className="w-full py-8 sm:py-12 bg-gradient-to-b from-[#faf7f5] via-[#fbf4f4] to-[#faf7f5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold tracking-wide uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            Curated Beginner Package • Save ₦5,000
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium text-stone-900 tracking-tight leading-tight">
            For my dry-skin girlies 🤍✨
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
            If you’re just starting your skincare journey and your skin feels dry, dull, or needs a proper beginner routine, this package is specially put together for you.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-xl border border-rose-100">
          
          {/* Left: Video / Reel Player Simulator (4:5 Aspect Ratio) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-stone-950 border-4 border-stone-800 group select-none">
              
              {/* Background Reel Media */}
              <img
                src={
                  activeStepIndex === 0 
                    ? '/pack-order-with-me-dry-skin.jpg' 
                    : currentStep.image
                }
                alt={currentStep.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlays for Video Reel Authenticity */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-stone-950/60 pointer-events-none" />

              {/* Top Reel Navigation & Brand Pill */}
              <div className="absolute top-3 left-3 right-3 flex flex-col gap-2 z-10">
                {/* Story / Reel Step Progress Bars */}
                <div className="flex items-center gap-1.5 w-full">
                  {steps.map((s, idx) => (
                    <div 
                      key={s.id} 
                      className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                      onClick={() => handleStepClick(idx)}
                    >
                      <div 
                        className="h-full bg-rose-400 transition-all duration-100"
                        style={{
                          width: idx < activeStepIndex ? '100%' : idx === activeStepIndex ? `${progress}%` : '0%'
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Account & Sound Badge */}
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold">
                      O
                    </div>
                    <span className="text-[11px] font-medium text-white tracking-wide">
                      @olateetee.cosmetics
                    </span>
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                </div>
              </div>

              {/* Center Floating Sticker (Reel Caption) */}
              <div className="absolute top-16 left-3 right-3 flex flex-col items-center gap-1 text-center pointer-events-none z-10">
                <div className="inline-block bg-white/95 backdrop-blur-md text-rose-900 font-serif-luxury font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg border border-rose-200 animate-bounce">
                  Pack an order with me 🎁🛍️
                </div>
                <div className="inline-block bg-rose-950/80 backdrop-blur-md text-white font-medium text-[11px] px-3 py-0.5 rounded-full shadow-md">
                  Dry skin girlie routine 🤍
                </div>
              </div>

              {/* Bottom Reel Details Card */}
              <div className="absolute bottom-4 left-3 right-3 z-10">
                <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-500/30">
                      {currentStep.badge}
                    </span>
                    <span className="text-[11px] text-stone-300 flex items-center gap-1 font-medium">
                      {currentStep.timeOfDay === 'morning' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                      {currentStep.timeOfDay === 'night' && <Moon className="w-3.5 h-3.5 text-indigo-300" />}
                      {currentStep.timeOfDay === 'both' && <Droplets className="w-3.5 h-3.5 text-sky-400" />}
                      {currentStep.timeOfDay === 'both' ? 'AM & PM' : currentStep.timeOfDay === 'morning' ? 'Morning Routine' : 'Night Routine'}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white leading-tight line-clamp-1">
                    {currentStep.emoji} {currentStep.name}
                  </h4>
                  <p className="text-[11px] text-stone-300 mt-1 leading-snug line-clamp-2">
                    {currentStep.tagline}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-rose-200">
                      <Package className="w-3.5 h-3.5" />
                      <span>Order packed in luxury green bag</span>
                    </div>
                    <button 
                      onClick={() => packageProduct && onQuickView(packageProduct)}
                      className="text-[11px] text-white underline underline-offset-2 hover:text-rose-200 font-medium flex items-center gap-0.5"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Step thumbnail selector pills */}
            <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto w-full max-w-sm py-1">
              {steps.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => handleStepClick(idx)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all ${
                    idx === activeStepIndex
                      ? 'bg-rose-600 text-white shadow-md scale-110 ring-2 ring-rose-300 ring-offset-1'
                      : 'bg-rose-50 text-stone-700 hover:bg-rose-100'
                  }`}
                  title={st.name}
                >
                  {st.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Package Breakdown, Products List & Pricing */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Package Overview */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Full 5-Piece System
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> In Stock & Ready to Ship
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-luxury font-medium text-stone-900 leading-snug">
                Beginner-friendly routine for dry, dull skin
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-normal leading-relaxed">
                So instead of buying random products and wondering what to use, we put together a beginner-friendly routine for dry skin.
              </p>
            </div>

            {/* What's Included: Clean Itemized List */}
            <div className="bg-[#fbf7f6] rounded-2xl p-4 sm:p-5 border border-stone-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                Inside the package, we have:
              </span>

              <ul className="space-y-2.5">
                {steps.map((st, idx) => (
                  <li 
                    key={st.id}
                    onClick={() => handleStepClick(idx)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                      idx === activeStepIndex 
                        ? 'bg-white shadow-xs border border-rose-200 ring-1 ring-rose-200' 
                        : 'hover:bg-white/60 border border-transparent'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{st.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className={`text-xs sm:text-sm font-semibold ${idx === activeStepIndex ? 'text-rose-900' : 'text-stone-900'}`}>
                          {st.name}
                        </h5>
                        <span className="text-[10px] font-bold text-stone-400 shrink-0">
                          {idx === activeStepIndex && <span className="text-rose-600">Active</span>}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-stone-500 font-normal leading-tight mt-0.5">
                        {st.tagline}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Section (Strikethrough #80,000 ❌ -> #75,000) */}
            <div className={`bg-gradient-to-r from-rose-50 via-[#fcf3f4] to-pink-50 rounded-2xl p-4 sm:p-5 border border-rose-200/90 flex flex-col ${deviceMode === 'mobile' ? 'flex-col' : '2xl:flex-row 2xl:items-center'} justify-between gap-4 overflow-hidden`}>
              <div className="space-y-1 w-full min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
                  Package Price
                </span>
                <div className="flex flex-wrap items-baseline gap-2.5 mt-1">
                  <span className="text-stone-400 text-sm sm:text-base line-through font-medium whitespace-nowrap">
                    {formatPrice(51.61290322, currentCurrency)}
                    <span className="ml-1 text-xs text-red-500 font-bold">❌</span>
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#b82656] whitespace-nowrap">
                    {formatPrice(48.38709677, currentCurrency)}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1.5 leading-snug">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Complete set packaged with complimentary gift wrapping</span>
                </p>
              </div>

              {/* Quick Action Buttons: Stacked vertically full width so they never overflow */}
              <div className="flex flex-col items-stretch gap-2.5 w-full pt-1">
                {packageProduct && (
                  <button
                    onClick={() => onAddToCart(packageProduct, 1)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 text-white font-medium text-xs sm:text-sm hover:bg-stone-800 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Add to Bag</span>
                  </button>
                )}

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-medium text-xs sm:text-sm hover:bg-[#20ba5a] active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
