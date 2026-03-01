import { Star } from 'lucide-react';
import PricingCard from './PricingCard';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

const pricingTiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹2.5L',
    priceNote: 'starting from',
    description: 'Essential interior package for budget-conscious homeowners.',
    features: [
      'Basic plywood & laminates',
      'Standard modular kitchen',
      'Basic wardrobe',
      'Standard hardware fittings',
      'Basic electrical work',
    ],
    isPopular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹5L',
    priceNote: 'starting from',
    description: 'Complete interior solution with premium materials and finishes.',
    features: [
      'Premium plywood & laminates',
      'Designer modular kitchen',
      'Premium wardrobe with accessories',
      'Branded hardware fittings',
      'Full electrical & lighting',
      'Interior painting',
      'Designer false ceiling',
    ],
    isPopular: true,
  },
  {
    id: 'luxury',
    name: 'Luxury',
    price: '₹10L+',
    priceNote: 'starting from',
    description: 'Ultra-premium interior with the finest materials and craftsmanship.',
    features: [
      'Top-grade plywood & imported laminates',
      'Luxury modular kitchen with island',
      'Walk-in wardrobe',
      'Premium European hardware',
      'Smart electrical & automation',
      'Luxury paint & texture finishes',
      'Custom false ceiling & lighting',
      'Dedicated project manager',
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const handleQuoteClick = (tierName: string, tierBudget: string) => {
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';
    const message = templates?.estimateMessageTemplate
      ? replacePlaceholders(templates.estimateMessageTemplate, {
          companyName,
          name: '',
          phone: '',
          requirement: `${tierName} Package`,
          budget: tierBudget,
          message: '',
        })
      : `Hello ${companyName},\n\nI want a ${tierName} quote for my project.\n\nCity/Area:\nBudget: ${tierBudget}\nTimeline:\n\nPlease provide details and estimate for the ${tierName} package.`;

    openWhatsApp(message);
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-primary" />
            Pricing Packages
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Choose Your Package
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto">
            Transparent pricing with no hidden costs. All packages include professional installation.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              onQuoteClick={() =>
                handleQuoteClick(
                  tier.name,
                  tier.name === 'Basic' ? 'Under 3L' : tier.name === 'Premium' ? '3L - 7L' : 'Above 10L'
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
