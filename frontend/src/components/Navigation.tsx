import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contractors', href: '#contractor-zone' },
  { label: 'Quote', href: '#quote-builder' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useBusinessSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-luxury border-b border-gold-200'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/generated/logo-icon.dim_200x200.png"
              alt="Mahaveer Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-lg text-foreground leading-tight">
                Mahaveer
              </div>
              <div className="text-xs text-gold-600 font-medium tracking-wider uppercase">
                Plywood & Interiors
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-gold-600 transition-colors rounded-lg hover:bg-gold-50"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Phone CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${data?.primaryPhone ?? '+919588046569'}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full btn-gold text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              <span>{data?.primaryPhone ?? '+91 95880 46569'}</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gold-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gold-200 shadow-luxury-lg">
          <div className="container-luxury py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-sm font-medium text-foreground/80 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href={`tel:${data?.primaryPhone ?? '+919588046569'}`}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full btn-gold text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              <span>{data?.primaryPhone ?? '+91 95880 46569'}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
