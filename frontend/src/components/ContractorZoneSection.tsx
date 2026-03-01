import React from 'react';
import { Truck, BadgePercent, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import ContractorInquiryForm from './ContractorInquiryForm';

const BENEFITS = [
  {
    icon: BadgePercent,
    title: 'Bulk Pricing',
    description: 'Exclusive discounts on large orders. The more you buy, the more you save.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Priority dispatch and on-time delivery to your project site.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    description: 'ISI certified materials with quality checks at every stage.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'Personal account manager for all your project requirements.',
  },
];

export default function ContractorZoneSection() {
  return (
    <section className="section-padding bg-cream-100">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">For Professionals</span>
          </div>
          <h2 className="section-title">Contractor Zone</h2>
          <p className="section-subtitle">
            Special partnership program for contractors, architects, and interior designers.
            Get free bulk quotes and exclusive trade pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
              Why Partner With Us?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BENEFITS.map(({ icon: Icon, title, description }) => (
                <div key={title} className="luxury-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <h4 className="font-serif font-bold text-foreground mb-2">{title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="luxury-card p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                Free Contractor Quote
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Fill in your details and we'll get back to you with exclusive trade pricing.
              </p>
              <ContractorInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
