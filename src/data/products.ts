import { CategoryItem, Product } from '../types';

export const WHATSAPP_NUMBER = '+218913097994';
export const FORMATTED_WHATSAPP = '+21891-3097994';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'skincare',
    name: 'Skincare',
    image: '/category-skincare.jpg',
    itemCount: 24,
    description: 'Nourishing cleansers, serums, and hydrating face creams crafted to reveal radiant skin.'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    image: '/category-makeup.jpg',
    itemCount: 18,
    description: 'Velvet lip colors, glowing palettes, and professional beauty essentials.'
  },
  {
    id: 'body-care',
    name: 'Body Care',
    image: '/category-body-care.jpg',
    itemCount: 16,
    description: 'Silky body oils, deeply moisturizing butters, and gentle exfoliating polishes.'
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    image: '/category-hair-care.jpg',
    itemCount: 12,
    description: 'Nutrient-infused hair elixirs, organic growth treatments, and shine serums.'
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    image: '/category-fragrance.jpg',
    itemCount: 14,
    description: 'Exquisite perfumes and artisanal floral mists that leave a lasting signature scent.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'ol-01',
    name: 'Olatetee Luxe Flawless Glow Face Cream',
    category: 'Skincare',
    subcategory: 'Face Creams',
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.9,
    reviewsCount: 142,
    image: '/luxe-glow-face-cream.jpg',
    secondaryImages: [
      '/category-skincare.jpg',
      '/category-body-care.jpg'
    ],
    description: 'Our signature hydrating and radiance-enhancing face cream. Infused with natural botanical extracts, rosehip oil, and niacinamide to even skin tone, fade blemishes, and restore youthful elasticity.',
    benefits: ['Brightens & evens skin complexion', 'Deep 24-hour hydration without greasy feel', 'Fights visible fine lines and dullness'],
    ingredients: 'Deionized Water, Organic Rosehip Seed Oil, Niacinamide, Hyaluronic Acid, Shea Butter, Vitamin E, Licorice Root Extract.',
    volume: '250g',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-02',
    name: 'Luxe Radiance Gentle Cleanser & Toner',
    category: 'Skincare',
    subcategory: 'Cleansers',
    price: 26.00,
    originalPrice: 32.00,
    rating: 4.8,
    reviewsCount: 98,
    image: '/luxe-radiance-cleanser.jpg',
    secondaryImages: [
      '/category-skincare.jpg'
    ],
    description: 'A soothing, sulfate-free foaming cleanser that purifies pores while preserving vital moisture. Gently removes makeup and environmental impurities leaving skin feeling refreshed, silky, and balanced.',
    benefits: ['Sulfate-free pH balanced formula', 'Pore-refining botanical calming extracts', 'Non-drying gentle cleanse'],
    ingredients: 'Aloe Vera Leaf Juice, Rose Floral Hydrosol, Chamomile Extract, Glycerin, Green Tea Extract.',
    volume: '100ml',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-03',
    name: 'Golden Glow Botanical Body Oil',
    category: 'Body Care',
    subcategory: 'Body Oils',
    price: 34.00,
    originalPrice: 42.00,
    rating: 5.0,
    reviewsCount: 215,
    image: '/golden-glow-body-oil.jpg',
    secondaryImages: [
      '/category-body-care.jpg'
    ],
    description: 'An indulgent shimmering body oil crafted with golden jojoba, sweet almond, and vitamin E. Absorbs quickly into skin providing a luminous, sun-kissed sheen with a delicate hint of warm vanilla orchid.',
    benefits: ['Instant luminous sun-kissed glow', 'Deeply softens dry skin', 'Lightweight non-sticky absorption'],
    ingredients: 'Simmondsia Chinensis (Jojoba) Oil, Sweet Almond Oil, Argan Oil, Mica Pearl Gold Powder, Vanilla Extract.',
    volume: '250ml',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-04',
    name: 'Rejuvenating Vitamin C & Gold Serum',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.9,
    reviewsCount: 167,
    image: '/eqqualberry-vitamin-serum.jpg',
    secondaryImages: [
      '/category-skincare.jpg'
    ],
    description: 'A concentrated brightening serum packed with 20% stabilized Vitamin C, botanical hyaluronic acid, and pure 24K gold micro-flakes for ultimate collagen boosting and dark spot correction.',
    benefits: ['Targeted dark spot fading', 'Firms and plumps facial contours', 'Promotes collagen synthesis'],
    ingredients: 'Pure 24K Gold Flakes, Ascorbic Acid (Vitamin C), Ferulic Acid, Hyaluronic Acid, Centella Asiatica.',
    volume: '30ml',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-05',
    name: 'Velvet Matte Hydrating Lip Elixir',
    category: 'Makeup',
    subcategory: 'Lipsticks',
    price: 19.50,
    originalPrice: 24.00,
    rating: 4.8,
    reviewsCount: 84,
    image: '/category-makeup.jpg',
    secondaryImages: [
      '/sunset-glow-palette.jpg'
    ],
    description: 'Long-lasting velvety pigment that glides effortlessly onto lips. Enriched with hyaluronic spheres and murumuru butter so your lips stay soft, plump, and smudge-resistant all day long.',
    benefits: ['Up to 12-hour comfortable wear', 'Cushiony feather-light texture', 'Rich high-impact color payoff'],
    ingredients: 'Murumuru Seed Butter, Jojoba Esters, Castor Seed Oil, Vitamin E, Mineral Pigments.',
    volume: '5ml',
    badge: 'New',
    inStock: true
  },
  {
    id: 'ol-06',
    name: 'Sunset Glow Illuminating Palette',
    category: 'Makeup',
    subcategory: 'Palettes',
    price: 36.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewsCount: 112,
    image: '/sunset-glow-palette.jpg',
    secondaryImages: [
      '/category-makeup.jpg'
    ],
    description: 'An all-in-one blush, bronzer, and highlighter quad featuring ultra-finely milled powders that blend seamlessly into every skin undertone for an ethereal, natural glow.',
    benefits: ['Micro-milled silky powder texture', 'Buildable intensity from subtle to dramatic', 'Infused with skin-loving vitamins'],
    ingredients: 'Talc-Free Mica, Squalane, Silica, Caprylic/Capric Triglyceride, Vitamin E.',
    volume: '18g',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-07',
    name: 'Royal Oud & Amber Rose Parfum',
    category: 'Fragrance',
    subcategory: 'Perfumes',
    price: 68.00,
    originalPrice: 85.00,
    rating: 5.0,
    reviewsCount: 78,
    image: '/royal-oud-perfume.jpg',
    secondaryImages: [
      '/category-fragrance.jpg'
    ],
    description: 'An intoxicating oriental floral composition opening with damask rose and pink peppercorn, settling into rich agarwood (oud), warm Madagascar amber, and decadent creamy vanilla.',
    benefits: ['High concentration Eau de Parfum (over 18 hours sillage)', 'Artisanal glass bottle with gold accents', 'Unisex luxury signature profile'],
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Benzoate, Linalool, Damascena Rose Absolute.',
    volume: '100ml',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-08',
    name: 'Nourishing Argan & Rosemary Hair Elixir',
    category: 'Hair Care',
    subcategory: 'Hair Oils',
    price: 29.00,
    originalPrice: 38.00,
    rating: 4.8,
    reviewsCount: 94,
    image: '/argan-hair-elixir.jpg',
    secondaryImages: [
      '/category-hair-care.jpg'
    ],
    description: 'A revitalizing scalp and hair oil blend of cold-pressed Moroccan argan oil, rosemary essential oil, and biotin to stimulate hair follicles, reduce breakage, and impart mirror-like shine.',
    benefits: ['Stimulates scalp for fuller growth', 'Tames frizz and repairs split ends', 'Protects against styling heat damage'],
    ingredients: 'Argania Spinosa Kernel Oil, Rosmarinus Officinalis Leaf Oil, Castor Oil, Biotin, Vitamin E.',
    volume: '100ml',
    badge: 'New',
    inStock: true
  },
  {
    id: 'ol-09',
    name: 'CeraVe Hydrating Facial Cleanser (for normal to dry skin)',
    category: 'Skincare',
    subcategory: 'Cleansers',
    price: 11.29032258,
    originalPrice: 14.193548387,
    rating: 4.9,
    reviewsCount: 238,
    image: '/cerave-hydrating-cleanser.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Developed with dermatologists, CeraVe Hydrating Facial Cleanser is a unique formula that cleanses, hydrates and helps restore the protective skin barrier with 3 essential ceramides (1, 3, 6-II). Formulated with hyaluronic acid to retain skin natural moisture without clogging pores or feeling greasy. Non-comedogenic, fragrance-free, and accepted by the National Eczema Association.',
    benefits: [
      'Cleanses, hydrates & helps restore the protective skin barrier',
      'Formulated with 3 essential ceramides (1, 3, 6-II) & hyaluronic acid',
      'MVE delivery technology for sustained 24-hour hydration',
      'Fragrance-free, non-comedogenic & accepted by National Eczema Association'
    ],
    ingredients: 'Aqua / Water / Eau, Glycerin, Cetearyl Alcohol, Peg-40 Stearate, Stearyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Glyceryl Stearate, Behentrimonium Methosulfate, Sodium Lauroyl Lactylate, Sodium Hyaluronate, Cholesterol, Phenoxyethanol, Disodium Edta, Dipotassium Phosphate, Tocopherol, Phytosphingosine, Xanthan Gum, Cetyl Alcohol, Polysorbate 20, Ethylhexylglycerin.',
    volume: '8 FL OZ (237 ml)',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-10',
    name: 'CeraVe Foaming Facial Cleanser (for normal to oily skin)',
    category: 'Skincare',
    subcategory: 'Cleansers',
    price: 11.29032258,
    originalPrice: 14.193548387,
    rating: 4.9,
    reviewsCount: 312,
    image: '/cerave-foaming-cleanser.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Developed with dermatologists, CeraVe Foaming Facial Cleanser is formulated with 3 essential ceramides, niacinamide, and hyaluronic acid to cleanse, remove excess oil, and refresh normal to oily skin without over-stripping or disrupting the protective skin barrier. The foaming gel deeply cleanses pores while calming skin. Non-comedogenic, non-drying, and fragrance-free.',
    benefits: [
      'Cleanses & removes excess oil without disrupting protective skin barrier',
      'Formulated with 3 essential ceramides, niacinamide & hyaluronic acid',
      'Gentle foaming gel formula calms and refreshes normal to oily skin',
      'Non-comedogenic, non-drying, and fragrance-free'
    ],
    ingredients: 'Aqua / Water / Eau, Cocamidopropyl Hydroxysultaine, Glycerin, Sodium Lauroyl Sarcosinate, Peg-150 Pentaerythrityl Tetrastearate, Niacinamide, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Sodium Methyl Cocoyl Taurate, Sodium Hyaluronate, Cholesterol, Phenoxyethanol, Disodium Edta, Citric Acid, Tetrasodium Edta, Phytosphingosine, Xanthan Gum, Ethylhexylglycerin.',
    volume: '16 FL OZ (473 ml)',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-11',
    name: 'CeraVe Hydrating Cream to Foam Cleanser (for normal to dry skin) makeup removal',
    category: 'Skincare',
    subcategory: 'Cleansers',
    price: 11.29032258,
    originalPrice: 14.193548387,
    rating: 4.9,
    reviewsCount: 189,
    image: '/cerave-cream-to-foam-cleanser.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Developed with dermatologists, CeraVe Hydrating Cream-to-Foam Cleanser begins as a rich cream before transforming to a soft foam when lathered with water. It effectively removes dirt, excess oil, and long-wear makeup without stripping the skin of natural moisture. Formulated with 3 essential ceramides, amino acids, and hyaluronic acid to maintain the protective skin barrier. Fragrance-free, non-comedogenic, and pH balanced.',
    benefits: [
      'Cleanses, hydrates & removes long-wear facial and eye makeup',
      'Transforms from a rich cream to a gentle foaming lather',
      'Formulated with 3 essential ceramides, amino acids & hyaluronic acid',
      'Non-comedogenic, fragrance-free, soap-free & ophthalmologist tested'
    ],
    ingredients: 'Aqua / Water / Eau, Glycerin, Sodium Methyl Cocoyl Taurate, Coco-Betaine, Sodium Cocoyl Isethionate, Sodium Chloride, Ppg-5-Ceteth-20, Peg-100 Stearate, Peg-150 Pentaerythrityl Tetrastearate, Peg-6 Caprylic/Capric Glycerides, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Triethyl Citrate, Sodium Hyaluronate, Sodium Lauroyl Lactylate, Cholesterol, Phenoxyethanol, Disodium Edta, Citric Acid, Capryloyl Glycine, Caprylyl Glycol, Phytosphingosine, Xanthan Gum, Benzoic Acid.',
    volume: '16 FL OZ (473 ml)',
    badge: 'New',
    inStock: true
  },
  {
    id: 'ol-12',
    name: 'CeraVe SA Smoothing Cleanser (for dry, rough & bumpy skin)',
    category: 'Skincare',
    subcategory: 'Cleansers',
    price: 11.29032258,
    originalPrice: 14.193548387,
    rating: 4.9,
    reviewsCount: 265,
    image: '/cerave-sa-smoothing-cleanser.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Developed with dermatologists, CeraVe SA Smoothing Cleanser gently cleanses and exfoliates dry, rough, and bumpy skin without compromising the protective skin barrier. Formulated with salicylic acid to gently smooth skin texture, plus 3 essential ceramides and hyaluronic acid to hydrate and replenish. Fragrance-free, non-comedogenic, and gentle on sensitive skin.',
    benefits: [
      'Gently cleanses while exfoliating rough, bumpy skin texture',
      'Salicylic acid smooths and softens without physical abrasive microbeads',
      '3 essential ceramides & hyaluronic acid restore and lock in hydration',
      'Fragrance-free, non-comedogenic & non-irritating formula'
    ],
    ingredients: 'Aqua / Water / Eau, Sodium Lauroyl Sarcosinate, Cocamidopropyl Hydroxysultaine, Glycerin, Niacinamide, Gluconolactone, Sodium Methyl Cocoyl Taurate, Peg-150 Pentaerythrityl Tetrastearate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Calcium Gluconate, Salicylic Acid, Sodium Benzoate, Sodium Lauroyl Lactylate, Cholesterol, Phenoxyethanol, Disodium Edta, Tetrasodium Edta, Hydrolyzed Hyaluronic Acid, Phytosphingosine, Xanthan Gum, Ethylhexylglycerin.',
    volume: '8 FL OZ (236 ml)',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-13',
    name: 'CeraVe Hydrating body wash (for normal to dry skin) makeup removal',
    category: 'Body Care',
    subcategory: 'Body Wash',
    price: 9.3548387,
    originalPrice: 11.93548387,
    rating: 4.8,
    reviewsCount: 174,
    image: '/cerave-hydrating-body-wash.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1608248597359-074415843468?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Developed with dermatologists, CeraVe Hydrating Body Wash cleanses and moisturizes skin with a gentle, foaming formula. Formulated with 3 essential ceramides and hyaluronic acid to help restore and maintain the protective skin barrier. Soap-free, sulfate-free, and accepted by the National Eczema Association, making it gentle enough for sensitive, normal to dry skin.',
    benefits: [
      'Cleanses and moisturizes skin without disrupting the moisture barrier',
      'Formulated with 3 essential ceramides (1, 3, 6-II) & hyaluronic acid',
      'Soap-free, sulfate-free gentle foaming formula',
      'Accepted by the National Eczema Association'
    ],
    ingredients: 'Aqua / Water / Eau, Cocamidopropyl Betaine, Sodium Methyl Cocoyl Taurate, Sodium Cocoyl Isethionate, Glycerin, Peg-150 Pentaerythrityl Tetrastearate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Sodium Hyaluronate, Sodium Lauroyl Lactylate, Cholesterol, Phenoxyethanol, Disodium Edta, Citric Acid, Phytosphingosine, Xanthan Gum, Ethylhexylglycerin.',
    volume: '10 FL OZ (296 ml)',
    badge: 'New',
    inStock: true
  },
  {
    id: 'ol-14',
    name: 'The Ordinary Alpha Arbutin 2% + HA',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 7.4193548387,
    originalPrice: 9.67741935,
    rating: 4.9,
    reviewsCount: 420,
    image: '/the-ordinary-alpha-arbutin.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1608248597359-074415843468?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'The Ordinary Alpha Arbutin 2% + HA is a concentrated, water-based serum formulated with a high 2% concentration of purified alpha arbutin and next-generation hyaluronic acid. Designed to target uneven skin tone and visibly diminish the appearance of dark spots, hyperpigmentation, and blemishes, promoting a clearer, more luminous and balanced complexion.',
    benefits: [
      'Visibly fades dark spots, hyperpigmentation & post-blemish marks',
      'High 2% concentration of purified Alpha Arbutin for even skin tone',
      'Next-generation Hyaluronic Acid matrix for enhanced delivery and hydration',
      'Vegan, cruelty-free, silicone-free & alcohol-free formulation'
    ],
    ingredients: 'Aqua (Water), Alpha-Arbutin, Polyacrylate Crosspolymer-6, Hydrolyzed Sodium Hyaluronate, Propanediol, PPG-26-Buteth-26, PEG-40 Hydrogenated Castor Oil, Lactic Acid, Trisodium Ethylenediamine Disuccinate, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.',
    volume: '30ml (1 fl oz)',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-15',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 7.4193548387,
    originalPrice: 9.67741935,
    rating: 4.9,
    reviewsCount: 580,
    image: '/the-ordinary-niacinamide.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1608248597359-074415843468?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'The Ordinary Niacinamide 10% + Zinc 1% is a high-strength vitamin and mineral blemish formula designed to reduce the appearance of skin blemishes, congestion, and visible shine. Niacinamide (Vitamin B3) balances sebum activity and strengthens the skin barrier, while Zinc PCA works to decongest pores and support clearer, smoother skin.',
    benefits: [
      'Reduces appearance of skin blemishes, redness & congestion',
      'Balances visible sebum activity and minimizes enlarged pores',
      'Strengthens skin barrier for a smoother, clearer texture',
      'Oil-free, silicone-free, vegan & cruelty-free formula'
    ],
    ingredients: 'Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.',
    volume: '30ml (1 fl oz)',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-16',
    name: 'The Ordinary Hyaluronic Acid 2% + B5',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 7.4193548387,
    originalPrice: 9.67741935,
    rating: 4.9,
    reviewsCount: 640,
    image: '/the-ordinary-hyaluronic-acid.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'The Ordinary Hyaluronic Acid 2% + B5 provides instant hydration support with a combination of low, medium, and high molecular weight hyaluronic acid, alongside an advanced HA crosspolymer at a combined concentration of 2%. Supported with Vitamin B5 (Panthenol) to enhance multi-depth hydration and skin suppleness for plump, youthful-looking skin.',
    benefits: [
      'Multi-depth hydration support with 3 molecular forms of Hyaluronic Acid',
      'Infused with Provitamin B5 to enhance surface and deeper skin hydration',
      'Smoothes, plumps, and restores essential skin barrier moisture',
      'Oil-free, alcohol-free, gluten-free, vegan & cruelty-free'
    ],
    ingredients: 'Aqua (Water), Sodium Hyaluronate, Pentylene Glycol, Propanediol, Sodium Hyaluronate Crosspolymer, Panthenol, Ahnfeltia Concinna Extract, Glycerin, Trisodium Ethylenediamine Disuccinate, Citric Acid, Isoceteth-20, Ethoxydiglycol, Ethylhexylglycerin, Hexylene Glycol, 1,2-Hexanediol, Phenoxyethanol, Caprylyl Glycol.',
    volume: '30ml (1 fl oz)',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-17',
    name: 'The Ordinary Glycolic Acid 7% Exfoliating Toner',
    category: 'Skincare',
    subcategory: 'Toners',
    price: 9.3548387,
    originalPrice: 11.93548387,
    rating: 4.9,
    reviewsCount: 490,
    image: '/the-ordinary-glycolic-acid.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'The Ordinary Glycolic Acid 7% Exfoliating Toner is a daily alpha hydroxy acid (AHA) toner formulated to gently exfoliate the skin surface, significantly improve skin texture and clarity, and boost radiance over time. Enriched with Tasmanian pepperberry, ginseng root, and aloe vera to visibly soothe and reduce irritation associated with acid use.',
    benefits: [
      '7% Glycolic Acid gently dissolves dead surface cells for glowing skin',
      'Improves visible skin texture, clarity, and boosts luminosity',
      'Formulated with botanical Tasmanian Pepperberry & Aloe Vera to soothe',
      'Alcohol-free, oil-free, silicone-free & vegan formulation'
    ],
    ingredients: 'Aqua (Water), Glycolic Acid, Rosa damascena flower water, Centaurea cyanus flower water, Aloe Barbadensis Leaf Water, Propanediol, Glycerin, Triethanolamine, Aminomethyl Propanol, Panax Ginseng Root Extract, Tasmannia Lanceolata Fruit/Leaf Extract, Aspartic Acid, Alanine, Glycine, Serine, Valine, Isoleucine, Proline, Threonine, Histidine, Phenylalanine, Glutamic Acid, Arginine, PCA, Sodium PCA, Sodium Lactate, Fructose, Glucose, Sucrose, Urea, Hexyl Nicotinate, Dextrin, Citric Acid, Polysorbate 20, Gellan Gum, Trisodium Ethylenediamine Disuccinate, Sodium Chloride, Potassium Sorbate, Sodium Benzoate, Phenoxyethanol, Chlorphenesin.',
    volume: '240ml (8 fl oz)',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-18',
    name: 'The Ordinary Salicylic Acid 2% Solution',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 7.4193548387,
    originalPrice: 9.67741935,
    rating: 4.8,
    reviewsCount: 380,
    image: '/the-ordinary-salicylic-acid.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'The Ordinary Salicylic Acid 2% Solution is a water-based serum formulated specifically for blemish-prone skin. Containing a targeted 2% concentration of salicylic acid (BHA), it exfoliates inside pore walls to combat congestion, unclog dead skin cells, and promote visible skin clarity and smoothness.',
    benefits: [
      'Targeted 2% Beta Hydroxy Acid (BHA) penetrates deep into pores',
      'Unclogs congestion and clarifies blemish-prone skin',
      'Smooths rough texture and minimizes visible pore appearance',
      'Lightweight, fast-absorbing water-based serum'
    ],
    ingredients: 'Aqua (Water), Saccharide Isomerate, Cocamidopropyl Dimethylamine, Salicylic Acid, Hydroxyethylcellulose, Polysorbate 20, Citric Acid, Sodium Citrate, Sodium Hydroxide, Phenoxyethanol, Chlorphenesin.',
    volume: '30ml (1 fl oz)',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-19',
    name: 'The Ordinary AHA 30% + BHA 2% Peeling Solution',
    category: 'Skincare',
    subcategory: 'Exfoliators',
    price: 7.4193548387,
    originalPrice: 9.67741935,
    rating: 4.9,
    reviewsCount: 890,
    image: '/the-ordinary-aha-bha-peeling.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'The Ordinary AHA 30% + BHA 2% Peeling Solution is an intensive 10-minute exfoliating facial that combines 30% Alpha Hydroxy Acids (Glycolic/Lactic/Tartaric/Citric) and 2% Beta Hydroxy Acid (Salicylic Acid). This cult-favorite crimson peeling solution deeply exfoliates the top layer of skin while clearing pore congestion, fighting visible blemishes, and dramatically improving radiance and texture.',
    benefits: [
      'Potent 30% AHA blend exfoliates the skin surface for radiant tone',
      '2% BHA clears pore congestion and unclogs impurities',
      'Features Tasmanian Pepperberry to reduce irritation associated with acid use',
      'Enriched with black carrot antioxidant and hydrating Hyaluronic Acid'
    ],
    ingredients: 'Glycolic Acid, Aqua (Water), Aloe Barbadensis Leaf Water, Sodium Hydroxide, Daucus Carota Sativa Extract, Propanediol, Cocamidopropyl Dimethylamine, Salicylic Acid, Potassium Citrate, Lactic Acid, Tartaric Acid, Citric Acid, Panthenol, Sodium Hyaluronate Crosspolymer, Tasmannia Lanceolata Fruit/Leaf Extract, Glycerin, Pentylene Glycol, Xanthan gum, Polysorbate 20, Trisodium Ethylenediamine Disuccinate, Potassium Sorbate, Sodium Benzoate, Ethylhexylglycerin, 1,2-Hexanediol, Caprylyl Glycol.',
    volume: '30ml (1 fl oz)',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-20',
    name: 'Eqqual berry bakuchiol plumping serum',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 11.93548387,
    originalPrice: 14.83870968,
    rating: 4.9,
    reviewsCount: 148,
    image: '/eqqualberry-bakuchiol-serum.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'EQQUAL BERRY Deep Cera Bakuchiol Plumping Serum is a gentle yet potent age-defying Korean serum formulated with plant-based Bakuchiol, rejuvenating Peptides, Collagen, and Ceramides. Designed to firm, visibly plump fine lines, and boost skin elasticity without the irritation often caused by traditional retinol. The sparkling purple gel texture delivers deep hydration and skin-smoothing nourishment.',
    benefits: [
      'Plant-based Bakuchiol visibly plumps and firms without sensitivity',
      'Infused with Peptides and Collagen for enhanced skin bounce and elasticity',
      'Ceramide barrier support restores deep hydration and prevents moisture loss',
      'Gentle for both day and night use, suitable for all skin types'
    ],
    ingredients: 'Vaccinium Angustifolium (Blueberry) Fruit Extract, Aqua, Glycerin, Butylene Glycol, Bakuchiol (10,000ppm), Soluble Collagen, Copper Tripeptide-1, Acetyl Hexapeptide-8, Ceramide NP, Ceramide AP, Ceramide EOP, Sodium Hyaluronate, Allantoin, Betaine, Carbomer, Arginine, 1,2-Hexanediol, Ethylhexylglycerin.',
    volume: '30ml / 1.01 FL. OZ.',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-21',
    name: 'Eqqual berry vitamin illuminating serum',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 12.2580645,
    originalPrice: 15.48387097,
    rating: 4.9,
    reviewsCount: 162,
    image: '/eqqualberry-vitamin-serum.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1608248597359-074415843468?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'EQQUAL BERRY Deep Cera Vitamin Illuminating Serum is a brightening booster formulated with high-potency Acerola extract, Niacinamide, Tranexamic Acid, and Ceramides. Filled with suspended vitamin micro-capsules, it targets stubborn hyperpigmentation, dark spots, and dullness to reveal a lit-from-within glow and deeply hydrated skin barrier.',
    benefits: [
      'Acerola fruit extract delivers high concentrations of natural Vitamin C',
      'Niacinamide & Tranexamic Acid fade stubborn dark spots and pigmentation',
      'Encapsulated vitamin beads burst upon application for maximum freshness',
      'Ceramides nourish and protect against moisture loss'
    ],
    ingredients: 'Malpighia Glabra (Acerola) Fruit Extract, Aqua, Niacinamide (5%), Tranexamic Acid (3%), Glycerin, Propanediol, Ceramide NP, Ascorbyl Tetraisopalmitate, Sodium Hyaluronate, Panthenol, Glutathione, Tocopherol, Hippophae Rhamnoides Fruit Extract, Polyglyceryl-10 Laurate, Carbomer, Tromethamine, 1,2-Hexanediol, Ethylhexylglycerin.',
    volume: '30ml / 1.01 FL. OZ.',
    badge: 'New',
    inStock: true
  },
  {
    id: 'ol-22',
    name: 'Celimax retinal shot tightening booster',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 9.3548387,
    originalPrice: 11.93548387,
    rating: 4.9,
    reviewsCount: 215,
    image: '/celimax-retinal-shot.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Celimax Retinal Shot Tightening Booster is an advanced firming treatment packed with 0.1% Retinal, 3% MATRIXYL® 3000 peptides, 1% Panthenol, and 20,250 A-Shot micro-delivery technology. Designed to visibly tighten loose pores, smooth skin texture, and promote youthful elasticity with high retinal bio-availability in a non-greasy precision formula.',
    benefits: [
      '0.1% Retinal works up to 11x faster than standard retinol for visible firmness',
      '3% MATRIXYL® 3000 peptide complex boosts collagen synthesis and skin elasticity',
      '20,250 A-Shot micro-spicules optimize active ingredient absorption',
      '1% Panthenol soothes and prevents irritation on sensitive skin'
    ],
    ingredients: 'Aqua, Glycerin, Caprylic/Capric Triglyceride, Butylene Glycol, Panthenol (1%), Retinal (0.1%), Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Hydrolyzed Sponge, Adenosine, Niacinamide, Macadamia Ternifolia Seed Oil, Hydrogenated Lecithin, Carbomer, Polysorbate 20, Sodium Hyaluronate, 1,2-Hexanediol, Ethylhexylglycerin.',
    volume: '15ml / 0.50 fl. oz.',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-23',
    name: 'Beginner Oily Skin Routine',
    category: 'Skincare',
    subcategory: 'Routine Sets',
    price: 52.9032258,
    originalPrice: 54.83870967,
    rating: 5.0,
    reviewsCount: 94,
    image: '/anua-beginner-oily-skin-routine.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'A simple, beginner-friendly skincare package created for oily and blemish-prone skin. This set brings together carefully selected products to help cleanse, hydrate, soothe the skin, and target common concerns such as excess oil, clogged pores, uneven texture, and dark marks.\n\nWhat’s included:\n• Anua Heartleaf Pore Control Cleanser (200ml)\n• Anua Heartleaf BHA Pore Deep Cleansing Foam (150ml)\n• Anua Rice 70% + Ceramide Glow Milky Toner (250ml)\n• Anua Azelaic Acid + Niacinamide Redness Soothing Serum (30ml)\n• Anua Niacinamide + TXA Dark Spot Correcting Serum (30ml)\n\nPerfect for: Beginners with oily or blemish-prone skin who want a simple, well-organized skincare routine.',
    benefits: [
      'Complete 5-step daily routine curated for oily and blemish-prone skin',
      'Double cleansing duo clears waterproof makeup, sebum & deep pore debris',
      'Hydrating milky toner balances skin barrier without heavy or sticky feel',
      'Targeted serums calm redness, prevent breakouts & fade dark spots'
    ],
    ingredients: 'Curated 5-Piece Package: 1) Anua Heartleaf Pore Control Cleansing Oil (Heartleaf Extract, Jojoba Seed Oil, Olive Fruit Oil), 2) Anua Heartleaf Quercetinol Pore Deep Cleansing Foam (Quercetinol, Salicylic Acid, Houttuynia Cordata), 3) Anua Rice 70 Glow Milky Toner (Rice Bran Water 70%, Ceramide NP, Panthenol), 4) Anua Azelaic Acid 10 + Hyaluron Redness Soothing Serum (Azelaic Acid 10%, Hyaluronic Acid, Centella Asiatica), 5) Anua Niacinamide 10 + TXA 4 Serum (Niacinamide 10%, Tranexamic Acid 4%, Arbutin).',
    volume: '5-Piece Complete Routine Set',
    badge: 'Sale',
    inStock: true
  },
  {
    id: 'ol-24',
    name: 'For My Dry-Skin Girlies Routine Package',
    category: 'Skincare',
    subcategory: 'Routine Sets',
    price: 48.38709677,
    originalPrice: 51.61290322,
    rating: 5.0,
    reviewsCount: 112,
    image: '/dry-skin-girlie-routine.jpg',
    secondaryImages: [
      '/pack-order-with-me-dry-skin.jpg',
      '/cerave-cream-to-foam-cleanser.jpg',
      '/the-ordinary-hyaluronic-acid.jpg',
      '/eqqualberry-vitamin-serum.jpg',
      '/celimax-retinal-shot.jpg'
    ],
    description: 'For my dry-skin girlies 🤍✨\n\nIf you’re just starting your skincare journey and your skin feels dry, dull, or needs a proper beginner routine, this package is specially put together for you.\n\nInside the package, we have:\n🧴 CeraVe Hydrating Facial Cleanser — gentle cleansing for dry skin\n💧 The Ordinary Hyaluronic Acid Serum — helps give the skin hydration\n✨ Eqqual Berry vitamin illuminating serum — for a brighter, healthier-looking glow\n🌙 Celimax Retinal/Retinol Shot — for a nighttime routine and skin renewal\n☀️ La Roche-Posay Sunscreen — daily sun protection\n\nSo instead of buying random products and wondering what to use, we put together a beginner-friendly routine for dry skin.\n\nPackage price -\n₦80,000 ❌\n₦75,000',
    benefits: [
      '🧴 CeraVe Hydrating Facial Cleanser — gentle cleansing for dry skin',
      '💧 The Ordinary Hyaluronic Acid Serum — intense multi-depth hydration for supple skin',
      '✨ Eqqual Berry Vitamin Illuminating Serum — for a brighter, lit-from-within glow',
      '🌙 Celimax Retinal Shot — nighttime cell turnover, pore tightening & skin renewal',
      '☀️ La Roche-Posay Sunscreen — broad-spectrum daily SPF protection against dark spots'
    ],
    ingredients: 'Complete 5-Piece Curated Set: 1) CeraVe Hydrating Facial Cleanser (Ceramides 1, 3, 6-II, Hyaluronic Acid), 2) The Ordinary Hyaluronic Acid 2% + B5 (Multi-molecular HA, Panthenol), 3) EQQUAL BERRY Deep Cera Vitamin Illuminating Serum (Acerola, 5% Niacinamide, 3% Tranexamic Acid, Ceramides), 4) Celimax Retinal Shot Tightening Booster (0.1% Retinal, 3% MATRIXYL 3000, 1% Panthenol), 5) La Roche-Posay Anthelios UVMUNE 400 50+ Invisible Fluid (Mexoryl 400, Netlock Technology).',
    volume: '5-Piece Complete Dry Skin Package',
    badge: 'Sale',
    inStock: true
  },
  {
    id: 'ol-25',
    name: 'Anua Niacinamide 10 +TXA 4',
    category: 'Skincare',
    subcategory: 'Serums',
    price: 8.064516129,
    originalPrice: 10.322580645,
    rating: 4.9,
    reviewsCount: 310,
    image: '/anua-niacinamide-10-txa-4.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1608248597359-074415843468?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Anua Niacinamide 10 + TXA 4 Dark Spot Correcting Serum is a high-performance brightening serum formulated with 10% Niacinamide, 4% Tranexamic Acid, and 2% Arbutin to target stubborn hyperpigmentation, acne scars, and uneven skin tone. The lightweight, non-sticky watery formula gets its signature pink color naturally from Vitamin B12, delivering rapid radiance and intense hydration without clogging pores.',
    benefits: [
      'Triple-action dark spot correction: 10% Niacinamide + 4% Tranexamic Acid + 2% Arbutin',
      'Visibly fades post-acne blemishes, hyperpigmentation & sun damage',
      'Signature light pink watery serum enriched with soothing Vitamin B12',
      'Ceramide NP & Hyaluronic Acid protect and reinforce the skin moisture barrier'
    ],
    ingredients: 'Aqua, Glycerin, Niacinamide (10%), Tranexamic Acid (4%), Butylene Glycol, Diethoxyethyl Succinate, 1,2-Hexanediol, Arbutin (2%), Sodium Hyaluronate, Alpha-Arbutin, Coccinia Indica Fruit Extract, Eclipta Prostrata Extract, Macadamia Integrifolia Seed Oil, Olea Europaea Fruit Oil, Jojoba Seed Oil, Vitis Vinifera Seed Oil, Theobroma Cacao Extract, Glutathione, Ceramide NP, Ethylhexylglycerin, Cyanocobalamin (Vitamin B12).',
    volume: '30ml / 1.01 FL. OZ.',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-26',
    name: 'BIOAQUA Skincare Set',
    category: 'Skincare',
    subcategory: 'Routine Sets',
    price: 18.064516129,
    originalPrice: 21.93548387,
    rating: 4.9,
    reviewsCount: 185,
    image: '/bioaqua-skincare-set.jpg',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85'
    ],
    description: 'Give your skin a complete care routine with BIOAQUA. ✨\n\nThis set is designed to help cleanse, hydrate, nourish and brighten the appearance of the skin, while supporting a smoother and healthier-looking complexion.\n\nIt is a convenient option for anyone who prefers to have their skincare products together in one complete routine instead of choosing products separately.\n\nInside the luxury gift box set:\n• BIOAQUA Vitamin C Cleansing Foam (100g)\n• BIOAQUA Vitamin C Eye Cream (20g)\n• BIOAQUA Vitamin C Essence Toner (120ml)\n• BIOAQUA Vitamin C Nourishing Serum (15ml)\n• BIOAQUA Vitamin C Essence Emulsion Lotion (120ml)\n• BIOAQUA Vitamin C Moisturizing Cream (50g)\n\nPerfect for: Everyday skincare, hydration, nourishment and a fresh, healthy-looking glow.\n\nPackage Price: ₦28,000',
    benefits: [
      'Complete 6-piece vitamin C routine set in an embossed luxury gift presentation box',
      'Deeply cleanses impurities while replenishing essential skin barrier moisture',
      'Nourishing antioxidant formula visibly brightens and evens skin tone',
      'Hydrates, smoothes fine lines, and promotes a refreshed, healthy glow'
    ],
    ingredients: 'Complete 6-Piece Collection: Citrus Junos (Yuzu) Fruit Extract, 3-O-Ethyl Ascorbic Acid (Vitamin C), Niacinamide, Sodium Hyaluronate, Centella Asiatica Extract, Glycerin, Propylene Glycol, Carbomer, Allantoin, Arbutin, Hydrogenated Lecithin, Butylene Glycol, Caprylyl Glycol.',
    volume: '6-Piece Luxury Box Routine Set',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-27',
    name: 'medicube Collagen Night Wrapping Mask',
    category: 'Skincare',
    subcategory: 'Face Creams',
    price: 15.483870968,
    originalPrice: 18.064516129,
    rating: 5.0,
    reviewsCount: 146,
    image: '/medicube-collagen-night-wrapping-mask.jpg',
    secondaryImages: [
      '/category-skincare.jpg',
      '/dry-skin-girlie-routine.jpg'
    ],
    description: 'An overnight collagen mask that helps hydrate, smooth and refresh the skin while you sleep.\n\nApply it as the last step of your nighttime routine, leave it overnight, then gently remove it in the morning.\n\nFor: Dry, dull and tired-looking skin.\n\nPrice: ₦24,000',
    benefits: [
      'Overnight collagen wrapping technology seals moisture and active nutrients while you sleep',
      'Enriched with concentrated Collagen Extract, Niacinamide and Ceramide NP',
      'Helps hydrate, smooth, tighten pores, and refresh fatigued skin',
      'Gently peel off or rinse in the morning to unveil plump, glowing glass skin'
    ],
    ingredients: 'Collagen Extract (70%), Water, Polyvinyl Alcohol, Glycerin, 1,2-Hexanediol, Niacinamide, Ceramide NP, Sodium Hyaluronate, Hydrolyzed Collagen, Adenosine, Ethylhexylglycerin, Hydrogenated Lecithin, Butylene Glycol, Tocopherol.',
    volume: '75ml / 2.53 fl. oz.',
    badge: 'Trending',
    inStock: true
  },
  {
    id: 'ol-28',
    name: 'La Roche-Posay Anthelios UVMune 400 Oil Control Fluid SPF 50+',
    category: 'Skincare',
    subcategory: 'Sunscreen',
    price: 10.322580645,
    originalPrice: 12.903225806,
    rating: 4.9,
    reviewsCount: 382,
    image: '/la-roche-posay-anthelios-oil-control.jpg',
    secondaryImages: [
      '/category-skincare.jpg',
      '/dry-skin-girlie-routine.jpg'
    ],
    description: 'La Roche-Posay Anthelios UVMune 400 Oil Control Fluid SPF 50+ provides the ultimate daily defense against ultra-long UVA rays with an invisible, anti-shine matte finish. Formulated specifically for oily, blemish-prone, and combination skin, it utilizes revolutionary Mexoryl 400 UV filter technology and Airlicium to absorb excess sebum and sweat for up to 12 hours.\n\nUltra light, non-greasy, water and sweat resistant, with zero white cast.\n\nPrice: ₦16,000',
    benefits: [
      'Very high broad-spectrum SPF 50+ protection with revolutionary Mexoryl 400 against ultra-long UVA',
      'Anti-shine matte finish powered by Airlicium micro-particles to absorb excess oil for 12 hours',
      'Ultra-fluid, non-greasy, non-sticky texture with 0% white cast on all skin tones',
      'Sweat, sand, and water resistant; non-comedogenic and tested on sensitive skin'
    ],
    ingredients: 'Aqua / Water, Alcohol Denat., Triethyl Citrate, Diisopropyl Sebacate, Silica, Ethylhexyl Salicylate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Ethylhexyl Triazone, Butyl Methoxydibenzoylmethane, Glycerin, Propanediol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Methoxypropylamino Cyclohexenylidene Ethoxyethylcyanoacetate (Mexoryl 400), Perlite, Tocopherol, Caprylic/Capric Triglyceride, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Caprylyl Glycol, Hydroxyethylcellulose, Silica Silylate, Terephthalylidene Dicamphor Sulfonic Acid, Triethanolamine, Trisodium Ethylenediamine Disuccinate.',
    volume: '50ml / 1.7 FL. OZ.',
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 'ol-29',
    name: 'La Roche-Posay Anthelios UVMune 400 Invisible Fluid SPF 50+',
    category: 'Skincare',
    subcategory: 'Sunscreen',
    price: 9.677419355,
    originalPrice: 12.258064516,
    rating: 4.9,
    reviewsCount: 420,
    image: '/la-roche-posay-anthelios-invisible-fluid.jpg',
    secondaryImages: [
      '/category-skincare.jpg',
      '/dry-skin-girlie-routine.jpg'
    ],
    description: 'La Roche-Posay Anthelios UVMune 400 Invisible Fluid SPF 50+ is an ultra-lightweight, non-greasy daily sunscreen delivering ultimate broad-spectrum protection against ultra-long UVA rays. Formulated with the breakthrough Mexoryl 400 filter and Netlock Technology, it creates an invisible, ultra-resistant shield that leaves 0% white cast on all skin tones and will not sting the eyes.\n\nSuitable for all skin types, including sensitive and reactive skin.\n\nPrice: ₦15,000',
    benefits: [
      'Ultimate broad-spectrum SPF 50+ protection powered by breakthrough Mexoryl 400 against ultra-long UVA',
      'Netlock Technology provides an invisible finish with zero white cast and zero greasy residue',
      'Ultra-resistant to water, sweat, and sand; formulated not to migrate or sting the eyes',
      'Tested under dermatological control on sensitive skin; fragrance-free & hypoallergenic'
    ],
    ingredients: 'Aqua / Water, Alcohol Denat., Triethyl Citrate, Diisopropyl Sebacate, Silica, Ethylhexyl Salicylate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Ethylhexyl Triazone, Butyl Methoxydibenzoylmethane, Glycerin, Propanediol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Methoxypropylamino Cyclohexenylidene Ethoxyethylcyanoacetate (Mexoryl 400), Drometrizole Trisiloxane, Tocopherol, Caprylic/Capric Triglyceride, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Caprylyl Glycol, Hydroxyethylcellulose, Terephthalylidene Dicamphor Sulfonic Acid, Triethanolamine, Trisodium Ethylenediamine Disuccinate.',
    volume: '50ml / 1.7 FL. OZ.',
    badge: 'Bestseller',
    inStock: true
  }
];

export const TRUST_BADGES = [
  {
    title: 'Fast & Reliable Delivery',
    subtitle: 'Get your orders on time',
    icon: 'truck'
  },
  {
    title: '100% Authentic Products',
    subtitle: 'Original & trusted brands',
    icon: 'shield-check'
  },
  {
    title: 'Secure Payments',
    subtitle: 'Shop with confidence',
    icon: 'lock'
  },
  {
    title: 'Dedicated Support',
    subtitle: "We're here to help",
    icon: 'headphones'
  }
];
