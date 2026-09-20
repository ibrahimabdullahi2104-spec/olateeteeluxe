import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock } from 'lucide-react';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl } from '../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    '✨ Hi, I need help choosing the best skincare routine for my skin.',
    '📦 Hi Olateetee Luxe, I want to track my order delivery.',
    '🛍️ Hi, I would like to place a custom order.',
    '💄 Do you have wholesale pricing for cosmetics?'
  ];

  const handleSendPrompt = (text: string) => {
    window.open(createWhatsAppChatUrl(text), '_blank');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) {
      window.open(createWhatsAppChatUrl(), '_blank');
    } else {
      window.open(createWhatsAppChatUrl(customMsg), '_blank');
    }
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-3 xs:right-4 sm:right-8 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Modal */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-28px)] max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-3.5 sm:p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-sm sm:text-base">
                  OL
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">Olateetee Luxe Support</h4>
                <p className="text-[10px] sm:text-[11px] text-white/85 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Online • Quick Replies</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 sm:p-4 bg-stone-50 space-y-2.5 sm:space-y-3">
            {/* Welcome Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-2xs border border-stone-100 text-xs text-stone-700 leading-relaxed">
              <p className="font-semibold text-stone-900 mb-0.5">Welcome to Olateetee Luxe! ✨</p>
              <p>How can we assist you today? Chat directly with our beauty advisors on WhatsApp.</p>
              <div className="mt-1.5 text-[10px] text-[#075e54] font-bold">
                Direct Line: {FORMATTED_WHATSAPP}
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Quick Inquiries:
              </p>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-rose-50/70 border border-stone-200/80 text-[11px] text-stone-700 hover:text-[#c83264] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3 h-3 text-stone-400 group-hover:text-[#c83264] shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSendCustom} className="p-2.5 sm:p-3 bg-white border-t border-stone-100 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#25D366]"
            />
            <button
              type="submit"
              className="p-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xs transition-colors cursor-pointer"
              title="Open in WhatsApp"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border-2 border-white"
        aria-label="Contact client on WhatsApp"
        id="floating-whatsapp-trigger-btn"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-400 border border-white" />
        </span>

        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
        <div className="hidden sm:flex flex-col items-start text-left leading-none">
          <span className="text-[10px] font-medium text-emerald-100 uppercase tracking-wider">Order / Chat</span>
          <span className="text-xs font-bold">{FORMATTED_WHATSAPP}</span>
        </div>
      </button>
    </div>
  );
};
