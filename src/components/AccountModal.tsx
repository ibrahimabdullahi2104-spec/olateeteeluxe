import React, { useState } from 'react';
import { X, User, Package, MapPin, Heart, LogOut, CheckCircle2 } from 'lucide-react';
import { FORMATTED_WHATSAPP } from '../data/products';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onOpenWishlist
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');

  if (!isOpen) return null;

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

          {/* User Brief */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-[#c83264] flex items-center justify-center font-bold text-lg">
              OL
            </div>
            <div>
              <h3 className="text-lg font-serif-luxury font-bold text-stone-900">
                Olateetee Luxe Member
              </h3>
              <p className="text-xs text-stone-500">
                VIP Glow Rewards Member • Exclusive Discounts Active
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-stone-200 mb-5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-2.5 px-4 text-xs font-semibold tracking-wide transition-colors cursor-pointer relative ${
                activeTab === 'orders'
                  ? 'text-[#c83264]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Recent Orders
              {activeTab === 'orders' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#c83264]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-2.5 px-4 text-xs font-semibold tracking-wide transition-colors cursor-pointer relative ${
                activeTab === 'profile'
                  ? 'text-[#c83264]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Profile Settings
              {activeTab === 'profile' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#c83264]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-2.5 px-4 text-xs font-semibold tracking-wide transition-colors cursor-pointer relative ${
                activeTab === 'addresses'
                  ? 'text-[#c83264]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Saved Addresses
              {activeTab === 'addresses' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#c83264]" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'orders' && (
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {[
                {
                  id: 'OL-8391',
                  date: 'Sep 12, 2026',
                  total: '$104.00',
                  items: 'Flawless Face Cream, Golden Glow Body Oil',
                  status: 'Delivered'
                },
                {
                  id: 'OL-7412',
                  date: 'Aug 28, 2026',
                  total: '$45.00',
                  items: 'Vitamin C & 24K Gold Serum',
                  status: 'Delivered'
                }
              ].map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{order.id}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">{order.items}</p>
                    <p className="text-[11px] text-stone-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-stone-900">{order.total}</span>
                    <p className="text-[10px] text-[#c83264] font-semibold mt-1">Re-order</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-500 block mb-1">First Name</label>
                  <input
                    type="text"
                    defaultValue="Fatima"
                    className="w-full p-2.5 border border-stone-200 rounded-lg bg-stone-50"
                  />
                </div>
                <div>
                  <label className="text-stone-500 block mb-1">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Al-Mansoor"
                    className="w-full p-2.5 border border-stone-200 rounded-lg bg-stone-50"
                  />
                </div>
              </div>
              <div>
                <label className="text-stone-500 block mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  defaultValue="+218 91 309 7994"
                  className="w-full p-2.5 border border-stone-200 rounded-lg bg-stone-50"
                />
              </div>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800"
              >
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900">Default Delivery Address</span>
                  <p className="text-stone-600 mt-0.5">Omar Al-Mukhtar St, Building 14, Apt 4</p>
                  <p className="text-stone-500">Tripoli, Libya</p>
                  <p className="text-[11px] text-[#c83264] font-semibold mt-1">WhatsApp: {FORMATTED_WHATSAPP}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#c83264]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
