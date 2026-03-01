import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

export default function Footer() {
  const { data: settings } = useBusinessSettings();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'mahaveer-plywood');

  return (
    <footer className="bg-background border-t border-border pt-10 sm:pt-14 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <img
                src="/assets/generated/logo-icon.dim_88x88.png"
                alt="Logo"
                className="w-8 h-8"
              />
              <span className="font-bold text-sm sm:text-base text-primary">
                {settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/60 mb-4 leading-relaxed">
              Premium interior solutions — plywood, modular furniture, electrical, and paint services since 1995.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-2">
              {['Plywood & Hardware', 'Modular Kitchens', 'Wardrobes', 'Electrical Work', 'Paint Services'].map((item) => (
                <li key={item}>
                  <span className="text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-3 sm:mb-4">Products</h4>
            <ul className="space-y-2">
              {['Plywood', 'Laminates', 'Hardware', 'Kitchen Modules', 'Wardrobe Systems'].map((item) => (
                <li key={item}>
                  <span className="text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-2.5">
              {settings?.primaryPhone && (
                <li>
                  <a
                    href={`tel:${settings.primaryPhone}`}
                    className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors min-h-[44px] py-1"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                    {settings.primaryPhone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors min-h-[44px] py-1 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-2 text-xs sm:text-sm text-foreground/60">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary mt-0.5" />
                  <span className="break-words">{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-foreground/40">
            © {year} {settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS'}. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 text-primary fill-primary" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
