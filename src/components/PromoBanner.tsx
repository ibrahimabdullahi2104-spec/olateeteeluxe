import React from 'react';
import { ArrowRight, Sparkles, Droplets, HeartPulse, Feather } from 'lucide-react';

interface PromoBannerProps {
  onShopSkincare: () => void;
  deviceMode?: 'auto' | 'mobile' | 'laptop' | 'desktop';
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopSkincare, deviceMode = 'auto' }) => {
  const isForcedMobile = deviceMode === 'mobile';

  const benefits = [
    {
      icon: Sparkles,
      title: 'Brightens',
      subtitle: 'Skin Tone'
    },
    {
      icon: Droplets,
      title: 'Hydrates',
      subtitle: '& Nourishes'
    },
    {
      icon: HeartPulse,
      title: 'Fights',
      subtitle: 'Aging'
    },
    {
      icon: Feather,
      title: 'Soft &',
      subtitle: 'Smooth Skin'
    }
  ];

  return (
    <section className="w-full py-5 sm:py-8 lg:py-10 bg-[#faf7f5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#fae5e8] via-[#fcecef] to-[#fae2e6] border border-rose-200/90 shadow-xs p-3 sm:p-6 lg:p-8">
          <div className={`grid grid-cols-1 ${isForcedMobile ? 'grid-cols-1' : 'lg:grid-cols-12'} gap-5 sm:gap-6 items-center`}>
            {/* Left: Model Photo + Text */}
            <div className={`${isForcedMobile ? 'w-full flex flex-col items-center text-center' : 'lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left'} gap-4 sm:gap-6`}>
              {/* Model photo with pink headwrap */}
              <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 shadow-md border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85"
                  alt="Healthy Skin Model"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/category-skincare.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c83264]/20 to-transparent" />
              </div>

              {/* Text content */}
              <div className={`flex flex-col ${isForcedMobile ? 'items-center text-center' : 'items-center sm:items-start text-center sm:text-left'} space-y-1.5 sm:space-y-2 min-w-0 w-full`}>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.16em] text-[#c83264] uppercase">
                  SKINCARE THAT CARES
                </span>
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-medium text-stone-900 tracking-tight leading-tight">
                  Healthy Skin, Happy You
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-md">
                  Because your skin deserves the best.
                </p>
                <div className={`pt-2 w-full flex ${isForcedMobile ? 'justify-center' : 'justify-center sm:justify-start'}`}>
                  <button
                    onClick={onShopSkincare}
                    className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#a06922] hover:bg-[#885619] text-white text-xs sm:text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer tracking-wider whitespace-nowrap max-w-full"
                    id="promo-shop-skincare-btn"
                  >
                    <span className="whitespace-nowrap">SHOP SKINCARE</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: 4 Circular Benefits Badges (Visible on larger screens, and compact row on mobile) */}
            <div className={`${isForcedMobile ? 'w-full' : 'lg:col-span-4'} border-t ${isForcedMobile ? 'border-t' : 'lg:border-t-0 lg:border-l'} border-rose-200/80 pt-3 ${isForcedMobile ? 'pt-3' : 'lg:pt-0 lg:pl-6'}`}>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3 text-center">
                {benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center group">
                      <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-full border border-rose-300/80 bg-white/80 hover:bg-white flex items-center justify-center text-[#c83264] shadow-2xs transition-transform group-hover:scale-110 duration-200">
                        <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                      </div>
                      <div className="mt-1 sm:mt-1.5 text-[9px] xs:text-[10px] sm:text-[11px] font-medium text-stone-700 leading-tight">
                        <p>{b.title}</p>
                        <p className="text-stone-500 font-normal hidden xs:block">{b.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
