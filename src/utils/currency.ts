export type CurrencyCode =
  | 'NGN'
  | 'USD'
  | 'LYD'
  | 'GBP'
  | 'EUR'
  | 'CAD'
  | 'GHS'
  | 'ZAR'
  | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstUSD: number; // e.g. 1550 NGN per 1 USD
  flag: string;
  formatPrefix: boolean; // true if symbol before number, false if after
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    rateAgainstUSD: 1550,
    flag: '🇳🇬',
    formatPrefix: true,
    decimals: 0
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateAgainstUSD: 1.0,
    flag: '🇺🇸',
    formatPrefix: true,
    decimals: 2
  },
  LYD: {
    code: 'LYD',
    symbol: 'LD',
    name: 'Libyan Dinar',
    rateAgainstUSD: 4.85,
    flag: '🇱🇾',
    formatPrefix: false,
    decimals: 2
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateAgainstUSD: 0.78,
    flag: '🇬🇧',
    formatPrefix: true,
    decimals: 2
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateAgainstUSD: 0.92,
    flag: '🇪🇺',
    formatPrefix: true,
    decimals: 2
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rateAgainstUSD: 1.36,
    flag: '🇨🇦',
    formatPrefix: true,
    decimals: 2
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    rateAgainstUSD: 15.5,
    flag: '🇬🇭',
    formatPrefix: true,
    decimals: 2
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    rateAgainstUSD: 18.2,
    flag: '🇿🇦',
    formatPrefix: true,
    decimals: 2
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    rateAgainstUSD: 3.67,
    flag: '🇦🇪',
    formatPrefix: false,
    decimals: 2
  }
};

export const DEFAULT_CURRENCY: CurrencyCode = 'NGN';

/**
 * Converts a base USD price to the target currency
 */
export function convertFromUSD(amountInUSD: number, targetCurrency: CurrencyCode): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  return amountInUSD * config.rateAgainstUSD;
}

/**
 * Formats a base USD price into the target currency formatted string
 */
export function formatPrice(amountInUSD: number, currencyCode: CurrencyCode = 'NGN'): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = convertFromUSD(amountInUSD, currencyCode);

  let formattedNum: string;
  if (config.decimals === 0) {
    formattedNum = Math.round(converted).toLocaleString('en-US');
  } else {
    formattedNum = converted.toLocaleString('en-US', {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals
    });
  }

  if (config.formatPrefix) {
    return `${config.symbol}${formattedNum}`;
  }
  return `${formattedNum} ${config.symbol}`;
}

/**
 * Converts an amount between any two supported currencies
 */
export function convertBetween(amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number {
  if (fromCurrency === toCurrency) return amount;
  const fromConfig = CURRENCIES[fromCurrency] || CURRENCIES.USD;
  const toConfig = CURRENCIES[toCurrency] || CURRENCIES.USD;
  // Convert from source currency to base USD, then from USD to target currency
  const amountInUSD = amount / fromConfig.rateAgainstUSD;
  return amountInUSD * toConfig.rateAgainstUSD;
}

export function formatDirectAmount(amountInTargetCurrency: number, currencyCode: CurrencyCode = 'NGN'): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  let formattedNum: string;
  if (config.decimals === 0) {
    formattedNum = Math.round(amountInTargetCurrency).toLocaleString('en-US');
  } else {
    formattedNum = amountInTargetCurrency.toLocaleString('en-US', {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals
    });
  }

  if (config.formatPrefix) {
    return `${config.symbol}${formattedNum}`;
  }
  return `${formattedNum} ${config.symbol}`;
}
