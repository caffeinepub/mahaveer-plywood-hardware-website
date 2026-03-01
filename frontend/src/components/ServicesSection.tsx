import { Package, Home, Zap, Paintbrush, ArrowRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

const services = [
  {
    id: 'materials',
    title: 'Premium Materials',
    description: 'Top-quality plywood, laminates, and hardware from leading brands.',
    icon: Package,
    features: ['ISI Marked Plywood', 'Designer Laminates', 'Premium Hardware', 'All Brands Available'],
    image: '/assets/generated/service-plywood.dim_256x256.png',
  },
  {
    id: 'modular',
    title: 'Modular Interiors',
    description: 'Custom modular kitchens, wardrobes, and complete interior solutions.',
    icon: Home,
    features: ['Modular Kitchens', 'Wardrobes', 'TV Units', 'Study Tables'],
    image: '/assets/generated/service-kitchen.dim_256x256.png',
  },
  {
    id: 'electrical',
    title: 'Electrical & Lighting',
    description: 'Professional electrical installations and designer lighting solutions.',
    icon: Zap,
    features: ['Full Wiring', 'LED Lighting', 'Switchboards', 'Safety Compliance'],
    image: '/assets/generated/service-hardware.dim_256x256.png',
  },
  {
    id: 'paints',
    title: 'Paints & Decor',
    description: 'Premium paint services with expert color consultation.',
    icon: Paintbrush,
    features: ['Interior Painting', 'Texture Finishes', 'Color Consultation', 'All Brands'],
    image: '/assets/generated/service-laminates.dim_256x256.png',
  },
];

export default function ServicesSection() {
  const { openWhatsApp } = useWhatsAppContact();

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Complete Interior Solutions
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto">
            From premium materials to complete installations — everything you need for your dream interior.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Quote Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Electrical Quote */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">Electrical Services</h3>
                <p className="text-xs sm:text-sm text-foreground/60 mb-3 sm:mb-4">
                  Professional electrical work for new constructions and renovations.
                </p>
                <button
                  onClick={() => openWhatsApp('Hello! I need a quote for electrical services. Please share details.')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors min-h-[44px]"
                >
                  Get Electrical Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Paint Quote */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">Paint Services</h3>
                <p className="text-xs sm:text-sm text-foreground/60 mb-3 sm:mb-4">
                  Expert painting with premium brands and color consultation.
                </p>
                <button
                  onClick={() => openWhatsApp('Hello! I need a quote for paint services. Please share details.')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/20 transition-colors min-h-[44px]"
                >
                  Get Paint Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Home CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
            Complete Home Interior Package
          </h3>
          <p className="text-sm sm:text-base text-foreground/60 mb-4 sm:mb-6 max-w-xl mx-auto">
            Get everything done — materials, modular furniture, electrical, and painting — with one comprehensive quote.
          </p>
          <button
            onClick={() => openWhatsApp('Hello! I am interested in a complete home interior package. Please share details and pricing.')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
          >
            Get Complete Home Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
