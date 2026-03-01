import React from 'react';
import PricingCard from './PricingCard';

const PRICING_TIERS = [
  {
    name: 'Essential',
    tagline: 'Quality on a Budget',
    priceRange: '₹1,00,000 – ₹1,50,000',
    perSqFt: '₹800 – ₹1,200/sq ft',
    features: [
      'BWR Grade Plywood',
      'Standard Laminates',
      'Basic Hardware Fittings',
      'Modular Kitchen (Basic)',
      'Standard Paint Finish',
      '1 Year Warranty',
    ],
    isPopular: false,
    color: 'border-gold-200',
  },
  {
    name: 'Premium',
    tagline: 'Most Popular Choice',
    priceRange: '₹1,50,000 – ₹3,00,000',
    perSqFt: '₹1,200 – ₹2,000/sq ft',
    features: [
      'BWP/Marine Grade Plywood',
      'Acrylic/PU Laminates',
      'Hettich/Hafele Hardware',
      'Modular Kitchen (Premium)',
      'Texture Paint Finish',
      'LED Cove Lighting',
      '3 Year Warranty',
    ],
    isPopular: true,
    color: 'border-gold-500',
  },
  {
    name: 'Luxury',
    tagline: 'The Ultimate Experience',
    priceRange: '₹3,00,000+',
    perSqFt: '₹2,000 – ₹3,500/sq ft',
    features: [
      'Premium Marine Plywood',
      'Italian/Imported Laminates',
      'Blum/Grass Hardware',
      'Designer Modular Kitchen',
      'Imported Wallpaper/Texture',
      'Smart Lighting System',
      'Custom Furniture Design',
      '5 Year Warranty',
    ],
    isPopular: false,
    color: 'border-gold-300',
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding bg-cream-100">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">Transparent Pricing</span>
          </div>
          <h2 className="section-title">Choose Your Package</h2>
          <p className="section-subtitle">
            Flexible packages for every budget. All quotes are free and no-obligation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_TIERS.map(tier => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          * Prices are indicative and vary based on design complexity, materials, and area.
          Contact us for an accurate quote.
        </p>
      </div>
    </section>
  );
}
