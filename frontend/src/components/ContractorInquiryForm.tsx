import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

interface FormData {
  name: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

export default function ContractorInquiryForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    if (!form.projectType.trim()) newErrors.projectType = 'Project type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const message = replacePlaceholders(templates.contractorInquiry, {
        name: form.name,
        phone: form.phone,
        company: form.company,
        projectType: form.projectType,
        message: form.message,
      });
      openWhatsApp(message);
      setForm({ name: '', phone: '', company: '', projectType: '', message: '' });
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
        <label className="block text-sm font-medium text-foreground mb-1.5">Company Name *</label>
        <input
          type="text"
          value={form.company}
          onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
          placeholder="Your company or firm name"
          className={inputClass('company')}
        />
        {errors.company && <p className="text-destructive text-xs mt-1">{errors.company}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Project Type *</label>
        <select
          value={form.projectType}
          onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}
          className={inputClass('projectType')}
        >
          <option value="">Select project type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Industrial">Industrial</option>
          <option value="Mixed Use">Mixed Use</option>
        </select>
        {errors.projectType && <p className="text-destructive text-xs mt-1">{errors.projectType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Message (Optional)</label>
        <textarea
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          placeholder="Tell us about your project requirements..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm resize-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-gold font-bold text-sm disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isSubmitting ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
      </button>
    </form>
  );
}
