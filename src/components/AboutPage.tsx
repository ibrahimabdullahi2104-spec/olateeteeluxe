import React from 'react';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Award,
  Users,
  MessageCircle,
  ArrowLeft,
  Star,
  Clock,
  Truck,
  ShoppingBag,
  Leaf,
  Lock,
  CheckCircle2,
  PhoneCall,
  HelpCircle,
  Quote,
  Landmark,
  CreditCard,
  Globe,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FORMATTED_WHATSAPP } from '../data/products';
import { createWhatsAppChatUrl } from '../utils/whatsapp';
import { BankDetailsCard } from './BankDetailsCard';

interface AboutPageProps {
  onBackToShop: () => void;
  onSelectCategory: (category: string) => void;
  onOpenInternationalGuide?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToShop,
  onSelectCategory,
  onOpenInternationalGuide
}) => {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '100% Authentic & Safe Formulations',
      desc: 'We strictly reject harsh bleaching agents, hydroquinone, steroids, and toxic fillers. Every cream, oil, and cosmetic is thoroughly tested, certified safe, and formulated to nourish your natural skin barrier.'
    },
    {
      icon: Users,
      title: 'Direct Access to the Business Owner',
      desc: 'You are never talking to an automated bot. The founder is personally available on WhatsApp (+21891-3097994) to answer your skin concerns, recommend tailored routines, and ensure your absolute satisfaction.'
    },
    {
      icon: Truck,
      title: 'Reliable, Swift & Tracked Delivery',
      desc: 'Orders are securely packaged in tamper-evident luxury wraps and dispatched promptly. Every customer receives transparent real-time updates and active tracking till delivery at your doorstep.'
    },
    {
      icon: Award,
      title: 'Integrity & Fair Pricing Guarantee',
      desc: 'Honesty is our hallmark. We offer genuine luxury at transparent prices with no hidden charges, full price clarity, and an uncompromising return/replacement guarantee for any delivery defect.'
    }
  ];

  const productLines = [
    {
      title: 'Skincare Essentials',
      tagline: 'Deep Hydration, Barrier Repair & Natural Glow',
      badge: 'Bestselling Line',
      desc: 'Formulated with cold-pressed botanical oils, niacinamide, hyaluronic acid, vitamin C, and organic herbal extracts. Our gentle cleansers, balancing toners, hydrating moisturizers, and UV sunscreens protect, brighten, and heal without peeling or thinning the skin.',
      categoryKey: 'Skincare'
    },
    {
      title: 'Radiance Body Care',
      tagline: 'Silky Smooth, Melanin-Rich Skin Glow',
      badge: 'Customer Favorite',
      desc: 'From rich whipped shea & cocoa butters to shimmering gold radiance oils and exfoliating coffee scrubs, our body collection treats dryness, strawberry skin, stretch marks, and uneven tone for head-to-toe confidence.',
      categoryKey: 'Body Care'
    },
    {
      title: 'Hair Care & Scalp Growth',
      tagline: 'Stronger Roots, Thicker Edges & Lustrous Length',
      badge: 'Herbal Formula',
      desc: 'Infused with rosemary, peppermint, chebe, and castor seed extracts. Our scalp stimulators, leave-in conditioners, and moisture creams restore thinning edges, tame frizz, and promote vigorous, healthy hair growth.',
      categoryKey: 'Hair Care'
    },
    {
      title: 'Luxury Cosmetics & Makeup',
      tagline: 'Flawless Pigments Designed to Complement Your Glow',
      badge: 'Beauty Essentials',
      desc: 'Long-wearing hydrating lip glosses, rich matte velvets, glowing blush palettes, and high-definition complexion enhancers crafted to let your natural features radiate with effortless elegance.',
      categoryKey: 'Makeup'
    },
    {
      title: 'Artisan Perfumes & Mists',
      tagline: 'Long-Lasting, Signature Scents That Linger',
      badge: 'Luxury Fragrance',
      desc: 'Exquisite Arabian and French-inspired fragrance oils and invigorating body mists formulated with concentrated notes of amber, oud, vanilla, and fresh florals for an unforgettable impression.',
      categoryKey: 'Fragrance'
    }
  ];

  const testimonials = [
    {
      name: 'Amina B., Tripoli',
      role: 'Verified Customer (2+ Years)',
      text: 'What makes Olateetee Luxe special is the honesty of the business owner. When I first messaged, she asked about my skin history and advised me against buying a harsh product I thought I needed. Instead, she recommended a gentle routine that completely transformed my skin without any peeling. She is a woman of high integrity!',
      rating: 5
    },
    {
      name: 'Fatima Z., Benghazi',
      role: 'Verified Buyer',
      text: 'Delivery was so fast! Within 24 hours my package arrived in beautiful packaging. The glow oil smells divine and gives that luxury sheen without being sticky. The owner followed up to ensure I received everything in perfect condition. Truly reliable service.',
      rating: 5
    },
    {
      name: 'Nneka O., Lagos',
      role: 'Repeat Customer',
      text: 'In the cosmetics world where fake products and harsh bleaches are everywhere, Olateetee Luxe is a breath of fresh air. 100% original, skin-safe, and the WhatsApp customer service is unmatched. I recommend her to all my friends with complete confidence.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'How do I know Olateetee Luxe products are safe and non-bleaching?',
      a: 'We have a zero-tolerance policy against dangerous lightening chemicals like hydroquinone, mercury, and unregulated steroids. Our motto is "Grow Naturally, Glow Confidently". Our products work by nourishing the skin barrier, encouraging cellular renewal, and enhancing your natural tone safely and gradually.'
    },
    {
      q: 'Can I speak directly with the owner before purchasing?',
      a: 'Yes, absolutely! The business owner is available directly on WhatsApp (+21891-3097994). You can send photos of your skin concerns or ask for shade recommendations, and she will provide tailored, honest guidance before you spend a single cent.'
    },
    {
      q: 'How reliable is the shipping and order tracking?',
      a: 'We take delivery very seriously. Once your order is confirmed, it is inspected, hand-packed with protective cushioning, and dispatched. You receive a unique tracking ID and direct updates until your package is safely handed to you.'
    },
    {
      q: 'What is your refund or satisfaction policy?',
      a: 'We stand 100% behind the authenticity and quality of every single item. If your product arrives damaged or incorrect, we immediately replace it or issue a prompt refund without excuses. Your peace of mind is our primary promise.'
    },
    {
      q: 'Can customers from abroad pay into your OPAY account using Wise, Remitly, Western Union, or LemFi?',
      a: 'Yes, absolutely! Millions of customers in the UK, USA, Canada, Europe, and worldwide use remittance services like Remitly, Wise, LemFi, Sendwave, and Western Union to deposit money directly into Nigerian bank accounts and OPAY wallets. When setting up your transfer in these apps, select destination "Nigeria", choose delivery method "Bank Account", search for "OPAY" (or "PayCom"), and enter our official account number: 7085948098 (Name: Olateetee Luxe). The funds convert to Naira and arrive in our OPAY account in minutes!'
    },
    {
      q: 'How does currency conversion work when I pay from abroad?',
      a: 'You do NOT need a Nigerian bank account or physical Naira. When you use an app like Remitly, Wise, or LemFi, you pay in your own local currency (USD $, GBP £, EUR €, CAD $, etc.) using your foreign bank debit card or Apple Pay. The remittance platform automatically calculates the live exchange rate and credits our OPAY account with the exact equivalent in Nigerian Naira (NGN). Pro-tip: Apps like LemFi and Sendwave offer zero transfer fees and competitive exchange rates.'
    }
  ];

  return (
    <div className="bg-[#fcfaf7] min-h-screen text-stone-800 animate-in fade-in duration-200">
      {/* 1. Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-[57px] sm:top-[65px] md:top-[85px] lg:top-[98px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#c83264] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:-translate-x-1 group-hover:text-[#c83264] transition-all" />
            <span>Back to Store / Shop</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-400 hidden sm:inline">
              About Olateetee Luxe
            </span>
            <a
              href={createWhatsAppChatUrl('Hello! I would like to consult directly with the founder regarding your products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Consult Founder on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Hero Section: Official Mission & Brand Identity */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-rose-50/40 to-[#fcfaf7] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-amber-100/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Official Emblem Logo */}
          <div className="flex justify-center mb-6">
            <BrandLogo size="lg" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-[#8d5b1d] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Our Heritage, Products &amp; Unwavering Trust</span>
          </div>

          <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-tight max-w-3xl mx-auto mb-6">
            A Brand Built on Purity, Transparency &amp; Lasting Trust
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
            Welcome to <strong className="text-stone-900 font-semibold">Olateetee Luxe (Home of Fashion &amp; Cosmetics)</strong>.
            We are dedicated to revealing your natural radiance through safe, premium cosmetic formulations,
            backed by the personal reliability, integrity, and hands-on care of our founder.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-stone-500">
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-stone-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine &amp; Non-Toxic</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-stone-200 shadow-2xs">
              <Users className="w-4 h-4 text-[#c83264]" />
              <span>Direct Founder Consultation</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full border border-stone-200 shadow-2xs">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Punctual Doorstep Delivery</span>
            </div>
          </div>
        </div>

        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      </section>

      {/* 3. The Business Owner's Integrity & Reliability (Feature Spotlight) */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Founder's Commitment Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-tr from-[#2d1d13] via-[#3d2417] to-[#1e130c] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-400/60 bg-amber-900/50 flex items-center justify-center text-amber-300 font-serif text-xl font-bold">
                    OL
                  </div>
                  <div>
                    <h3 className="font-serif-luxury font-bold text-lg text-amber-200">The Business Owner</h3>
                    <p className="text-xs text-rose-200 font-sans">Founder &amp; Chief Beauty Formulator</p>
                  </div>
                </div>

                <div className="space-y-4 text-stone-200 text-sm leading-relaxed">
                  <p className="italic font-serif text-base text-amber-100/90 border-l-2 border-amber-400 pl-4 my-2">
                    &ldquo;My name and my reputation are stamped onto every single bottle and package that leaves our facility. I will never sell you what I wouldn&apos;t use on my own skin.&rdquo;
                  </p>
                  <p>
                    In an industry flooded with faceless dropshippers, counterfeit creams, and untraceable vendors, Olateetee Luxe is built on personal accountability.
                  </p>
                  <p>
                    Every customer is treated like family. You receive direct access to guidance, genuine recommendations tailored to your complexion, and a 100% guarantee of authentic quality.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-amber-500/20 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] text-amber-300/80 uppercase font-semibold">Direct WhatsApp</span>
                    <span className="font-mono text-sm text-white font-bold">{FORMATTED_WHATSAPP}</span>
                  </div>
                  <a
                    href={createWhatsAppChatUrl('Hello! I would like to chat directly with the business owner.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#c49a2a] hover:to-[#9e7104] text-stone-950 font-semibold text-xs rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Chat With Owner
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Pillars of Trust & Reliability */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#c83264]">
                  Trustworthiness &amp; Reliability
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-bold leading-snug">
                  Why Customers Trust Olateetee Luxe Again &amp; Again
                </h2>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Reliability is not just a marketing claim for us—it is our daily operating discipline.
                  Here is how our business owner ensures unmatched integrity:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {trustPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#fdfbf8] border border-stone-200/80 hover:border-amber-400/60 transition-all hover:shadow-xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center justify-center text-[#c83264] group-hover:scale-110 transition-transform mb-3.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-stone-900 text-sm mb-1.5">{pillar.title}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Founder Signature Callout */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
                    <Heart className="w-5 h-5 fill-amber-600 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Personal Satisfaction Guarantee</h4>
                    <p className="text-[11px] text-stone-600">
                      If your order arrives damaged, defective, or incorrect, we immediately replace it or issue a prompt refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Description of Our Products & Sourcing */}
      <section className="py-14 sm:py-20 bg-[#fbf9f5] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8d5b1d]">
              Our Product Excellence
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-bold mt-2 mb-4">
              Carefully Formulated for Health, Radiance &amp; Natural Beauty
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              At Olateetee Luxe, every single product line is curated with deep scientific understanding of diverse skin types and textures.
              We believe in lasting glow over temporary artificial fixes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLines.map((prod, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-[#c83264] border border-rose-200/60">
                      {prod.badge}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif-luxury font-bold text-lg text-stone-900 group-hover:text-[#c83264] transition-colors mb-1">
                    {prod.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700/90 mb-3">{prod.tagline}</p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">{prod.desc}</p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectCategory(prod.categoryKey);
                      onBackToShop();
                    }}
                    className="text-xs font-semibold text-[#c83264] hover:text-[#9e1c45] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Explore {prod.title}</span>
                    <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="In Stock & Authentic" />
                </div>
              </div>
            ))}

            {/* Quality Standard Card */}
            <div className="bg-gradient-to-br from-[#c83264] to-[#8d1d42] text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-yellow-300 mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury font-bold text-xl text-white mb-2">
                  The Clean Glow Promise
                </h3>
                <p className="text-xs text-rose-100 leading-relaxed mb-4">
                  Zero harsh bleaches. Zero mercury. Zero compromised barriers. We enhance your God-given beauty with deep, nourishing ingredients so your skin glows naturally with undeniable vitality.
                </p>
              </div>

              <button
                onClick={onBackToShop}
                className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-[#8d1d42] text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer text-center"
              >
                Shop All Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. A Personal Letter From the Founder */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#fdfbf7] rounded-3xl border-2 border-amber-200/70 p-8 sm:p-12 shadow-sm">
            <div className="absolute -top-5 left-10 px-4 py-1 bg-[#8d5b1d] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
              Letter From The Founder
            </div>

            <Quote className="w-10 h-10 text-amber-200 mb-4" />

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              <p className="font-semibold text-stone-900 text-base sm:text-lg">
                Dear Cherished Customer,
              </p>
              <p>
                When I founded <strong className="text-stone-900">Olateetee Luxe</strong>, my motivation was deeply personal.
                I saw countless women and men spending their hard-earned money on cosmetics that promised miracles overnight,
                only to discover harmful chemicals that damaged their skin barriers and left lasting damage.
              </p>
              <p>
                I knew there had to be a better way—a place where quality is never compromised, where every ingredient is explained honestly,
                and where customer satisfaction is held above quick profit. That is why our slogan has always been:
              </p>
              <div className="py-2 text-center">
                <span className="font-script text-2xl sm:text-3xl text-[#c83264] font-bold block">
                  Grow Naturally, Glow Confidently ❤️
                </span>
              </div>
              <p>
                Whether you are ordering your very first facial cleanser or restocking your favorite shimmer body oil, I want you to know
                that your trust is the foundation of our business. If you ever have a question about how to use a product or need advice,
                my WhatsApp is always open to you.
              </p>
              <p>
                Thank you for welcoming Olateetee Luxe into your daily self-care journey.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-serif-luxury font-bold text-lg text-[#8d5b1d] block">
                  Olateetee Luxe Management
                </span>
                <span className="text-xs text-stone-500">
                  Home of Fashion &amp; Cosmetics
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  Direct Line: {FORMATTED_WHATSAPP}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials & Verified Stories */}
      <section className="py-14 sm:py-20 bg-[#fbf9f5] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c83264]">
              Real Client Experiences
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-bold mt-1 mb-3">
              Stories of Integrity, Reliability &amp; Transformation
            </h2>
            <p className="text-sm text-stone-600">
              Read how our personal touch and trustworthy formulations have made a difference for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(testi.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed mb-6">
                    &ldquo;{testi.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-bold text-stone-900 text-sm">{testi.name}</h4>
                  <span className="text-[11px] text-emerald-600 font-medium">{testi.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 Payment Transparency, Multi-Currency & Delivery Assurance */}
      <section className="py-14 sm:py-20 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Honest Transactions &bull; Global Inclusivity
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold mt-1 mb-3">
              Payment Clarity &amp; Delivery Assurance Policy
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              We welcome our valued clients to pay in any currency of their choice. All payment methods,
              including bank transfers and mobile transfers, are fully accommodated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 bg-stone-800/80 rounded-2xl border border-stone-700/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Why Payment Confirmation Precedes Delivery Assurance</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  In accordance with the business owner's strict transparency standards:{' '}
                  <strong className="text-white">Payment should be confirmed before assuring customers of delivery.</strong>
                </p>
                <p className="text-xs text-stone-400 leading-relaxed">
                  This guarantees that genuine customers have their items allocated, freshly compounded or packaged,
                  and dispatched without fraudulent interference or route confusion. Once verified, your delivery slot is locked in.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700">
                  <Globe className="w-4 h-4 text-emerald-400 mb-1.5" />
                  <span className="font-bold text-white block">Any Currency Accepted</span>
                  <span className="text-stone-400 text-[11px]">USD, EUR, GBP, NGN, LYD, CAD, GHS, KES, ZAR, etc.</span>
                </div>
                <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700">
                  <CreditCard className="w-4 h-4 text-rose-400 mb-1.5" />
                  <span className="font-bold text-white block">All Payment Methods</span>
                  <span className="text-stone-400 text-[11px]">OPAY Transfers, Cards, Mobile Wallets, LemFi, Sendwave</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <BankDetailsCard />
              {onOpenInternationalGuide && (
                <button
                  type="button"
                  onClick={onOpenInternationalGuide}
                  className="w-full py-2.5 px-4 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>How to Pay from UK, USA &amp; Diaspora (Wise, Remitly, LemFi Guide)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions Regarding Authenticity & Owner Care */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8d5b1d]">
              Transparency in Detail
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-bold mt-1 mb-3">
              Frequently Asked Questions About Our Business
            </h2>
            <p className="text-sm text-stone-600">
              Honest answers to the questions most important to our customers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#fdfbf8] border border-stone-200 p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#c83264] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    Q
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-stone-900 text-sm sm:text-base">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive International Remittance & Conversion Trigger Banner */}
          {onOpenInternationalGuide && (
            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-900 via-[#133023] to-[#0a1c14] rounded-3xl text-white shadow-xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Live Calculator &amp; App Step-by-Step Guides
                  </span>
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-white">
                  Paying from the UK, USA, Canada, or Abroad?
                </h3>
                <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                  Open our interactive guide to view exact steps for Remitly, Wise, LemFi, Sendwave, and Western Union, plus live currency conversion estimates directly into our OPAY account.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenInternationalGuide}
                className="px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-stone-950" />
                <span>Open International Payment Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 8. Bottom Action Banner: Ready to Glow? */}
      <section className="py-14 sm:py-20 bg-gradient-to-tr from-[#1e140d] via-[#331c10] to-[#140c07] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Your Natural Glow Today</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-4">
            Experience the Olateetee Luxe Difference
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Authentic skincare, radiant beauty essentials, and the personalized, trustworthy service you deserve.
            Reach out directly or explore our bestsellers now.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onBackToShop}
              className="px-6 py-3.5 rounded-full bg-[#c83264] hover:bg-[#b02553] text-white font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-rose-900/40 cursor-pointer flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Our Products</span>
            </button>

            <a
              href={createWhatsAppChatUrl('Hello! I would like to consult with the owner regarding my skincare needs.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-900/40 cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
