import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contractors', href: '#contractor-zone' },
  { label: 'Quote Builder', href: '#quote-builder' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { data } = useBusinessSettings();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'mahaveer-plywood'
  );

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/logo-icon.dim_200x200.png"
                alt="Mahaveer Logo"
                className="h-12 w-12 object-contain"
              />
              <div>
                <div className="font-serif font-bold text-xl text-white">Mahaveer</div>
                <div className="text-gold-400 text-xs font-medium tracking-wider uppercase">
                  Plywood & Interiors
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm">
              Pune's most trusted partner for premium interior materials, hardware, and complete
              home solutions since 1997.
            </p>
            <div className="flex gap-6 text-sm">
              <div>
                <div className="text-gold-400 font-bold font-serif text-xl">27+</div>
                <div className="text-white/50 text-xs">Years Exp.</div>
              </div>
              <div>
                <div className="text-gold-400 font-bold font-serif text-xl">5000+</div>
                <div className="text-white/50 text-xs">Projects</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              {data?.primaryPhone && (
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:${data.primaryPhone}`}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {data.primaryPhone}
                  </a>
                </li>
              )}
              {data?.email && (
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${data.email}`}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {data.email}
                  </a>
                </li>
              )}
              {data?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">{data.address}</span>
                </li>
              )}
              {data?.businessHours && (
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">{data.businessHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {year} {data?.companyName ?? 'Mahaveer Plywood & Interiors'}. All rights reserved.
          </p>
          <p className="text-sm text-white/40 flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400 mx-0.5" />
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
