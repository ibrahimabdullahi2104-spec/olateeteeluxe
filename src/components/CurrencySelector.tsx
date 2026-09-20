import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { CURRENCIES, CurrencyCode, CurrencyConfig } from '../utils/currency';

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  compact?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  onSelectCurrency,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeConfig = CURRENCIES[currentCurrency] || CURRENCIES.NGN;
  const currencyList = Object.values(CURRENCIES);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 rounded-full transition-all cursor-pointer font-medium ${
          compact
            ? 'px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200/80'
            : 'px-3 py-1.5 text-xs bg-white/90 hover:bg-white text-stone-800 border border-stone-200 shadow-2xs hover:border-amber-400'
        }`}
        title="Select payment and browsing currency"
        id="currency-selector-button"
      >
        <span className="text-sm leading-none" role="img" aria-label={activeConfig.name}>
          {activeConfig.flag}
        </span>
        <span className="font-bold text-stone-900">{activeConfig.code}</span>
        <span className="text-stone-500 font-normal hidden xs:inline">({activeConfig.symbol})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3.5 py-2 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#c83264]" />
              <span>Select Currency</span>
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold border border-amber-200/60">
              All Currencies
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-stone-50">
            {currencyList.map((curr: CurrencyConfig) => {
              const isSelected = curr.code === currentCurrency;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => {
                    onSelectCurrency(curr.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/80 text-[#c83264] font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base" role="img" aria-label={curr.name}>
                      {curr.flag}
                    </span>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900">{curr.code}</span>
                        <span className="text-stone-500 font-semibold">({curr.symbol})</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block font-normal leading-tight">
                        {curr.name}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#c83264] shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-[10px] text-stone-500 rounded-b-xl leading-relaxed">
            💡 Pay in any currency with card or transfer. Transfer payments will display the exact OPAY (₦) equivalent.
          </div>
        </div>
      )}
    </div>
  );
};
