import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

interface FormData {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  notes: string;
}

export default function SiteVisitBookingForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const message = replacePlaceholders(templates.siteVisit, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        date: form.date,
        time: form.time,
        notes: form.notes || 'None',
      });
      openWhatsApp(message);
      setForm({ name: '', phone: '', address: '', date: '', time: '', notes: '' });
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
        <label className="block text-sm font-medium text-foreground mb-1.5">Site Address *</label>
        <input
          type="text"
          value={form.address}
          onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
          placeholder="Full address for site visit"
          className={inputClass('address')}
        />
        {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className={inputClass('date')}
          />
          {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Time *</label>
          <select
            value={form.time}
            onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
            className={inputClass('time')}
          >
            <option value="">Select time slot</option>
            <option value="9:00 AM - 11:00 AM">9:00 AM – 11:00 AM</option>
            <option value="11:00 AM - 1:00 PM">11:00 AM – 1:00 PM</option>
            <option value="2:00 PM - 4:00 PM">2:00 PM – 4:00 PM</option>
            <option value="4:00 PM - 6:00 PM">4:00 PM – 6:00 PM</option>
          </select>
          {errors.time && <p className="text-destructive text-xs mt-1">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Additional Notes</label>
        <textarea
          value={form.notes}
          onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          placeholder="Any specific requirements or notes..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm resize-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-gold font-bold text-sm disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? 'Opening WhatsApp...' : 'Book Site Visit via WhatsApp'}
      </button>
    </form>
  );
}
