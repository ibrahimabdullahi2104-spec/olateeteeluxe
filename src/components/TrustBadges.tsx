import React from 'react';
import { Truck, ShieldCheck, Lock, Headphones } from 'lucide-react';

interface TrustBadgesProps {
  deviceMode?: 'auto' | 'mobile' | 'laptop' | 'desktop';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ deviceMode = 'auto' }) => {
  const isForcedMobile = deviceMode === 'mobile';
  const badges = [
    {
      icon: Truck,
      title: 'Fast & Reliable Delivery',
      mobileTitle: 'Fast & Reliable\nDelivery',
      subtitle: 'Get your orders on time'
    },
    {
      icon: ShieldCheck,
      title: '100% Authentic Products',
      mobileTitle: '100% Authentic\nProducts',
      subtitle: 'Original & trusted brands'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      mobileTitle: 'Secure\nPayments',
      subtitle: 'Shop with confidence'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      mobileTitle: 'Dedicated\nSupport',
      subtitle: "We're here to help"
    }
  ];

  return (
    <section className="w-full bg-[#fdfbf9] border-b border-stone-200/80 py-4 sm:py-5 lg:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Mobile View (< md or isForcedMobile): Matches exact 3-column design from uploaded phone mockup */}
        <div className={`grid grid-cols-3 ${isForcedMobile ? 'grid' : 'md:hidden'} gap-2 text-center`}>
          {badges.slice(0, 3).map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-start p-1.5">
                <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-full border border-rose-200 bg-rose-50/70 flex items-center justify-center text-[#c83264] shadow-2xs mb-1.5">
                  <Icon className="w-4 h-4 xs:w-5 xs:h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-[10px] xs:text-[11px] font-semibold text-stone-800 leading-tight whitespace-pre-line">
                  {badge.mobileTitle}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Laptop & Desktop View (md+): 4 columns with horizontal layout */}
        <div className={`${isForcedMobile ? 'hidden' : 'hidden md:grid md:grid-cols-4'} gap-4 lg:gap-6 divide-x divide-stone-200/80`}>
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 px-3 lg:px-4 py-1.5 ${
                  idx > 0 ? 'pl-4 lg:pl-6' : ''
                }`}
              >
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-rose-200 bg-rose-50/70 flex items-center justify-center shrink-0 text-[#c83264] shadow-2xs">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.75]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="text-xs lg:text-sm font-semibold text-stone-900 tracking-tight leading-snug truncate">
                    {badge.title}
                  </h3>
                  <p className="text-[11px] lg:text-xs text-stone-500 font-normal mt-0.5 leading-tight truncate">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
