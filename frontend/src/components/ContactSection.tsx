import { Phone, Mail, MapPin, Clock, PhoneCall } from 'lucide-react';
import { useBusinessSettings } from '../hooks/useBusinessSettings';
import SiteVisitBookingForm from './SiteVisitBookingForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactSection() {
  const { data: settings, isLoading } = useBusinessSettings();

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Contact Us
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto">
            Visit our showroom or reach out to us for any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-5">
            {/* Address */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1">Address</h3>
                {isLoading ? (
                  <Skeleton className="h-4 w-48" />
                ) : (
                  <p className="text-xs sm:text-sm text-foreground/60 break-words">
                    {settings?.address || 'Address not available'}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1">Phone</h3>
                {isLoading ? (
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ) : (
                  <div className="space-y-1">
                    {settings?.primaryPhone && (
                      <a
                        href={`tel:${settings.primaryPhone}`}
                        className="flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:underline"
                      >
                        <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
                        {settings.primaryPhone}
                      </a>
                    )}
                    {settings?.secondaryPhone && (
                      <a
                        href={`tel:${settings.secondaryPhone}`}
                        className="flex items-center gap-1.5 text-xs sm:text-sm text-foreground/60 hover:text-primary hover:underline"
                      >
                        <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
                        {settings.secondaryPhone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1">Email</h3>
                {isLoading ? (
                  <Skeleton className="h-4 w-40" />
                ) : (
                  <a
                    href={`mailto:${settings?.email}`}
                    className="text-xs sm:text-sm text-primary hover:underline break-all"
                  >
                    {settings?.email || 'Email not available'}
                  </a>
                )}
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1">Business Hours</h3>
                {isLoading ? (
                  <Skeleton className="h-4 w-44" />
                ) : (
                  <p className="text-xs sm:text-sm text-foreground/60">
                    {settings?.businessHours || 'Hours not available'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Site Visit Form */}
          <div>
            <SiteVisitBookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
