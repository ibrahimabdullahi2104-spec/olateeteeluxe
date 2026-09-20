export const OLATEETEE_BANK_DETAILS = {
  accountNumber: '7085948098',
  bank: 'OPAY',
  accountName: 'Olateetee Luxe',
  country: 'Nigeria',
  defaultCurrency: 'NGN',
  opayAppNumber: '7085948098',
  ussdCode: '*955#'
};

export const PAYMENT_POLICY = {
  title: 'Payment Confirmation Before Delivery Assurance',
  shortNotice: 'Payment must be verified & confirmed before orders are dispatched and delivery is assured.',
  fullDescription:
    'To guarantee priority packaging and safeguard our customers from fraudulent dispatches, delivery is officially scheduled and guaranteed ONLY after our finance team receives and confirms your payment (bank transfer, card payment, or verified receipt). Once verified, your status changes immediately to "Payment Confirmed & Delivery Assured" with live courier tracking.',
  confirmationSteps: [
    'Place your order and select your preferred payment method (Bank Transfer to OPAY, Card, WhatsApp, etc.).',
    'Make the payment using the provided details or complete the online payment.',
    'Send or upload your payment confirmation receipt or reference code via WhatsApp or the checkout page.',
    'Our finance team verifies the transfer within minutes and confirms your delivery schedule with active tracking.'
  ]
};

export interface PaymentOption {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  iconName: 'landmark' | 'credit-card' | 'message-circle' | 'smartphone' | 'globe' | 'dollar-sign';
  description: string;
}

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'opay_transfer',
    name: 'OPAY Bank Transfer',
    tagline: 'Instant Account Transfer (Account: 7085948098)',
    badge: 'Fastest Confirmation',
    iconName: 'landmark',
    description: 'Transfer directly to our official OPAY business account. We verify your transfer immediately.'
  },
  {
    id: 'card_online',
    name: 'Debit / Credit Card (Any Currency)',
    tagline: 'Mastercard, Visa, Verve & International Cards',
    badge: 'Instant & Secure',
    iconName: 'credit-card',
    description: 'Pay securely using any local or international card in your chosen currency.'
  },
  {
    id: 'whatsapp_transfer',
    name: 'WhatsApp Direct Payment',
    tagline: 'Personal transfer confirmation with the business owner',
    badge: 'Founder Direct',
    iconName: 'message-circle',
    description: 'Order and confirm payment directly with the founder on WhatsApp (+21891-3097994).'
  },
  {
    id: 'mobile_money',
    name: 'Mobile Money & Digital Wallets',
    tagline: 'OPAY App, PalmPay, Kuda, Moniepoint & USSD',
    badge: 'Mobile App',
    iconName: 'smartphone',
    description: 'Pay seamlessly using your favorite fintech wallet or banking USSD code.'
  },
  {
    id: 'international_wire',
    name: 'International Remittance',
    tagline: 'Sendwave, LemFi, WorldRemit, Western Union, PayPal',
    badge: 'Worldwide',
    iconName: 'globe',
    description: 'For customers outside Nigeria/Libya paying from the US, UK, Canada, Europe, or diaspora.'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery (Restricted)',
    tagline: 'Subject to delivery zone and confirmation',
    badge: 'Conditions Apply',
    iconName: 'dollar-sign',
    description: 'Available for selected verified addresses. Requires phone and address verification before dispatch.'
  }
];
