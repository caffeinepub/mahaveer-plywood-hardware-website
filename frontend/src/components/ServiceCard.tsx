import { LucideIcon, ArrowRight } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();
  const Icon = service.icon;

  const handleQuoteRequest = () => {
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';
    const message = templates?.productInquiryTemplate
      ? replacePlaceholders(templates.productInquiryTemplate, {
          companyName,
          product: service.title,
          category: service.id,
          specifications: service.description,
        })
      : `Hello ${companyName},\n\nI want a quote for: ${service.title}\n\nProperty Details:\nBudget Range:\n\nPlease share pricing and options.`;
    openWhatsApp(message);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-all duration-300 group flex flex-col">
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>

      {/* Title & Description */}
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2">{service.title}</h3>
      <p className="text-xs sm:text-sm text-foreground/60 mb-3 sm:mb-4 flex-1">{service.description}</p>

      {/* Features */}
      <ul className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Quote Button */}
      <button
        onClick={handleQuoteRequest}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors min-h-[44px]"
      >
        Get Quote
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
