import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Landmark,
  CreditCard,
  Smartphone,
  Globe,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  HelpCircle
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import {
  createCartOrderWhatsAppUrl,
  createPaymentReceiptWhatsAppUrl,
  FORMATTED_WHATSAPP
} from '../utils/whatsapp';
import { CurrencyCode, formatPrice, convertFromUSD, formatDirectAmount } from '../utils/currency';
import { CurrencySelector } from './CurrencySelector';
import { OLATEETEE_BANK_DETAILS, PAYMENT_METHODS, PAYMENT_POLICY } from '../data/paymentConfig';
import { saveOrder } from '../utils/orders';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess?: () => void;
  currentCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  onOpenTrackOrder?: () => void;
  onOpenInternationalGuide?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentCurrency,
  onSelectCurrency,
  onOpenTrackOrder,
  onOpenInternationalGuide
}) => {
  // Steps: 'cart' | 'checkout' | 'confirmation'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  
  const [customer, setCustomer] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    address: '',
    city: 'Tripoli',
    country: 'Libya',
    notes: '',
    paymentMethod: 'opay_transfer',
    paymentReference: '',
    receiptName: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('opay_transfer');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [confirmedOrderTotal, setConfirmedOrderTotal] = useState('');
  const [copiedBankField, setCopiedBankField] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);

  // Card payment simulation states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isOpen) return null;

  const subtotalUSD = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThresholdUSD = 75.0;
  const shippingUSD = subtotalUSD >= freeShippingThresholdUSD || subtotalUSD === 0 ? 0 : 5.0;
  const totalUSD = subtotalUSD + shippingUSD;
  const freeShippingProgress = Math.min(100, (subtotalUSD / freeShippingThresholdUSD) * 100);

  const totalInSelectedCurrency = formatPrice(totalUSD, currentCurrency);
  const totalInNGN = formatPrice(totalUSD, 'NGN');

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankField(fieldKey);
    setTimeout(() => setCopiedBankField(null), 2000);
  };

  const handleWhatsAppOrder = () => {
    const orderId = `OL-${Math.floor(100000 + Math.random() * 900000)}`;
    saveOrder({
      orderId,
      customerName: customer.customerName || 'WhatsApp Customer',
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || 'Delivery Address',
      country: customer.country,
      items: cartItems.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        priceFormatted: formatPrice(item.product.price * item.quantity, currentCurrency)
      })),
      totalFormatted: totalInSelectedCurrency,
      paymentMethod: selectedPaymentMethod,
      paymentReference: customer.paymentReference,
      status: 'awaiting_payment',
      createdAt: new Date().toISOString()
    });

    const url = createCartOrderWhatsAppUrl(
      cartItems,
      subtotalUSD,
      shippingUSD,
      totalUSD,
      {
        ...customer,
        paymentMethod: selectedPaymentMethod,
        receiptName: receiptFileName || undefined
      },
      currentCurrency,
      orderId
    );
    window.open(url, '_blank');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.customerName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsProcessingCheckout(true);
    const newOrderId = `OL-${Math.floor(100000 + Math.random() * 900000)}`;

    saveOrder({
      orderId: newOrderId,
      customerName: customer.customerName,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      items: cartItems.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        priceFormatted: formatPrice(item.product.price * item.quantity, currentCurrency)
      })),
      totalFormatted: totalInSelectedCurrency,
      paymentMethod: selectedPaymentMethod,
      paymentReference: customer.paymentReference,
      status: 'awaiting_payment',
      createdAt: new Date().toISOString()
    });

    setTimeout(() => {
      setIsProcessingCheckout(false);
      setConfirmedOrderId(newOrderId);
      setConfirmedOrderTotal(totalInSelectedCurrency);
      setCheckoutStep('confirmation');
      onClearCart();
    }, 900);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      setReceiptFileName(name);
      setCustomer((prev) => ({ ...prev, receiptName: name }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-2 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#fefdfc] shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300 border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c83264]" />
              <h2 className="text-base sm:text-lg font-serif-luxury font-bold text-stone-900">
                {checkoutStep === 'confirmation'
                  ? 'Order Confirmation'
                  : checkoutStep === 'checkout'
                  ? 'Checkout & Payment'
                  : 'Your Shopping Bag'}
              </h2>
              {checkoutStep === 'cart' && (
                <span className="text-xs bg-rose-100 text-[#c83264] px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Currency Selector */}
              <CurrencySelector
                currentCurrency={currentCurrency}
                onSelectCurrency={onSelectCurrency}
                compact
              />
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery Assurance Notification Bar */}
          <div className="p-2.5 bg-amber-50/90 border-b border-amber-200/80 px-4 flex items-center gap-2 text-xs text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-[11px] leading-tight">
              <b>Important Policy:</b> Payment must be confirmed before assuring customers of delivery dispatch.
            </span>
          </div>

          {/* Free Shipping Progress Indicator (in cart view) */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-3 bg-rose-50/70 border-b border-rose-100 px-4">
              <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#c83264]" />
                  {subtotalUSD >= freeShippingThresholdUSD ? (
                    <span className="text-[#c83264] font-semibold">🎉 You unlocked FREE Delivery!</span>
                  ) : (
                    <span>
                      Add <b>{formatPrice(freeShippingThresholdUSD - subtotalUSD, currentCurrency)}</b> more for Free Delivery
                    </span>
                  )}
                </span>
                <span className="font-bold text-[#c83264]">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#c83264] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* 1. ORDER CONFIRMATION STEP */}
            {checkoutStep === 'confirmation' ? (
              <div className="py-4 space-y-5 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50">
                  <Clock className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
                    Awaiting Payment Confirmation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900">
                    Order Placed: #{confirmedOrderId}
                  </h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1">
                    Thank you, <b>{customer.customerName || 'Customer'}</b>! Total payable:{' '}
                    <span className="font-bold text-[#c83264]">{confirmedOrderTotal}</span>
                    {currentCurrency !== 'NGN' && (
                      <span className="text-stone-500 block text-[11px]">
                        (OPAY NGN Equivalent: <b>{totalInNGN}</b>)
                      </span>
                    )}
                  </p>
                </div>

                {/* Important Delivery Assurance Callout */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300/80 text-left space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Payment Confirmation Before Delivery Assurance</span>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Your package is currently in our queue. In accordance with Olateetee Luxe policy,
                    <b> your delivery date and dispatch are officially guaranteed once payment is verified</b> by our accounts desk.
                  </p>
                </div>

                {/* OPAY Official Bank Details for Payment */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-[#0c2e22] via-[#092219] to-[#04110c] text-white rounded-2xl text-left border border-emerald-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-xs text-emerald-300 uppercase tracking-wider">
                        Official Bank Transfer Details
                      </span>
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                      OPAY Verified
                    </span>
                  </div>

                  <div className="space-y-2 pt-1 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <span className="text-stone-300">Bank:</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {OLATEETEE_BANK_DETAILS.bank}
                        <button
                          type="button"
                          onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.bank, 'conf_bank')}
                          className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                        >
                          {copiedBankField === 'conf_bank' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <span className="text-stone-300">Account Number:</span>
                      <span className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                        {OLATEETEE_BANK_DETAILS.accountNumber}
                        <button
                          type="button"
                          onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'conf_acc')}
                          className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] cursor-pointer"
                        >
                          {copiedBankField === 'conf_acc' ? 'Copied!' : 'Copy'}
                        </button>
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <span className="text-stone-300">Account Name:</span>
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {OLATEETEE_BANK_DETAILS.accountName}
                        <button
                          type="button"
                          onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountName, 'conf_name')}
                          className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                        >
                          {copiedBankField === 'conf_name' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-200/80 leading-tight pt-1">
                    Narration: Use <b>#{confirmedOrderId}</b> or your name.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <a
                    href={createPaymentReceiptWhatsAppUrl(
                      confirmedOrderId,
                      confirmedOrderTotal,
                      customer.customerName,
                      customer.paymentReference || confirmedOrderId
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Send Payment Proof to Founder on WhatsApp</span>
                  </a>

                  {onOpenTrackOrder && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenTrackOrder();
                      }}
                      className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Track Order #{confirmedOrderId} Status
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep('cart');
                      onClose();
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline block mx-auto pt-2 cursor-pointer"
                  >
                    Return to Store
                  </button>
                </div>
              </div>
            ) : checkoutStep === 'checkout' ? (
              
              /* 2. CHECKOUT STEP (Address + Payment Methods) */
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                
                {/* Back button to cart */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Bag Items
                </button>

                {/* Delivery Information Section */}
                <div className="p-4 bg-stone-50/90 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#c83264]" />
                    <span>1. Customer &amp; Delivery Details</span>
                  </h4>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-0.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.customerName}
                        onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                        placeholder="e.g. Fatima Ali / Ibrahim Bello"
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-0.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          placeholder="+218... / +234..."
                          className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-0.5">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          placeholder="Tripoli, Lagos, London..."
                          className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-0.5">
                        Full Delivery Address &amp; Landmarks *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="Street name, house number, nearby landmark"
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-700 block mb-0.5">
                        Special Instructions / Skin Sensitivity Notes
                      </label>
                      <input
                        type="text"
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        placeholder="e.g. Call before arrival, packaging requests"
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods Section (ALL METHODS ALLOWED) */}
                <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#c83264]" />
                      <span>2. Select Payment Method (All Allowed)</span>
                    </h4>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                      All Currencies
                    </span>
                  </div>

                  {/* Payment Method Selector Grid */}
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((method) => {
                      const isSelected = selectedPaymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => {
                            setSelectedPaymentMethod(method.id);
                            setCustomer((prev) => ({ ...prev, paymentMethod: method.id }));
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#c83264] bg-rose-50/40 ring-1 ring-[#c83264]'
                              : 'border-stone-200 bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-[#c83264] text-white' : 'bg-stone-100 text-stone-600'
                              }`}>
                                {method.iconName === 'landmark' && <Landmark className="w-4 h-4" />}
                                {method.iconName === 'credit-card' && <CreditCard className="w-4 h-4" />}
                                {method.iconName === 'message-circle' && <MessageCircle className="w-4 h-4" />}
                                {method.iconName === 'smartphone' && <Smartphone className="w-4 h-4" />}
                                {method.iconName === 'globe' && <Globe className="w-4 h-4" />}
                                {method.iconName === 'dollar-sign' && <DollarSign className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-stone-900">
                                    {method.name}
                                  </span>
                                  {method.badge && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                                      {method.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-stone-500">{method.tagline}</p>
                              </div>
                            </div>

                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#c83264] bg-[#c83264]' : 'border-stone-300'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Contextual Payment Form Details */}
                  {selectedPaymentMethod === 'opay_transfer' && (
                    <div className="mt-3 p-4 bg-gradient-to-br from-[#0a231a] to-[#04110c] text-white rounded-xl space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-emerald-500/30">
                        <span className="text-emerald-300 font-semibold">Transfer Exact Amount:</span>
                        <div className="text-right">
                          <span className="font-bold text-amber-300 text-sm block">
                            {totalInSelectedCurrency}
                          </span>
                          {currentCurrency !== 'NGN' && (
                            <span className="text-[10px] text-emerald-200 block">
                              (OPAY ₦: <b>{totalInNGN}</b>)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bank Details with Copy */}
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                          <span className="text-stone-300">Bank:</span>
                          <span className="font-bold text-white flex items-center gap-1">
                            {OLATEETEE_BANK_DETAILS.bank}
                            <button
                              type="button"
                              onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.bank, 'bank')}
                              className="text-emerald-400 hover:text-emerald-300 p-0.5 cursor-pointer"
                            >
                              {copiedBankField === 'bank' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                          <span className="text-stone-300">Account No:</span>
                          <span className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                            {OLATEETEE_BANK_DETAILS.accountNumber}
                            <button
                              type="button"
                              onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'acc')}
                              className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] cursor-pointer"
                            >
                              {copiedBankField === 'acc' ? 'Copied!' : 'Copy'}
                            </button>
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                          <span className="text-stone-300">Account Name:</span>
                          <span className="font-bold text-white flex items-center gap-1">
                            {OLATEETEE_BANK_DETAILS.accountName}
                            <button
                              type="button"
                              onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountName, 'name')}
                              className="text-emerald-400 hover:text-emerald-300 p-0.5 cursor-pointer"
                            >
                              {copiedBankField === 'name' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>
                        </div>
                      </div>

                      {/* Reference & Proof */}
                      <div className="pt-2 space-y-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-emerald-300 block mb-0.5">
                            Payment Narration / Sender Name
                          </label>
                          <input
                            type="text"
                            value={customer.paymentReference}
                            onChange={(e) => setCustomer({ ...customer, paymentReference: e.target.value })}
                            placeholder="e.g. Sender bank name / your name"
                            className="w-full text-xs p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          />
                        </div>

                        <div>
                          <label className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-dashed border-white/30 text-xs font-semibold text-center cursor-pointer flex items-center justify-center gap-1.5 text-emerald-200 transition-colors">
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleReceiptUpload}
                              className="hidden"
                            />
                            <span>{receiptFileName ? `📎 ${receiptFileName.slice(0, 20)}...` : '📎 Attach Transfer Receipt'}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === 'card_online' && (
                    <div className="mt-3 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs text-stone-600">
                        <span>Card Payment in <b>{currentCurrency}</b></span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
                        </span>
                      </div>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number (4111 2222 3333 4444)"
                        maxLength={19}
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={5}
                          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                        />
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV (3 digits)"
                          maxLength={4}
                          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === 'whatsapp_transfer' && (
                    <div className="mt-3 p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                      <p className="font-bold flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>Direct Founder Payment Concierge</span>
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        You can send payment details and coordinate directly with the founder on WhatsApp
                        (<b>{FORMATTED_WHATSAPP}</b>). Once payment is verified, delivery assurance is issued.
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === 'international_wire' && (
                    <div className="mt-3 p-3.5 bg-blue-50/90 text-blue-950 rounded-xl border border-blue-200 text-xs space-y-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <p className="font-bold flex items-center gap-1.5 text-blue-900">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span>Remitly, Wise, LemFi, Sendwave &amp; Western Union</span>
                        </p>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                          Worldwide
                        </span>
                      </div>

                      <p className="text-[11px] text-blue-900/90 leading-relaxed">
                        For our international clients in the <b>UK, US, Canada, Europe, Middle East &amp; Diaspora</b>: You can remit directly from your local card or bank into our OPAY account.
                      </p>

                      {/* Quick copy OPAY details */}
                      <div className="p-2.5 bg-white/90 rounded-lg border border-blue-200 font-mono text-[11px] space-y-1.5 text-stone-800">
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-stone-500 text-[10px] font-semibold">Bank Name:</span>
                          <span className="font-bold text-stone-900">OPAY (or PayCom)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-stone-500 text-[10px] font-semibold">Account Number:</span>
                          <span className="font-bold text-blue-700 flex items-center gap-1.5">
                            {OLATEETEE_BANK_DETAILS.accountNumber}
                            <button
                              type="button"
                              onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'intl_acc')}
                              className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-sans font-bold cursor-pointer"
                            >
                              {copiedBankField === 'intl_acc' ? 'Copied!' : 'Copy'}
                            </button>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-stone-500 text-[10px] font-semibold">Account Name:</span>
                          <span className="font-bold text-stone-900">{OLATEETEE_BANK_DETAILS.accountName}</span>
                        </div>
                      </div>

                      {/* Open International Guide Trigger */}
                      {onOpenInternationalGuide && (
                        <button
                          type="button"
                          onClick={onOpenInternationalGuide}
                          className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>View Step-by-Step Remittance &amp; Currency Guide</span>
                        </button>
                      )}
                    </div>
                  )}

                  {selectedPaymentMethod === 'cod' && (
                    <div className="mt-3 p-3 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                      <p className="font-bold">⚠️ Cash on Delivery Verification Notice:</p>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        Available for verified local addresses only. Our team will contact you for voice confirmation
                        and address validation before dispatch is authorized.
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Assurance Guarantee Callout */}
                <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200/80 flex items-start gap-2 text-xs text-rose-950">
                  <ShieldCheck className="w-4 h-4 text-[#c83264] shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <b>Olateetee Luxe Assurance:</b> Every payment is securely acknowledged.
                    Payment confirmation is required before courier dispatch is assured.
                  </p>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isProcessingCheckout}
                  className="w-full py-3.5 px-4 bg-[#c83264] hover:bg-[#b02955] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  id="checkout-confirm-btn"
                >
                  {isProcessingCheckout ? (
                    <span>Securing Order...</span>
                  ) : (
                    <>
                      <span>Confirm Order ({totalInSelectedCurrency})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : cartItems.length === 0 ? (
              
              /* 3. EMPTY CART STATE */
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-rose-50 text-[#c83264] rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-base font-serif-luxury text-stone-800 font-semibold">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Discover our bestselling luxury face creams, glowing body oils, and organic beauty essentials.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#a06922] hover:bg-[#89571a] text-white text-xs font-semibold rounded-full shadow-xs transition-all cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              
              /* 4. CART ITEMS LIST VIEW */
              <div className="space-y-4">
                <div className="divide-y divide-stone-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3 flex gap-3.5 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-50"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          {item.product.volume || item.product.category}
                        </p>
                        <p className="text-xs font-bold text-stone-900 mt-1">
                          {formatPrice(item.product.price, currentCurrency)}
                        </p>
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-white p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Notice about Bank Transfer & Any Currency */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-xs text-emerald-950 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold block">OPAY Bank Transfers Accepted</span>
                      <span className="text-[10px] text-emerald-700">
                        Pay in any currency or via OPAY (7085948098)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    Instant
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions (When in Cart view) */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3 shrink-0">
              {/* Totals */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">
                    {formatPrice(subtotalUSD, currentCurrency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {shippingUSD === 0 ? (
                      <span className="text-[#c83264] font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingUSD, currentCurrency)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-100">
                  <span>Total Amount</span>
                  <div className="text-right">
                    <span className="text-base text-[#c83264]">
                      {totalInSelectedCurrency}
                    </span>
                    {currentCurrency !== 'NGN' && (
                      <span className="text-[11px] text-stone-400 block font-normal">
                        (OPAY: {totalInNGN})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* PRIMARY ACTION: Proceed to Checkout with all payment methods */}
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 px-4 bg-[#c83264] hover:bg-[#b02955] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="cart-proceed-checkout-btn"
              >
                <span>Proceed to Checkout (All Payment Methods)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* SECONDARY ACTION: Order via WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="cart-whatsapp-order-btn"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Order directly via WhatsApp ({FORMATTED_WHATSAPP})</span>
              </button>

              <p className="text-[10px] text-center text-stone-400">
                🔒 Transfers (OPAY 7085948098), Cards, Mobile Money &amp; Global Currencies Accepted
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
