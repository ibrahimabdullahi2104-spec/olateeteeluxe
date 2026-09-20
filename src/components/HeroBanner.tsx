import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  deviceMode?: 'auto' | 'mobile' | 'laptop' | 'desktop';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, deviceMode = 'auto' }) => {
  const isForcedMobile = deviceMode === 'mobile';
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      eyebrow: 'PREMIUM SKINCARE & COSMETICS',
      headingPrimary: 'Reveal Your',
      headingScript: 'Natural Glow',
      subtext:
        'High-quality skincare and beauty products for a healthier, brighter, and more confident you.',
      ctaText: 'SHOP NOW'
    },
    {
      id: 2,
      eyebrow: 'ORGANIC BOTANICAL FORMULAS',
      headingPrimary: 'Luminous',
      headingScript: 'Radiant Beauty',
      subtext:
        'Crafted with pure botanicals and 24K gold flakes to nourish, hydrate, and brighten your skin tone.',
      ctaText: 'EXPLORE GLOW'
    },
    {
      id: 3,
      eyebrow: 'LUXURY BEAUTY & FRAGRANCE',
      headingPrimary: 'Indulge In',
      headingScript: 'Pure Elegance',
      subtext:
        'Velvet matte lips, captivating scents, and silky body oils for effortless everyday confidence.',
      ctaText: 'VIEW COLLECTION'
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faeaec] via-[#fbecef] to-[#fae6e9] border-b border-rose-100/70">
      {/* Decorative ambient background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-amber-200/30 blur-2xl" />
        {/* Floating petals */}
        <div className="absolute top-6 left-6 text-rose-300/60 text-lg sm:text-2xl animate-bounce duration-1000">🌸</div>
        <div className="absolute top-12 right-1/4 text-rose-300/40 text-sm sm:text-lg">🌸</div>
        <div className="absolute bottom-8 left-1/4 text-rose-300/50 text-base sm:text-xl">🌸</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className={`grid grid-cols-1 ${isForcedMobile ? 'grid-cols-1' : 'lg:grid-cols-12'} gap-6 sm:gap-8 lg:gap-8 items-center`}>
          {/* Left Column: Hero Typography & CTA */}
          <div className={`${isForcedMobile ? 'w-full items-center text-center' : 'lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left'} flex flex-col space-y-3.5 xs:space-y-4 sm:space-y-6`}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 py-1 rounded-full bg-white/75 backdrop-blur-xs border border-rose-200 text-[#8d5b1d] text-[10px] xs:text-[11px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#c83264]" />
              <span>{slide.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-0.5">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-serif-luxury font-bold text-stone-900 tracking-tight leading-[1.1]">
                {slide.headingPrimary}{' '}
                <span className="block xs:inline font-script font-normal text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl text-[#c83264] drop-shadow-2xs">
                  {slide.headingScript}
                </span>
              </h1>
            </div>

            {/* Subtext description */}
            <p className="text-stone-600 text-xs xs:text-sm sm:text-base md:text-lg max-w-sm xs:max-w-md sm:max-w-lg leading-relaxed font-normal">
              {slide.subtext}
            </p>

            {/* Shop Now CTA Button */}
            <div className="pt-1 xs:pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center justify-center gap-2 px-6 xs:px-8 py-3 xs:py-3.5 sm:py-4 bg-[#a06922] hover:bg-[#8b5a1c] text-white font-medium text-xs xs:text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer tracking-wider shrink-0 max-w-full"
                id="hero-shop-now-cta"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-500 font-medium whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>In Stock &amp; Ready</span>
              </div>
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex items-center gap-2 pt-2 xs:pt-4 sm:pt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? 'w-6 h-2 bg-[#c83264]'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Hero Product Suite Image Display */}
          <div className={`${isForcedMobile ? 'w-full' : 'lg:col-span-6'} relative w-full`}>
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              {/* Image composition container */}
              <div className="relative rounded-2xl overflow-hidden border border-rose-200/80 shadow-xl bg-gradient-to-b from-rose-50/50 to-white/80 p-2 sm:p-3 backdrop-blur-xs">
                <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden group">
                  <img
                    src="/category-skincare.jpg"
                    alt="Olateetee Luxe Premium Skincare Suite"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/dry-skin-girlie-routine.jpg';
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-rose-200/20 pointer-events-none" />

                  {/* On-image Product Labels overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between bg-white/90 backdrop-blur-md rounded-lg p-2 sm:p-2.5 text-xs text-stone-800 border border-rose-100 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#c83264] shrink-0" />
                      <span className="font-serif-luxury font-bold text-[#8d5b1d] text-[11px] sm:text-xs truncate">
                        The Radiant Glow Ritual
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium shrink-0">
                      Complete 4-Piece Set
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating 100% Authentic Badge */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white/95 backdrop-blur-md border border-rose-200 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#c83264] shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">100% Authentic</p>
                  <p className="text-[9px] sm:text-[10px] text-stone-500 leading-tight">Natural Botanicals</p>
                </div>
              </div>

              {/* Floating Customer Rating Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md border border-rose-200 rounded-xl sm:rounded-2xl py-1.5 px-2.5 sm:py-2 sm:px-3.5 shadow-lg flex items-center gap-1.5 sm:gap-2">
                <div className="flex text-amber-400 text-[10px] sm:text-xs">★★★★★</div>
                <span className="text-[10px] sm:text-xs font-bold text-stone-800">4.9 / 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
