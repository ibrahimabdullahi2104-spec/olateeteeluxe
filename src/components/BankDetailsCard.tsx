import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, AlertCircle, MessageCircle, Landmark, ExternalLink } from 'lucide-react';
import { OLATEETEE_BANK_DETAILS, PAYMENT_POLICY } from '../data/paymentConfig';
import { createPaymentReceiptWhatsAppUrl } from '../utils/whatsapp';

interface BankDetailsCardProps {
  amountFormatted?: string;
  orderId?: string;
  customerName?: string;
  compact?: boolean;
  onReceiptUploaded?: (receiptName: string) => void;
}

export const BankDetailsCard: React.FC<BankDetailsCardProps> = ({
  amountFormatted,
  orderId,
  customerName = 'Customer',
  compact = false,
  onReceiptUploaded
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [referenceInput, setReferenceInput] = useState('');
  const [attachedReceiptName, setAttachedReceiptName] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setAttachedReceiptName(fileName);
      if (onReceiptUploaded) {
        onReceiptUploaded(fileName);
      }
    }
  };

  return (
    <div className={`rounded-2xl border transition-all ${
      compact
        ? 'p-4 bg-emerald-50/50 border-emerald-200'
        : 'p-5 sm:p-6 bg-gradient-to-br from-[#0c2e22] via-[#092219] to-[#04110c] text-white border-emerald-500/40 shadow-xl'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            compact ? 'bg-emerald-600 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
          }`}>
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`font-bold text-sm sm:text-base flex items-center gap-1.5 ${
              compact ? 'text-emerald-950' : 'text-white font-serif-luxury'
            }`}>
              <span>Official OPAY Bank Details</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </h4>
            <p className={`text-xs ${compact ? 'text-emerald-700' : 'text-emerald-300/80'}`}>
              Transfer via your Bank App, OPAY App, or USSD
            </p>
          </div>
        </div>

        {amountFormatted && (
          <div className="text-right">
            <span className={`text-[10px] uppercase font-bold block ${
              compact ? 'text-emerald-700' : 'text-emerald-400'
            }`}>
              Payable
            </span>
            <span className={`text-sm sm:text-base font-bold ${
              compact ? 'text-emerald-900' : 'text-amber-300'
            }`}>
              {amountFormatted}
            </span>
          </div>
        )}
      </div>

      {/* Account Details Box */}
      <div className={`rounded-xl p-3.5 sm:p-4 space-y-3 ${
        compact ? 'bg-white border border-emerald-200/80 text-stone-800' : 'bg-white/10 backdrop-blur-md border border-white/10 text-white'
      }`}>
        {/* Account Number */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-stone-200/40">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-emerald-300/80 block">
              Account Number
            </span>
            <span className="text-base sm:text-lg font-mono font-bold tracking-wider text-stone-900 dark:text-white">
              {OLATEETEE_BANK_DETAILS.accountNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'accNumber')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            {copiedField === 'accNumber' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Bank Name */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-stone-200/40">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-emerald-300/80 block">
              Bank
            </span>
            <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
              {OLATEETEE_BANK_DETAILS.bank}
            </span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.bank, 'bank')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              compact ? 'text-emerald-700 hover:bg-emerald-100' : 'text-emerald-300 hover:bg-white/10'
            }`}
            title="Copy Bank Name"
          >
            {copiedField === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Account Name */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-emerald-300/80 block">
              Account Name
            </span>
            <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
              {OLATEETEE_BANK_DETAILS.accountName}
            </span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountName, 'accName')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              compact ? 'text-emerald-700 hover:bg-emerald-100' : 'text-emerald-300 hover:bg-white/10'
            }`}
            title="Copy Account Name"
          >
            {copiedField === 'accName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Payment Confirmation & Delivery Assurance Notice */}
      <div className={`mt-3.5 p-3 rounded-xl flex items-start gap-2.5 text-xs ${
        compact ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-amber-400/15 border border-amber-400/30 text-amber-200'
      }`}>
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
        <div className="space-y-1">
          <p className="font-bold">
            Important Delivery Assurance Notice:
          </p>
          <p className="text-[11px] leading-relaxed opacity-90">
            Payment must be confirmed before assuring customers of delivery.
            Once you make the transfer, submit your receipt or narration below for instant verification and dispatch scheduling.
          </p>
        </div>
      </div>

      {/* Fast Receipt & Reference Submission */}
      <div className="mt-4 pt-3 border-t border-emerald-500/20 space-y-2.5">
        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${
            compact ? 'text-stone-700' : 'text-emerald-200'
          }`}>
            Sender Name or Payment Reference / Narration:
          </label>
          <input
            type="text"
            value={referenceInput}
            onChange={(e) => setReferenceInput(e.target.value)}
            placeholder={`e.g. ${customerName} / ${orderId || 'Order Payment'}`}
            className={`w-full text-xs p-2.5 rounded-xl border focus:outline-none ${
              compact
                ? 'bg-white border-emerald-300 text-stone-900 focus:ring-1 focus:ring-emerald-500'
                : 'bg-white/10 border-white/20 text-white placeholder-stone-400 focus:ring-1 focus:ring-emerald-400'
            }`}
          />
        </div>

        {/* Upload Receipt or WhatsApp Submission */}
        <div className="flex flex-wrap gap-2 pt-1">
          <label className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-dashed border-white/30 text-xs font-semibold text-center cursor-pointer flex items-center justify-center gap-1.5 text-emerald-200 hover:text-white transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span>{attachedReceiptName ? `📎 ${attachedReceiptName.slice(0, 18)}...` : '📎 Attach Transfer Receipt'}</span>
          </label>

          {orderId && (
            <a
              href={createPaymentReceiptWhatsAppUrl(
                orderId,
                amountFormatted || 'Order Amount',
                customerName,
                referenceInput
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Verify via WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
