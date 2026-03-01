import { useState } from 'react';
import { Send, Calendar } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

export default function SiteVisitBookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [workType, setWorkType] = useState('');
  const [address, setAddress] = useState('');

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';

    const message = templates?.siteVisitTemplate
      ? replacePlaceholders(templates.siteVisitTemplate, {
          companyName,
          name,
          phone,
          date: date || 'Flexible',
          workType,
          address: address || '-',
        })
      : `Hello ${companyName},\n\nSite Visit Request:\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${date || 'Flexible'}\nWork Type: ${workType}\nAddress/Area: ${address || '-'}\n\nPlease confirm suitable time for site visit.`;

    openWhatsApp(message);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg sm:text-xl font-bold text-foreground">Book a Site Visit</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
            Preferred Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
            Type of Work
          </label>
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
            required
          >
            <option value="">Select work type...</option>
            <option value="Full Interior">Full Interior</option>
            <option value="Modular Kitchen">Modular Kitchen</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Electrical Work">Electrical Work</option>
            <option value="Paint Work">Paint Work</option>
            <option value="Consultation">Consultation Only</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
            Site Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your site address"
            rows={2}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px]"
        >
          <Send className="w-4 h-4" />
          Book Site Visit on WhatsApp
        </button>
      </form>
    </div>
  );
}
