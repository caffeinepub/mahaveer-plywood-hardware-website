import { useState } from 'react';
import { Send, Calculator } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

export default function QuickEstimateForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState('');

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';

    const message = templates?.estimateMessageTemplate
      ? replacePlaceholders(templates.estimateMessageTemplate, {
          companyName,
          name,
          phone,
          requirement: serviceType,
          budget,
          message: area ? `Area: ${area} sq ft` : '-',
        })
      : `Hello ${companyName},\n\nQuick Estimate Request:\nName: ${name}\nPhone: ${phone}\nService: ${serviceType}\nBudget: ${budget}\nArea: ${area || '-'}\n\nPlease share options and quote.`;

    openWhatsApp(message);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="text-lg sm:text-xl font-bold text-foreground">Quick Estimate</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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

        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
            required
          >
            <option value="">Select service...</option>
            <option value="Modular Kitchen">Modular Kitchen</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Full Interior">Full Interior</option>
            <option value="Electrical Work">Electrical Work</option>
            <option value="Paint Work">Paint Work</option>
            <option value="Plywood & Hardware">Plywood & Hardware</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
              Budget (₹)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
              required
            >
              <option value="">Select...</option>
              <option value="Under 1L">Under 1L</option>
              <option value="1L - 3L">1L - 3L</option>
              <option value="3L - 5L">3L - 5L</option>
              <option value="5L - 10L">5L - 10L</option>
              <option value="Above 10L">Above 10L</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
              Area (sq ft)
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. 500"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px]"
        >
          <Send className="w-4 h-4" />
          Get Free Estimate on WhatsApp
        </button>
      </form>
    </div>
  );
}
