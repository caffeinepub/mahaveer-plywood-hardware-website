import { Check, ArrowRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  onQuoteClick?: () => void;
}

export default function PricingCard({ tier, onQuoteClick }: PricingCardProps) {
  return (
    <div
      className={`relative bg-card border rounded-2xl p-5 sm:p-6 flex flex-col transition-all duration-300 hover:shadow-lg ${
        tier.isPopular
          ? 'border-primary shadow-primary/20 shadow-lg'
          : 'border-border hover:border-primary/40'
      }`}
    >
      {/* Popular Badge */}
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{tier.name}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary">{tier.price}</span>
          <span className="text-xs sm:text-sm text-foreground/50">{tier.priceNote}</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground/60">{tier.description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onQuoteClick}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors min-h-[44px] ${
          tier.isPopular
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-primary/30 text-primary hover:bg-primary/10'
        }`}
      >
        Get {tier.name} Quote
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
