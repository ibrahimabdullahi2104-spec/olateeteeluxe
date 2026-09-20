import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, Mail, MapPin, Phone, ShieldCheck, Heart, ArrowRight, Sparkles, Landmark, Copy, Check, AlertCircle, Globe } from 'lucide-react';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl } from '../utils/whatsapp';
import { OLATEETEE_BANK_DETAILS, PAYMENT_POLICY } from '../data/paymentConfig';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenTrackOrder: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenInternationalGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTrackOrder,
  onOpenAbout,
  onOpenContact,
  onOpenInternationalGuide
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedBankField, setCopiedBankField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankField(fieldKey);
    setTimeout(() => setCopiedBankField(null), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#1b1718] text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Official Bank Account & Delivery Assurance Feature Card */}
        <div className="mb-12 p-5 sm:p-6 bg-gradient-to-br from-[#12281e] via-[#0d1f17] to-[#07130e] border border-emerald-500/30 rounded-3xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Left explanation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Official Bank Details &bull; All Currencies Accepted
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-white">
                Olateetee Luxe Receiving Account
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Customers worldwide can pay in any currency. All payment methods, including direct bank transfers, are fully supported.
              </p>
            </div>

            {/* Middle Bank Details Display */}
            <div className="p-3.5 bg-black/40 rounded-2xl border border-emerald-500/20 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-stone-300">
                <span>Bank:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  {OLATEETEE_BANK_DETAILS.bank}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.bank, 'footer_bank')}
                    className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    {copiedBankField === 'footer_bank' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </span>
              </div>

              <div className="flex justify-between items-center text-stone-300">
                <span>Account Number:</span>
                <span className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  {OLATEETEE_BANK_DETAILS.accountNumber}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'footer_acc')}
                    className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-sans font-semibold cursor-pointer"
                  >
                    {copiedBankField === 'footer_acc' ? 'Copied!' : 'Copy'}
                  </button>
                </span>
              </div>

              <div className="flex justify-between items-center text-stone-300">
                <span>Account Name:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  {OLATEETEE_BANK_DETAILS.accountName}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountName, 'footer_name')}
                    className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    {copiedBankField === 'footer_name' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </span>
              </div>
            </div>

            {/* Right Delivery Assurance Notice */}
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Delivery Assurance Policy</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-300">
                <b>Payment should be confirmed before assuring customers of delivery.</b> Once your transfer or payment is verified by our finance team, delivery date is guaranteed and order is dispatched.
              </p>
              <a
                href={createWhatsAppChatUrl('Hello! I have completed my transfer to OPAY (7085948098) and would like to send my receipt for delivery confirmation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 hover:text-emerald-200 underline pt-1 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Submit payment receipt on WhatsApp</span>
              </a>

              {onOpenInternationalGuide && (
                <button
                  type="button"
                  onClick={onOpenInternationalGuide}
                  className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-500/30"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Paying from Abroad? (Wise, Remitly, LemFi Guide)</span>
                </button>
              )}
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start text-left">
              <BrandLogo size="md" variant="dark" />
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Curating luxury skincare, cosmetic brilliance, and organic body oils designed to reveal your healthiest, radiant glow.
            </p>

            {/* WhatsApp Contact Box */}
            <div className="p-3.5 bg-stone-900/90 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Official WhatsApp Order Line
                </span>
                <span className="text-sm font-bold text-white">{FORMATTED_WHATSAPP}</span>
              </div>
              <a
                href={createWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Skincare', 'Makeup', 'Body Care', 'Hair Care', 'Fragrance'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenTrackOrder}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Track Order &amp; Delivery Status
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  About Olateetee Luxe
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Contact &amp; Consultations
                </button>
              </li>
              {onOpenInternationalGuide && (
                <li>
                  <button
                    onClick={onOpenInternationalGuide}
                    className="hover:text-emerald-400 text-emerald-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>International Payments (Wise, Remitly, LemFi)</span>
                  </button>
                </li>
              )}
              <li>
                <span className="text-stone-500">Fast Libya &amp; Global Shipping</span>
              </li>
              <li>
                <span className="text-stone-500">100% Authentic Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              The Glow Club
            </h4>
            <p className="text-xs text-stone-400">
              Subscribe for exclusive secret discounts and early access to new beauty drops.
            </p>
            {subscribed ? (
              <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-200">
                ✨ Welcome to the Glow Club! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c83264] hover:bg-[#b02955] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & payment trust */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Olateetee Luxe. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
            <span>OPAY (7085948098)</span>
            <span>•</span>
            <span>Bank Transfers</span>
            <span>•</span>
            <span>All Global Currencies</span>
            <span>•</span>
            <span>Cards &amp; Mobile Money</span>
            <span>•</span>
            <span>Confirmed Payment Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
