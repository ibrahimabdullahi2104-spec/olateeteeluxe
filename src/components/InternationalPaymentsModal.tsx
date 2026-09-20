import React, { useState } from 'react';
import {
  X,
  Globe,
  Landmark,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Calculator,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { OLATEETEE_BANK_DETAILS, PAYMENT_POLICY } from '../data/paymentConfig';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl } from '../utils/whatsapp';
import { CURRENCIES, CurrencyCode, convertBetween, formatDirectAmount } from '../utils/currency';

interface InternationalPaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCurrency?: CurrencyCode;
  orderTotalNGN?: number;
}

export const InternationalPaymentsModal: React.FC<InternationalPaymentsModalProps> = ({
  isOpen,
  onClose,
  defaultCurrency = 'USD',
  orderTotalNGN
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'calculator' | 'tips'>('services');
  const [selectedService, setSelectedService] = useState<'remitly' | 'wise' | 'western_union' | 'lemfi' | 'sendwave'>('remitly');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Currency calculator states
  const [calcSourceCurrency, setCalcSourceCurrency] = useState<CurrencyCode>(
    defaultCurrency === 'NGN' ? 'USD' : defaultCurrency
  );
  const [calcForeignAmount, setCalcForeignAmount] = useState<string>('50');
  const [calcNgnAmount, setCalcNgnAmount] = useState<string>(
    orderTotalNGN ? Math.round(orderTotalNGN).toString() : '77500'
  );
  const [calcDirection, setCalcDirection] = useState<'foreign_to_ngn' | 'ngn_to_foreign'>('foreign_to_ngn');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Live conversion calculations
  const sourceConfig = CURRENCIES[calcSourceCurrency] || CURRENCIES.USD;
  const ngnConfig = CURRENCIES.NGN;
  // Rate: How many NGN for 1 unit of source currency
  const ngnPerUnitForeign = (1 / sourceConfig.rateAgainstUSD) * ngnConfig.rateAgainstUSD;

  const calculatedNgn = parseFloat(calcForeignAmount) > 0
    ? Math.round(parseFloat(calcForeignAmount) * ngnPerUnitForeign)
    : 0;

  const calculatedForeign = parseFloat(calcNgnAmount) > 0
    ? (parseFloat(calcNgnAmount) / ngnPerUnitForeign).toFixed(2)
    : '0.00';

  const services = [
    {
      id: 'remitly',
      name: 'Remitly',
      tag: 'Worldwide • Fast Deposit',
      coverage: 'USA, UK, Canada, Europe, Australia, 170+ countries',
      speed: 'Instant / Minutes',
      steps: [
        'Open the Remitly app or visit remitly.com.',
        'Choose "Send to Nigeria" as the destination country.',
        'Delivery Method: Choose "Bank Deposit".',
        'Select Bank: Select "OPAY" (or "OPAY / PayCom").',
        'Enter Account Number: 7085948098.',
        'Recipient Name: Olateetee Luxe (auto-verifies).',
        'Pay with your local debit card, credit card, or bank account. The funds land directly in our OPAY account in Naira.'
      ],
      proTip: 'Remitly provides guaranteed delivery times and transparent exchange rates before you send.'
    },
    {
      id: 'wise',
      name: 'Wise',
      tag: 'Mid-Market Rates • Low Fees',
      coverage: 'UK, USA, Europe, Canada, 80+ countries',
      speed: 'Instant to 1 Hour',
      steps: [
        'Log in to Wise (web or app) and select "Send Money".',
        'Select your currency (USD, GBP, EUR, CAD, etc.) and set the recipient currency to Nigerian Naira (NGN).',
        'Choose "Someone else" as recipient.',
        'Choose "Bank account" $\\rightarrow$ select "OPAY" (or "PayCom") from the bank directory.',
        'Enter Account Number: 7085948098.',
        'Account Name: Olateetee Luxe.',
        'Wise applies the mid-market exchange rate with zero hidden markup. Complete payment via debit card or bank debit.'
      ],
      proTip: 'Wise gives transparent breakdowns of exchange rates with no hidden currency markups.'
    },
    {
      id: 'western_union',
      name: 'Western Union',
      tag: 'Global Network • Direct to Bank',
      coverage: 'Worldwide (200+ countries)',
      speed: 'Within Minutes',
      steps: [
        'Go to westernunion.com or open the Western Union mobile app.',
        'Set Destination to "Nigeria".',
        'Choose receive method: "Bank Account" (Direct to Bank).',
        'Select Receiver\'s Bank: Search for "OPAY" or "Paycom/OPAY".',
        'Enter Account Number: 7085948098.',
        'Receiver Name: Olateetee Luxe.',
        'Pay using your foreign credit/debit card or online banking.'
      ],
      proTip: 'Make sure to select the "Direct to Bank Account" option rather than cash pickup.'
    },
    {
      id: 'lemfi',
      name: 'LemFi',
      tag: 'Zero Fees • Highest Recommended',
      coverage: 'United Kingdom, USA, Canada',
      speed: 'Instant (10 Seconds)',
      steps: [
        'Download LemFi app from the App Store or Google Play.',
        'Fund your LemFi multi-currency wallet with GBP, USD, or CAD.',
        'Tap "Send" $\\rightarrow$ Select "Nigeria" $\\rightarrow$ "Bank Account".',
        'Search and select "OPAY".',
        'Type in 7085948098. The app instantly displays "Olateetee Luxe".',
        'Confirm transfer. 0% transfer fee, instant deposit notification!'
      ],
      proTip: 'LemFi is often the fastest and cheapest option for customers residing in the UK, US, and Canada.'
    },
    {
      id: 'sendwave',
      name: 'Sendwave',
      tag: 'No Transfer Fees • Top Rated',
      coverage: 'USA, UK, Canada, France, Italy, Spain, Ireland',
      speed: 'Instant Delivery',
      steps: [
        'Open Sendwave app on your smartphone.',
        'Select "Nigeria" as destination.',
        'Tap "Add Recipient" $\\rightarrow$ Bank: Select "OPAY".',
        'Enter Account: 7085948098.',
        'Name: Olateetee Luxe.',
        'Enter the amount and send with $0 transfer fee.'
      ],
      proTip: 'Sendwave specializes in instant remittance directly to Nigerian mobile wallets and OPAY accounts.'
    }
  ];

  const activeServiceData = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all border border-stone-200 animate-in zoom-in-95 duration-150">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#172e22] via-[#0f2218] to-[#0a1811] text-white p-6 sm:p-7 relative border-b border-emerald-500/20">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>International Payment Guide</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Direct Deposit to OPAY</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-1.5">
              How Customers Abroad Can Pay Into OPAY
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Living in the <b>UK, USA, Canada, Europe, Middle East</b>, or anywhere in the diaspora?
              You can send funds directly from your local foreign card or bank account into our verified OPAY account within minutes using modern remittance services.
            </p>
          </div>

          <div className="p-5 sm:p-7 space-y-6">
            {/* Verified OPAY Account Card */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-[#f6faf8] via-[#eef6f2] to-[#f7f9f8] border border-emerald-300 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    OP
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Official Olateetee Luxe Receiving Account
                    </span>
                    <span className="text-xs text-stone-600">
                      Use these exact details in Remitly, Wise, LemFi, or Western Union
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  Country: Nigeria (NGN)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {/* Bank */}
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-sans text-stone-500 uppercase block font-semibold">Bank Name:</span>
                    <span className="font-bold text-stone-900">{OLATEETEE_BANK_DETAILS.bank}</span>
                    <span className="text-[10px] font-sans text-stone-400 block">(or PayCom)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.bank, 'modal_bank')}
                    className="p-1 text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    title="Copy bank name"
                  >
                    {copiedField === 'modal_bank' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Account Number */}
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-sans text-stone-500 uppercase block font-semibold">Account Number:</span>
                    <span className="font-bold text-emerald-800 text-sm tracking-wider">{OLATEETEE_BANK_DETAILS.accountNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountNumber, 'modal_acc')}
                    className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[10px] font-sans font-bold cursor-pointer"
                  >
                    {copiedField === 'modal_acc' ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Account Name */}
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-sans text-stone-500 uppercase block font-semibold">Account Name:</span>
                    <span className="font-bold text-stone-900">{OLATEETEE_BANK_DETAILS.accountName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(OLATEETEE_BANK_DETAILS.accountName, 'modal_name')}
                    className="p-1 text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    title="Copy account name"
                  >
                    {copiedField === 'modal_name' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-200 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'services'
                    ? 'border-[#c83264] text-[#c83264]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Step-by-Step Remittance Apps</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'calculator'
                    ? 'border-[#c83264] text-[#c83264]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Live Currency Calculator &amp; Rates</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tips')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'tips'
                    ? 'border-[#c83264] text-[#c83264]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Currency Conversion Tips</span>
              </button>
            </div>

            {/* TAB 1: STEP-BY-STEP SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Service Selector Chips */}
                <div className="flex flex-wrap gap-2">
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        selectedService === srv.id
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span>{srv.name}</span>
                      {srv.id === 'lemfi' && (
                        <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                          Zero Fee
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected Service Card */}
                <div className="p-4 sm:p-5 bg-[#faf8f6] rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                        <span>Using {activeServiceData.name}</span>
                        <span className="text-[11px] font-normal text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                          {activeServiceData.tag}
                        </span>
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        <b>Supported regions:</b> {activeServiceData.coverage}
                      </p>
                    </div>
                    <div className="text-right self-start sm:self-auto">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Expected Arrival</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ⚡ {activeServiceData.speed}
                      </span>
                    </div>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                      Follow these simple steps:
                    </p>
                    <ol className="space-y-2">
                      {activeServiceData.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-rose-100 text-[#c83264] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Pro Tip Box */}
                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      <b>Insider Tip:</b> {activeServiceData.proTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE CURRENCY CALCULATOR */}
            {activeTab === 'calculator' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                        <Calculator className="w-4 h-4 text-[#c83264]" />
                        <span>Interactive Remittance Calculator</span>
                      </h3>
                      <p className="text-xs text-stone-500">
                        See how your foreign currency converts to Nigerian Naira (NGN) for Olateetee Luxe.
                      </p>
                    </div>
                    <div className="text-xs text-stone-600 bg-white px-3 py-1 rounded-xl border border-stone-200 font-mono">
                      1 {calcSourceCurrency} ≈ {Math.round(ngnPerUnitForeign).toLocaleString()} NGN
                    </div>
                  </div>

                  {/* Currency Picker */}
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Select Your Sending Currency:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(['USD', 'GBP', 'EUR', 'CAD', 'LYD', 'AED'] as CurrencyCode[]).map((code) => {
                        const conf = CURRENCIES[code];
                        return (
                          <button
                            key={code}
                            type="button"
                            onClick={() => setCalcSourceCurrency(code)}
                            className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                              calcSourceCurrency === code
                                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            <span className="text-sm">{conf.flag}</span>
                            <span className="font-bold">{code}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Converter Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                        You Send ({sourceConfig.name} - {calcSourceCurrency})
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2.5 text-xs text-stone-400 font-bold">
                          {sourceConfig.symbol}
                        </span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={calcForeignAmount}
                          onChange={(e) => {
                            setCalcForeignAmount(e.target.value);
                            setCalcDirection('foreign_to_ngn');
                          }}
                          className="w-full text-sm font-bold pl-7 pr-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#c83264]"
                          placeholder="e.g. 50"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
                      <label className="text-[10px] font-bold uppercase text-emerald-800 block mb-1">
                        Estimated Deposit in OPAY (NGN ₦)
                      </label>
                      <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-emerald-200">
                        <span className="text-base font-bold text-emerald-800">
                          ₦{calculatedNgn.toLocaleString('en-US')}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Lands in OPAY
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 italic leading-relaxed pt-1">
                    * Rates shown are approximate benchmark conversions. Services like Wise, Remitly, and LemFi will display their exact guaranteed payout rate before you authorize the transfer.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: CURRENCY CONVERSION TIPS */}
            {activeTab === 'tips' && (
              <div className="space-y-3 animate-in fade-in duration-150 text-xs">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c83264]" />
                    <span>Essential Tips for International Remittances to OPAY</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1. Select NGN as Recipient Currency</span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        In your app (Remitly, Wise, LemFi), pay with your local card in USD, GBP, or EUR, but set the recipient currency to <b>Nigerian Naira (NGN)</b>. The app handles the currency exchange seamlessly behind the scenes.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>2. Search for "OPAY" or "PayCom"</span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        OPAY's central banking license in Nigeria is registered as <b>PayCom</b>. If you do not see "OPAY" in a dropdown list, search for "PayCom" or "OPAY Digital Services".
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>3. Take Advantage of $0 Transfer Fees</span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        Avoid expensive traditional wire bank fees ($30 - $50). Apps like <b>LemFi</b> and <b>Sendwave</b> charge <b>$0 transfer fee</b> for sends to Nigeria and offer live competitive exchange rates.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>4. Always Include Reference or Name</span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        In the transfer narration/note, type your <b>Order ID</b> (e.g. OLT-12345) or full name. This helps our finance team match your remittance in under 5 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Assurance Bottom Notice */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Delivery Assurance Policy</span>
                </span>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  <b>Payment should be confirmed before assuring customers of delivery.</b> Once your transfer arrives in OPAY, your delivery slot is locked and dispatch is initiated.
                </p>
              </div>

              <a
                href={createWhatsAppChatUrl('Hello! I am sending an international payment to OPAY (7085948098 - Olateetee Luxe) and would like to confirm my receipt with the founder.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Footer Action */}
          <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              Need assistance? The founder is available on WhatsApp 24/7.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Got It / Return
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
