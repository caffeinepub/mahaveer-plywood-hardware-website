import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'Services', sectionId: 'services' },
  { label: 'Products', sectionId: 'catalog' },
  { label: 'Gallery', sectionId: 'gallery' },
  { label: 'Pricing', sectionId: 'pricing' },
  { label: 'Contractors', sectionId: 'contractors' },
  { label: 'Contact', sectionId: 'contact' },
];

interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: settings } = useBusinessSettings();
  const { openWhatsApp } = useWhatsAppContact();

  const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink">
            <img
              src="/assets/generated/logo-icon.dim_88x88.png"
              alt="Logo"
              className="w-8 h-8 flex-shrink-0"
            />
            <span className="font-bold text-sm sm:text-base text-primary truncate max-w-[160px] sm:max-w-none">
              {companyName}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                  activeSection === item.sectionId
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => openWhatsApp('Hello! I would like to know more about your services.')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Zap className="w-4 h-4" />
              WhatsApp
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-foreground hover:bg-primary/10 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors min-h-[44px] ${
                  activeSection === item.sectionId
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <button
                onClick={() => {
                  openWhatsApp('Hello! I would like to know more about your services.');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
              >
                <Zap className="w-5 h-5" />
                Contact on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
