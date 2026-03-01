import { useState } from 'react';
import { Send } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

export default function ContractorInquiryForm() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bizName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';

    const whatsappMessage = templates?.contractorInquiryTemplate
      ? replacePlaceholders(templates.contractorInquiryTemplate, {
          companyName,
          contactName,
          phone,
          projectType,
          quantity: quantity || '-',
          message: message || '-',
        })
      : `Hello ${bizName},\n\nContractor Enquiry:\nCompany: ${companyName}\nContact: ${contactName}\nPhone: ${phone}\nProject Type: ${projectType}\nQuantity: ${quantity || '-'}\nMessage: ${message || '-'}\n\nPlease share bulk pricing & availability.`;

    openWhatsApp(whatsappMessage);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-5">Contractor Inquiry</h3>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
              required
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
              Contact Name
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
              required
            />
          </div>
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
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
            required
          >
            <option value="">Select project type...</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
            Estimated Quantity / Order Size
          </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 100 sheets, 5 kitchens"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
            Additional Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any specific requirements..."
            rows={3}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px]"
        >
          <Send className="w-4 h-4" />
          Send Contractor Inquiry
        </button>
      </form>
    </div>
  );
}
