import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, Info } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

const ROOMS = [
  { id: 'living', label: 'Living Room', basePrice: 80000 },
  { id: 'master-bedroom', label: 'Master Bedroom', basePrice: 100000 },
  { id: 'bedroom-2', label: 'Bedroom 2', basePrice: 80000 },
  { id: 'bedroom-3', label: 'Bedroom 3', basePrice: 70000 },
  { id: 'kitchen', label: 'Kitchen', basePrice: 120000 },
  { id: 'dining', label: 'Dining Area', basePrice: 40000 },
  { id: 'bathroom-1', label: 'Master Bathroom', basePrice: 60000 },
  { id: 'bathroom-2', label: 'Common Bathroom', basePrice: 40000 },
  { id: 'study', label: 'Study/Office', basePrice: 60000 },
  { id: 'balcony', label: 'Balcony', basePrice: 30000 },
];

const TIERS = [
  { id: 'essential', label: 'Essential', multiplier: 1.0, description: 'Quality materials, standard finishes' },
  { id: 'premium', label: 'Premium', multiplier: 1.6, description: 'Premium materials, designer finishes' },
  { id: 'luxury', label: 'Luxury', multiplier: 2.5, description: 'Imported materials, bespoke design' },
];

const MIN_FULL_HOME_BUDGET = 800000;

export default function PremiumQuoteBuilder() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState('premium');
  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();

  const toggleRoom = (roomId: string) => {
    setSelectedRooms(prev =>
      prev.includes(roomId) ? prev.filter(r => r !== roomId) : [...prev, roomId]
    );
  };

  const isFullHome = selectedRooms.length >= 5;

  const estimate = useMemo(() => {
    const tier = TIERS.find(t => t.id === selectedTier)!;
    const base = selectedRooms.reduce((sum, roomId) => {
      const room = ROOMS.find(r => r.id === roomId);
      return sum + (room?.basePrice ?? 0);
    }, 0);
    const low = Math.round(base * tier.multiplier);
    const high = Math.round(base * tier.multiplier * 1.3);
    return { low, high };
  }, [selectedRooms, selectedTier]);

  const isNotApplicable = isFullHome && estimate.low < MIN_FULL_HOME_BUDGET;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const handleGetQuote = () => {
    const roomLabels = selectedRooms.map(id => ROOMS.find(r => r.id === id)?.label ?? id).join(', ');
    const tierLabel = TIERS.find(t => t.id === selectedTier)?.label ?? selectedTier;
    const estimateText = isNotApplicable
      ? 'Not Applicable (below minimum budget for full home)'
      : `${formatCurrency(estimate.low)} – ${formatCurrency(estimate.high)}`;

    const message = replacePlaceholders(templates.quoteBuilder, {
      rooms: roomLabels || 'Not selected',
      tier: tierLabel,
      estimate: estimateText,
    });
    openWhatsApp(message);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <Calculator className="h-4 w-4 text-gold-600" />
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">Free Quote Builder</span>
          </div>
          <h2 className="section-title">Build Your Quote</h2>
          <p className="section-subtitle">
            Select your rooms and quality tier to get an instant estimate
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="luxury-card p-8">
            {/* Room Selection */}
            <div className="mb-8">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                1. Select Rooms
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {ROOMS.map(room => (
                  <button
                    key={room.id}
                    onClick={() => toggleRoom(room.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-center transition-all border ${
                      selectedRooms.includes(room.id)
                        ? 'btn-gold border-gold-500 shadow-gold'
                        : 'bg-white border-gold-200 text-foreground/70 hover:border-gold-400 hover:text-gold-600'
                    }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Selection */}
            <div className="mb-8">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                2. Choose Quality Tier
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {TIERS.map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTier === tier.id
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-gold-200 bg-white hover:border-gold-300'
                    }`}
                  >
                    <div className="font-serif font-bold text-foreground mb-1">{tier.label}</div>
                    <div className="text-xs text-muted-foreground">{tier.description}</div>
                    <div className="text-xs text-gold-600 font-medium mt-1">
                      {tier.multiplier}x multiplier
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate Display */}
            <div className="p-6 rounded-2xl bg-gold-50 border border-gold-300 mb-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                3. Your Estimate
              </h3>
              {selectedRooms.length === 0 ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-5 w-5 text-gold-500" />
                  <span className="text-sm">Select at least one room to see an estimate</span>
                </div>
              ) : isNotApplicable ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold font-serif text-destructive">Not Applicable</div>
                  <p className="text-sm text-muted-foreground">
                    Full home furniture packages are not available below ₹8,00,000.
                    Please select fewer rooms or upgrade to a higher tier.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl font-bold font-serif text-gold-600">
                    {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated range for {selectedRooms.length} room{selectedRooms.length > 1 ? 's' : ''} •{' '}
                    {TIERS.find(t => t.id === selectedTier)?.label} tier
                  </p>
                  <p className="text-xs text-muted-foreground">
                    * Final quote may vary based on design complexity and material selection
                  </p>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleGetQuote}
              disabled={selectedRooms.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl btn-gold font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-gold"
            >
              <MessageCircle className="h-5 w-5" />
              Get Detailed Quote via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
