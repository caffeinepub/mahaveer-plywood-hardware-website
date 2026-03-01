import React, { useState } from 'react';
import { Send, Loader2, AlertTriangle } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

interface FormData {
  name: string;
  phone: string;
  projectType: string;
  budget: string;
  area: string;
}

const MIN_FULL_HOME_BUDGET = 800000;

const BUDGET_OPTIONS = [
  { value: '100000-150000', label: '₹1,00,000 – ₹1,50,000', amount: 100000 },
  { value: '150000-300000', label: '₹1,50,000 – ₹3,00,000', amount: 150000 },
  { value: '300000-500000', label: '₹3,00,000 – ₹5,00,000', amount: 300000 },
  { value: '500000-800000', label: '₹5,00,000 – ₹8,00,000', amount: 500000 },
  { value: '800000-1500000', label: '₹8,00,000 – ₹15,00,000', amount: 800000 },
  { value: '1500000+', label: '₹15,00,000+', amount: 1500000 },
];

const FULL_HOME_TYPES = ['Full Home Interior', 'Complete Home Renovation'];

export default function QuickEstimateForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    projectType: '',
    budget: '',
    area: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();

  const isFullHome = FULL_HOME_TYPES.includes(form.projectType);
  const selectedBudget = BUDGET_OPTIONS.find(b => b.value === form.budget);
  const isBudgetTooLow = isFullHome && selectedBudget && selectedBudget.amount < MIN_FULL_HOME_BUDGET;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.projectType) newErrors.projectType = 'Project type is required';
    if (!form.budget) newErrors.budget = 'Budget is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isBudgetTooLow) return;
    setIsSubmitting(true);
    try {
      const budgetLabel = BUDGET_OPTIONS.find(b => b.value === form.budget)?.label ?? form.budget;
      const message = replacePlaceholders(templates.estimate, {
        name: form.name,
        phone: form.phone,
        projectType: form.projectType,
        budget: budgetLabel,
        area: form.area || 'Not specified',
      });
      openWhatsApp(message);
      setForm({ name: '', phone: '', projectType: '', budget: '', area: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-destructive' : 'border-gold-200'
    } bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm transition-all`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Your name"
            className={inputClass('name')}
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            placeholder="+91 XXXXX XXXXX"
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Project Type *</label>
        <select
          value={form.projectType}
          onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}
          className={inputClass('projectType')}
        >
          <option value="">Select project type</option>
          <option value="Modular Kitchen">Modular Kitchen</option>
          <option value="Wardrobe">Wardrobe</option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Full Home Interior">Full Home Interior</option>
          <option value="Complete Home Renovation">Complete Home Renovation</option>
          <option value="Office Interior">Office Interior</option>
          <option value="Other">Other</option>
        </select>
        {errors.projectType && <p className="text-destructive text-xs mt-1">{errors.projectType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range *</label>
        <select
          value={form.budget}
          onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
          className={inputClass('budget')}
        >
          <option value="">Select budget range</option>
          {BUDGET_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
      </div>

      {/* Budget Warning */}
      {isBudgetTooLow && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-destructive text-sm font-semibold">Budget Too Low for Full Home</p>
            <p className="text-destructive/80 text-xs mt-1">
              Full home interior packages start from ₹8,00,000. Please select a higher budget or choose a specific room project.
            </p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Area (sq ft)</label>
        <input
          type="number"
          value={form.area}
          onChange={e => setForm(p => ({ ...p, area: e.target.value }))}
          placeholder="Approximate area in sq ft"
          className={inputClass('area')}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !!isBudgetTooLow}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-gold font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? 'Opening WhatsApp...' : 'Get Free Estimate via WhatsApp'}
      </button>
    </form>
  );
}
