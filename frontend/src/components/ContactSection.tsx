import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';
import SiteVisitBookingForm from './SiteVisitBookingForm';
import QuickEstimateForm from './QuickEstimateForm';

export default function ContactSection() {
  const { data } = useBusinessSettings();

  const INFO_CARDS = [
    {
      icon: Phone,
      title: 'Call Us',
      lines: [data?.primaryPhone ?? '+91 95880 46569', data?.secondaryPhone ?? ''],
      href: `tel:${data?.primaryPhone ?? '+919588046569'}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [data?.email ?? 'info@mahaveerplywood.com'],
      href: `mailto:${data?.email ?? 'info@mahaveerplywood.com'}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: [data?.address ?? 'Shop No. 12, Main Market, Pune, Maharashtra 411001'],
      href: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: [data?.businessHours ?? 'Mon–Sat: 9:00 AM – 7:00 PM'],
      href: '#',
    },
  ];

  return (
    <section className="section-padding bg-cream-100">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">Get In Touch</span>
          </div>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Ready to transform your space? Reach out for a free consultation
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {INFO_CARDS.map(({ icon: Icon, title, lines, href }) => (
            <a
              key={title}
              href={href}
              className="luxury-card p-6 text-center group hover:border-gold-400 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold-200 transition-colors">
                <Icon className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="font-serif font-bold text-foreground mb-2">{title}</h3>
              {lines.filter(Boolean).map((line, i) => (
                <p key={i} className="text-muted-foreground text-sm">{line}</p>
              ))}
            </a>
          ))}
        </div>

        {/* Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Site Visit Form */}
          <div className="luxury-card p-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Book a Free Site Visit
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Our expert will visit your site and provide a detailed consultation
            </p>
            <SiteVisitBookingForm />
          </div>

          {/* Quick Estimate Form */}
          <div className="luxury-card p-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Quick Estimate
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Get a rough estimate for your project in minutes
            </p>
            <QuickEstimateForm />
          </div>
        </div>
      </div>
    </section>
  );
}
