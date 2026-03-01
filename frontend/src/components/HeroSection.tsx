import React from 'react';
import { ArrowRight, Star, Award, Users, Package } from 'lucide-react';

const TRUST_INDICATORS = [
  { icon: Award, value: '27+', label: 'Years Experience', color: 'text-gold-600' },
  { icon: Users, value: '5000+', label: 'Projects Done', color: 'text-gold-600' },
  { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'text-gold-600' },
  { icon: Package, value: '6+', label: 'Categories', color: 'text-gold-600' },
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container-luxury text-center text-white pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-400/40 backdrop-blur-sm mb-6">
          <Star className="h-4 w-4 text-gold-400 fill-gold-400" />
          <span className="text-gold-300 text-sm font-medium tracking-wide">Premium Interiors Since 1997</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Transform Your Space
          <br />
          <span className="text-gradient-gold">Into Luxury</span>
        </h1>

        {/* Subheadline */}
        <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Pune's most trusted plywood, hardware & interior solutions provider.
          From raw materials to complete home transformations — we deliver excellence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => scrollTo('quote-builder')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full btn-gold text-base font-bold shadow-gold"
          >
            Get Free Quote
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm text-white text-base font-semibold hover:bg-white/25 transition-all"
          >
            View Our Work
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {TRUST_INDICATORS.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <Icon className={`h-6 w-6 ${color}`} />
              <div className="text-2xl font-bold font-serif text-white">{value}</div>
              <div className="text-white/75 text-xs font-medium text-center">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
