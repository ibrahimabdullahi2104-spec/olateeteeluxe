import React, { useState } from 'react';
import {
  X,
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Landmark,
  Copy,
  Check,
  MessageCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl, createPaymentReceiptWhatsAppUrl } from '../utils/whatsapp';
import { OLATEETEE_BANK_DETAILS, PAYMENT_POLICY } from '../data/paymentConfig';
import { findSavedOrder, SavedOrder } from '../utils/orders';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<SavedOrder | null>(null);
  const [isShowingDemo, setIsShowingDemo] = useState(false);
  const [copiedBankField, setCopiedBankField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    
    setIsShowingDemo(false);
    const found = findSavedOrder(orderNumber);
    setMatchedOrder(found);
    setHasSearched(true);
  };

  const showDemoTracking = () => {
    setIsShowingDemo(true);
    setHasSearched(true);
    setMatchedOrder({
      orderId: 'DEMO-9241',
      customerName: 'Sample Customer',
      phone: '08101470054',
      address: 'Plot 4, Victoria Island',
      city: 'Lagos',
      items: [
        { name: 'Olateetee Luxe Glow Face Cream', quantity: 1, priceFormatted: '₦38,000' },
        { name: 'medicube Collagen Night Wrapping Mask', quantity: 1, priceFormatted: '₦24,000' }
      ],
      totalFormatted: '₦62,000',
      paymentMethod: 'opay_transfer',
      status: 'out_for_delivery',
      createdAt: new Date().toISOString(),
      isDemo: true
    });
  };

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankField(fieldKey);
    setTimeout(() => setCopiedBankField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-150">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-[#c83264] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif-luxury font-bold text-stone-900">
                Track Order &amp; Delivery Status
              </h3>
              <p className="text-xs text-stone-500">
                Enter your order ID or phone number to check live payment &amp; delivery verification
              </p>
            </div>
          </div>

          {/* Delivery Assurance Policy Banner */}
          <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <b>Payment Verification Policy:</b> Orders are dispatched only after payment is received and confirmed by Olateetee Luxe accounts desk.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
                if (hasSearched) setHasSearched(false);
              }}
              placeholder="e.g. OL-123456 or phone number"
              className="flex-1 text-xs sm:text-sm p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c83264]"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-[#c83264] hover:bg-[#b02955] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {hasSearched ? (
            matchedOrder ? (
              <div className="space-y-4 pt-2 border-t border-stone-100">
                {/* Demo Notice if previewing */}
                {isShowingDemo && (
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-[11px]">
                      <b>Preview Mode:</b> This is a sample preview showing how verified orders look after payment confirmation.
                    </span>
                  </div>
                )}

                {/* Status Header */}
                <div
                  className={`flex items-center justify-between text-xs p-3.5 rounded-xl border ${
                    matchedOrder.status === 'awaiting_payment'
                      ? 'bg-amber-50/90 border-amber-200'
                      : 'bg-emerald-50/90 border-emerald-200'
                  }`}
                >
                  <div>
                    <p className="font-bold text-stone-900">Order #{matchedOrder.orderId}</p>
                    <p
                      className={`text-[11px] font-medium ${
                        matchedOrder.status === 'awaiting_payment' ? 'text-amber-800' : 'text-emerald-700'
                      }`}
                    >
                      {matchedOrder.status === 'awaiting_payment'
                        ? '⏳ Awaiting Payment Verification'
                        : '✓ Payment Confirmed • Delivery Assured'}
                    </p>
                    {matchedOrder.customerName && (
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Customer: {matchedOrder.customerName} ({matchedOrder.phone})
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2.5 py-1 font-bold rounded-full text-[10px] ${
                      matchedOrder.status === 'awaiting_payment'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {matchedOrder.status === 'awaiting_payment'
                      ? 'Unverified / Pending'
                      : matchedOrder.status === 'out_for_delivery'
                      ? 'Out For Delivery'
                      : 'Processing'}
                  </span>
                </div>

                {/* Timeline */}
                <div className="space-y-3 py-2 pl-2">
                  {matchedOrder.status === 'awaiting_payment' ? (
                    <>
                      <div className="flex items-start gap-3 relative">
                        <div className="absolute left-2.5 top-6 bottom-0 w-[2px] bg-stone-200" />
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 bg-emerald-500 text-white">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-stone-800">Order Placed &amp; Logged</p>
                          <p className="text-[11px] text-stone-500">Cart invoice registered in checkout system</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">Total: {matchedOrder.totalFormatted}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 relative">
                        <div className="absolute left-2.5 top-6 bottom-0 w-[2px] bg-stone-200" />
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 bg-amber-500 text-white ring-4 ring-amber-100">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-amber-900">Awaiting Bank Payment Verification</p>
                          <p className="text-[11px] text-amber-800">
                            Transfer <b>{matchedOrder.totalFormatted}</b> to OPAY (<b>{OLATEETEE_BANK_DETAILS.accountNumber}</b>) and send screenshot on WhatsApp.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 relative">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 bg-stone-200 text-stone-400">
                          <Truck className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-stone-400">Courier Dispatch</p>
                          <p className="text-[11px] text-stone-400">
                            Scheduled as soon as payment is confirmed by accounts desk.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    [
                      {
                        title: 'Payment Confirmed & Verified',
                        detail: 'Transferred to OPAY (7085948098) • Verified by Accounts',
                        time: 'Confirmed',
                        done: true
                      },
                      {
                        title: 'Delivery Assured & Package Formulated',
                        detail: 'Handcrafted with natural botanical extracts & sealed',
                        time: 'Completed',
                        done: true
                      },
                      {
                        title: 'Dispatched with Courier',
                        detail: 'Assigned to tracked local courier route',
                        time: 'In transit',
                        done: true
                      },
                      {
                        title: 'Out For Delivery',
                        detail: 'Courier dispatching to destination address',
                        time: 'Today',
                        active: true
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 relative">
                        {idx < 3 && <div className="absolute left-2.5 top-6 bottom-0 w-[2px] bg-stone-200" />}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            step.done
                              ? 'bg-emerald-500 text-white'
                              : step.active
                              ? 'bg-[#c83264] text-white ring-4 ring-rose-100'
                              : 'bg-stone-200 text-stone-400'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-stone-800">{step.title}</p>
                          <p className="text-[11px] text-stone-500">{step.detail}</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">{step.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 text-center space-y-2">
                  <a
                    href={createPaymentReceiptWhatsAppUrl(
                      matchedOrder.orderId,
                      matchedOrder.totalFormatted,
                      matchedOrder.customerName,
                      matchedOrder.paymentReference || matchedOrder.orderId
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] px-4 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Payment Proof to Accounts Desk on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setHasSearched(false);
                      setIsShowingDemo(false);
                      setMatchedOrder(null);
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline block mx-auto pt-1 cursor-pointer"
                  >
                    Track another order
                  </button>
                </div>
              </div>
            ) : (
              /* NO ORDER FOUND STATE */
              <div className="space-y-4 pt-2 border-t border-stone-100 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  No Order Found for "{orderNumber}"
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  We don't have a confirmed record for this number yet. No money has been deducted or recorded. If you recently transferred funds or placed an order, please contact our team on WhatsApp with your payment screenshot.
                </p>

                <div className="pt-2 space-y-2">
                  <a
                    href={createWhatsAppChatUrl(
                      `Hello Olateetee Luxe, I want to confirm my order payment status for phone/order: ${orderNumber}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] px-4 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Payment with Founder on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={showDemoTracking}
                    className="text-xs text-stone-500 hover:text-[#c83264] underline block mx-auto pt-1 cursor-pointer"
                  >
                    View Sample Delivery Tracking Preview (Demo)
                  </button>
                </div>
              </div>
            )
          ) : (
            /* INITIAL STATE: Bank Details & Verification Info */
            <div className="space-y-4">
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Official Bank Details for Pending Payments</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    OPAY
                  </span>
                </div>

                <div className="text-xs font-mono bg-white p-2.5 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Bank:</span>
                    <span className="font-bold text-stone-900">{OLATEETEE_BANK_DETAILS.bank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Account No:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      {OLATEETEE_BANK_DETAILS.accountNumber}
                      <button
                        type="button"
                        onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'track_acc')}
                        className="text-stone-500 hover:text-stone-900 p-0.5 cursor-pointer"
                      >
                        {copiedBankField === 'track_acc' ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Name:</span>
                    <span className="font-bold text-stone-900">{OLATEETEE_BANK_DETAILS.accountName}</span>
                  </div>
                </div>

                <p className="text-[10px] text-stone-500 leading-tight">
                  Have an existing order awaiting confirmation? Send your receipt to{' '}
                  <a
                    href={createWhatsAppChatUrl('Hello! Here is my payment receipt for order verification:')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c83264] font-bold underline"
                  >
                    {FORMATTED_WHATSAPP}
                  </a>{' '}
                  to assure delivery.
                </p>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={showDemoTracking}
                  className="text-[11px] text-stone-400 hover:text-stone-600 underline cursor-pointer"
                >
                  View sample delivery tracking preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
