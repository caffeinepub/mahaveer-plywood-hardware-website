import { X, Send, Trash2 } from 'lucide-react';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

interface InquiryBasketProps {
  basket: string[];
  onRemove: (productName: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function InquiryBasket({ basket, onRemove, onClear, onClose }: InquiryBasketProps) {
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const handleSubmitInquiry = () => {
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';
    const productList = basket.map((name, i) => `${i + 1}. ${name}`).join('\n');
    const message = `Hello ${companyName},\n\nI am interested in the following products:\n\n${productList}\n\nPlease share pricing and availability. Thank you!`;
    openWhatsApp(message);
  };

  return (
    <div className="bg-card border border-primary/20 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          Inquiry Basket ({basket.length})
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-2 mb-4 max-h-48 sm:max-h-60 overflow-y-auto">
        {basket.map((productName) => (
          <div
            key={productName}
            className="flex items-center justify-between gap-2 p-2.5 bg-secondary/30 rounded-lg"
          >
            <p className="text-sm font-medium text-foreground truncate flex-1">{productName}</p>
            <button
              onClick={() => onRemove(productName)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={onClear}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground/70 rounded-lg text-sm font-medium hover:bg-secondary transition-colors min-h-[44px] sm:flex-1"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
        <button
          onClick={handleSubmitInquiry}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors min-h-[44px] sm:flex-1"
        >
          <Send className="w-4 h-4" />
          Send Inquiry
        </button>
      </div>
    </div>
  );
}
