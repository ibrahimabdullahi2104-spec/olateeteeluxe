import { CartItem, OrderDetails } from '../types';
import { FORMATTED_WHATSAPP, WHATSAPP_NUMBER } from '../data/products';
import { CurrencyCode, formatPrice } from './currency';
import { OLATEETEE_BANK_DETAILS } from '../data/paymentConfig';

export function createWhatsAppChatUrl(message?: string): string {
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    message || 'Hello Olateetee Luxe! ✨ I would like to inquire about your skincare and beauty products.'
  );
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function createProductInquiryWhatsAppUrl(
  productName: string,
  priceInUSD: number,
  volume?: string,
  currency: CurrencyCode = 'NGN'
): string {
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const formattedPrice = formatPrice(priceInUSD, currency);
  const ngnPrice = currency !== 'NGN' ? ` (approx. ${formatPrice(priceInUSD, 'NGN')})` : '';

  const text = `Hello Olateetee Luxe! ✨\n\nI am interested in ordering the *${productName}*${volume ? ` (${volume})` : ''} priced at *${formattedPrice}*${ngnPrice}.\n\nCould you please share availability and confirm my order?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function createCartOrderWhatsAppUrl(
  items: CartItem[],
  subtotalUSD: number,
  shippingUSD: number,
  totalUSD: number,
  customer?: OrderDetails,
  currency: CurrencyCode = 'NGN',
  orderId?: string
): string {
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const id = orderId || `OL-${Math.floor(100000 + Math.random() * 900000)}`;

  let message = `*NEW ORDER - OLATEETEE LUXE* 🌸✨\n`;
  message += `*Order ID:* #${id}\n\n`;
  message += `*ORDER ITEMS:*\n`;

  items.forEach((item, index) => {
    const itemTotalUSD = item.quantity * item.product.price;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   Qty: ${item.quantity} × ${formatPrice(item.product.price, currency)}`;
    if (item.product.volume) {
      message += ` (${item.product.volume})`;
    }
    message += ` = *${formatPrice(itemTotalUSD, currency)}*\n`;
  });

  message += `\n─────────────────────\n`;
  message += `*Subtotal:* ${formatPrice(subtotalUSD, currency)}\n`;
  message += `*Delivery:* ${shippingUSD === 0 ? 'FREE' : formatPrice(shippingUSD, currency)}\n`;
  message += `*TOTAL PAYABLE:* *${formatPrice(totalUSD, currency)}*\n`;
  if (currency !== 'NGN') {
    message += `*(Equivalent in NGN for OPAY Transfer: ${formatPrice(totalUSD, 'NGN')})*\n`;
  }
  message += `─────────────────────\n\n`;

  if (customer && customer.customerName) {
    message += `*CUSTOMER & DELIVERY DETAILS:*\n`;
    message += `👤 *Name:* ${customer.customerName}\n`;
    message += `📞 *Phone:* ${customer.phone}\n`;
    message += `📍 *Address:* ${customer.address}\n`;
    if (customer.city) {
      message += `🏙️ *City:* ${customer.city}\n`;
    }
    if (customer.country) {
      message += `🌍 *Country:* ${customer.country}\n`;
    }
    if (customer.notes) {
      message += `📝 *Notes:* ${customer.notes}\n`;
    }
    message += `💳 *Selected Payment:* ${customer.paymentMethod || 'OPAY Bank Transfer'}\n`;
    if (customer.paymentReference) {
      message += `🔖 *Payment Ref/Narration:* ${customer.paymentReference}\n`;
    }
    message += `\n`;
  }

  message += `*OFFICIAL OPAY BANK DETAILS:*\n`;
  message += `🏦 Bank: ${OLATEETEE_BANK_DETAILS.bank}\n`;
  message += `🔢 Account No: ${OLATEETEE_BANK_DETAILS.accountNumber}\n`;
  message += `📛 Account Name: ${OLATEETEE_BANK_DETAILS.accountName}\n\n`;

  message += `⚠️ *DELIVERY ASSURANCE POLICY:*\n`;
  message += `I understand that payment confirmation is required before delivery is assured and dispatched. I am attaching/sending my transfer confirmation screenshot right away!\n\n`;
  message += `Thank you! 💖`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function createPaymentReceiptWhatsAppUrl(
  orderId: string,
  amountFormatted: string,
  customerName: string,
  reference?: string
): string {
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  let message = `*PAYMENT PROOF SUBMISSION - OLATEETEE LUXE* 🧾✅\n\n`;
  message += `Hello! I have completed payment for my order.\n\n`;
  message += `*Order ID:* #${orderId}\n`;
  message += `*Customer Name:* ${customerName}\n`;
  message += `*Amount Paid:* ${amountFormatted}\n`;
  if (reference) {
    message += `*Transfer Reference/Narration:* ${reference}\n`;
  }
  message += `*Bank Paid To:* OPAY (7085948098 - Olateetee Luxe)\n\n`;
  message += `Please verify this payment and confirm my delivery assurance. Here is my receipt screenshot below 👇`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export { FORMATTED_WHATSAPP };
