import React, { useState } from 'react';
import { X, MessageCircle, Phone, MapPin, Mail, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl } from '../utils/whatsapp';

interface AboutContactModalProps {
  isOpen: boolean;
  initialTab?: 'about' | 'contact';
  onClose: () => void;
}

export const AboutContactModal: React.FC<AboutContactModalProps> = ({
  isOpen,
  initialTab = 'about',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);
  const [formName, setFormName] = useState('');
  const [formMsg, setFormMsg] = useState('');

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Olateetee Luxe! ✨\nMy name is ${formName}.\n\nMessage: ${formMsg}`;
    window.open(createWhatsAppChatUrl(text), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-xl transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-150">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <BrandLogo size="md" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-stone-200 mb-6">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 px-6 text-sm font-semibold tracking-wide transition-colors cursor-pointer relative ${
                activeTab === 'about' ? 'text-[#c83264]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              About Olateetee Luxe
              {activeTab === 'about' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#c83264]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-3 px-6 text-sm font-semibold tracking-wide transition-colors cursor-pointer relative ${
                activeTab === 'contact' ? 'text-[#c83264]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Contact &amp; WhatsApp
              {activeTab === 'contact' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#c83264]" />
              )}
            </button>
          </div>

          {activeTab === 'about' ? (
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <p>
                Welcome to <strong className="text-stone-900 font-serif-luxury">Olateetee Luxe</strong> — the premier home of fashion, cosmetics, and organic glow treatments.
              </p>
              <p>
                Our philosophy is simple: <em className="text-[#c83264] font-script text-base">Grow Naturally, Glow Confidently</em>. Every formulation in our collection is curated with clinical-grade botanicals, antioxidant-rich organic oils, pure rose hydrosols, and skin-loving vitamins.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-center">
                  <Sparkles className="w-5 h-5 text-[#c83264] mx-auto mb-1" />
                  <p className="font-bold text-stone-800 text-xs">Cruelty Free &amp; Clean</p>
                  <p className="text-[11px] text-stone-500">Ethically crafted ingredients</p>
                </div>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-center">
                  <HeartHandshake className="w-5 h-5 text-[#c83264] mx-auto mb-1" />
                  <p className="font-bold text-stone-800 text-xs">Trusted By Thousands</p>
                  <p className="text-[11px] text-stone-500">Verified glowing results</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Direct WhatsApp Callout Banner */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                    Direct Client WhatsApp
                  </span>
                  <p className="text-base font-bold text-[#075e54]">{FORMATTED_WHATSAPP}</p>
                  <p className="text-[11px] text-stone-600">Available 7 days a week for immediate orders</p>
                </div>
                <a
                  href={createWhatsAppChatUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Now</span>
                </a>
              </div>

              {/* Quick Message Form */}
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Message / Product Inquiries
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="How can we help you today?"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#c83264] hover:bg-[#b02955] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
