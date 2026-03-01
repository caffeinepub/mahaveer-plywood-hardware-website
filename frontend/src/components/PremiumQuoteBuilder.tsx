import { useState } from 'react';
import { Send, Calculator } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

const modules = [
  { id: 'kitchen', label: 'Modular Kitchen', icon: '🍳' },
  { id: 'wardrobe', label: 'Wardrobe', icon: '👔' },
  { id: 'tvunit', label: 'TV Unit', icon: '📺' },
  { id: 'studytable', label: 'Study Table', icon: '📚' },
  { id: 'electrical', label: 'Electrical Work', icon: '⚡' },
  { id: 'painting', label: 'Painting', icon: '🎨' },
  { id: 'falseCeiling', label: 'False Ceiling', icon: '🏠' },
  { id: 'flooring', label: 'Flooring', icon: '🪵' },
];

export default function PremiumQuoteBuilder() {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [timeline, setTimeline] = useState('');

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((m) => m !== moduleId) : [...prev, moduleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';
    const selectedLabels = modules
      .filter((m) => selectedModules.includes(m.id))
      .map((m) => m.label)
      .join(', ');

    const message = templates?.quoteBuilderTemplate
      ? replacePlaceholders(templates.quoteBuilderTemplate, {
          companyName,
          modules: selectedLabels || 'Not specified',
          name,
          phone,
          city: '-',
        })
      : `Hello ${companyName},\n\nPremium Quote Request:\n\nSelected Modules:\n${selectedLabels || 'Not specified'}\n\nClient Details:\nName: ${name}\nPhone: ${phone}\nArea: ${area || '-'}\nTimeline: ${timeline || 'Flexible'}\n\nPlease provide detailed quotation.`;

    openWhatsApp(message);
  };

  return (
    <section id="quote-builder" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
            Quote Builder
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Build Your Custom Quote
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-xl mx-auto">
            Select the modules you need and get a personalized quote on WhatsApp.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Module Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Select Modules
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all min-h-[70px] sm:min-h-[80px] ${
                      selectedModules.includes(module.id)
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-background border-border text-foreground/70 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{module.icon}</span>
                    <span className="text-center leading-tight">{module.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
                  Total Area (sq ft)
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 1000"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground/80 mb-1.5">
                  Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
                >
                  <option value="">Select timeline...</option>
                  <option value="Immediate">Immediate</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              Get Custom Quote on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
