import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  color: string;
}

export default function ServiceCard({ title, description, image, features, color }: ServiceCardProps) {
  const scrollToQuote = () => {
    const el = document.getElementById('quote-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="luxury-card overflow-hidden group transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className={`relative h-48 bg-gradient-to-br ${color} overflow-hidden`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5">
          {features.map(feature => (
            <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={scrollToQuote}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-gold text-sm font-bold"
        >
          Get Free Quote
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
