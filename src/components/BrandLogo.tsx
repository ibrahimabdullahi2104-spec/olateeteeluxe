import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light'
}) => {
  // Height sizing for responsive layouts
  const sizeClasses = {
    sm: 'h-9 xs:h-10 sm:h-11 md:h-12 w-auto max-w-[140px] xs:max-w-[170px] sm:max-w-[190px]',
    md: 'h-11 xs:h-13 sm:h-15 md:h-17 lg:h-20 w-auto max-w-[170px] xs:max-w-[210px] sm:max-w-[260px] lg:max-w-[300px]',
    lg: 'h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[240px] sm:max-w-[320px] lg:max-w-[380px]',
    xl: 'h-22 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[290px] sm:max-w-[380px] lg:max-w-[460px]'
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  if (variant === 'dark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className="bg-white/95 hover:bg-white transition-all duration-300 p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-black/20 border border-amber-300/40 backdrop-blur-xs flex items-center justify-center">
          <img
            src="/logo-transparent.png"
            alt="Olateetee Luxe - Home of Fashion & Cosmetics"
            className={`${currentSizeClass} object-contain select-none transition-transform duration-300 hover:scale-[1.02]`}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/logo-transparent.png"
        alt="Olateetee Luxe - Home of Fashion & Cosmetics"
        className={`${currentSizeClass} object-contain select-none transition-transform duration-300 hover:scale-[1.02] filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)]`}
        loading="eager"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

