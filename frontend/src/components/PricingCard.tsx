import React from 'react';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';

interface PricingCardProps {
  name: string;
  tagline: string;
  priceRange: string;
  perSqFt: string;
  features: string[];
  isPopular: boolean;
  color: string;
}

export default function PricingCard({ name, tagline, priceRange, perSqFt, features, isPopular }: PricingCardProps) {
  const scrollToQuote = () => {
    const el = document.getElementById('quote-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`relative luxury-card p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
        isPopular
          ? 'border-2 border-gold-500 shadow-luxury-lg scale-105'
          : 'border border-gold-200'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full btn-gold text-xs font-bold shadow-gold">
            <Star className="h-3.5 w-3.5 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm">{tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-gold-200">
        <div className="text-2xl font-bold font-serif text-gold-600">{priceRange}</div>
        <div className="text-sm text-muted-foreground mt-1">{perSqFt}</div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map(feature => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={scrollToQuote}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
          isPopular
            ? 'btn-gold shadow-gold'
            : 'border-2 border-gold-400 text-gold-700 hover:bg-gold-50'
        }`}
      >
        Get Free {name} Quote
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
