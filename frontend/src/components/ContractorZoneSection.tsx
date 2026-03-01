import { Truck, Package, Users, ArrowRight } from 'lucide-react';
import ContractorInquiryForm from './ContractorInquiryForm';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

const benefits = [
  {
    icon: Package,
    title: 'Bulk Pricing',
    description: 'Special rates for bulk orders and repeat customers.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Priority delivery for contractor orders.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Dedicated account manager for your projects.',
  },
];

export default function ContractorZoneSection() {
  const { openWhatsApp } = useWhatsAppContact();

  return (
    <section id="contractors" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Contractor Zone
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            For Contractors & Builders
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto">
            Special pricing and dedicated support for contractors, builders, and interior designers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Benefits */}
          <div>
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mb-6 sm:mb-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 sm:gap-4 p-4 bg-card border border-border rounded-xl"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-xs sm:text-sm text-foreground/60">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Service Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Plywood', 'Hardware', 'Laminates', 'Electrical', 'Paints', 'Modular'].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs sm:text-sm text-primary font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>

            <button
              onClick={() => openWhatsApp('Hello! I am a contractor and would like to discuss bulk pricing and partnership opportunities.')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px]"
            >
              Discuss Partnership
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Inquiry Form */}
          <div>
            <ContractorInquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
