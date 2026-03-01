import React from 'react';
import ServiceCard from './ServiceCard';

const SERVICES = [
  {
    title: 'Plywood & Boards',
    description: 'Premium quality plywood, MDF, particle boards and blockboards from top brands like Century, Greenply, and Kitply.',
    image: '/assets/generated/service-plywood.dim_600x400.png',
    features: ['BWR/BWP Grade', 'ISI Certified', 'All Thicknesses', 'Bulk Discounts'],
    color: 'from-amber-50 to-orange-50',
  },
  {
    title: 'Hardware & Fittings',
    description: 'Complete range of furniture hardware including hinges, channels, handles, locks, and accessories from Hettich, Hafele, and more.',
    image: '/assets/generated/service-hardware.dim_600x400.png',
    features: ['Soft-Close Hinges', 'Drawer Channels', 'Cabinet Handles', 'Door Locks'],
    color: 'from-slate-50 to-gray-50',
  },
  {
    title: 'Laminates & Veneers',
    description: 'Extensive collection of decorative laminates, acrylic sheets, and natural veneers in 500+ designs and finishes.',
    image: '/assets/generated/service-laminates.dim_600x400.png',
    features: ['300+ Designs', 'Matte & Gloss', 'Acrylic Finish', 'Natural Veneers'],
    color: 'from-rose-50 to-pink-50',
  },
  {
    title: 'Electrical Solutions',
    description: 'Complete electrical fittings including modular switches, LED lighting, wiring accessories from Legrand, Havells, and Philips.',
    image: '/assets/generated/service-electrical.dim_600x400.png',
    features: ['Modular Switches', 'LED Lighting', 'Cove Lighting', 'Smart Controls'],
    color: 'from-yellow-50 to-amber-50',
  },
  {
    title: 'Paints & Finishes',
    description: 'Premium interior and exterior paints, textures, and wall finishes from Asian Paints, Berger, and Dulux.',
    image: '/assets/generated/service-paints.dim_600x400.png',
    features: ['1000+ Shades', 'Texture Paints', 'Waterproof Coats', 'Free Tinting'],
    color: 'from-purple-50 to-violet-50',
  },
  {
    title: 'Interior Design',
    description: 'End-to-end interior design and execution for kitchens, wardrobes, living rooms, and complete home interiors.',
    image: '/assets/generated/service-interiors.dim_600x400.png',
    features: ['3D Design', 'Modular Kitchen', 'Wardrobes', 'Full Home'],
    color: 'from-emerald-50 to-teal-50',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-cream-100">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">What We Offer</span>
          </div>
          <h2 className="section-title">Our Premium Services</h2>
          <p className="section-subtitle">
            From raw materials to complete interior solutions — everything under one roof
          </p>
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold font-serif text-gold-600">27+</div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div className="w-px bg-gold-200 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-serif text-gold-600">5000+</div>
              <div className="text-sm text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="w-px bg-gold-200 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl font-bold font-serif text-gold-600">6</div>
              <div className="text-sm text-muted-foreground font-medium">Service Categories</div>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(service => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
