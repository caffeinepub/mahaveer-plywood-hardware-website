import React from 'react';
import { ShoppingBag, X, Trash2, MessageCircle } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';

interface InquiryBasketProps {
  basket: string[];
  onRemove: (name: string) => void;
  onClear: () => void;
}

export default function InquiryBasket({ basket, onRemove, onClear }: InquiryBasketProps) {
  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();

  const handleBulkInquiry = () => {
    const productList = basket.map(name => `• ${name}`).join('\n');
    const message = replacePlaceholders(templates.productInquiry, {
      products: productList,
    });
    openWhatsApp(message);
  };

  return (
    <div className="mt-10 p-6 rounded-2xl bg-gold-50 border border-gold-300 shadow-luxury">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-gold-600" />
          <h3 className="font-serif font-bold text-foreground text-lg">
            Enquiry Basket ({basket.length})
          </h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-wrap gap-2 mb-5">
        {basket.map(name => (
          <div
            key={name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gold-300 text-sm font-medium text-foreground"
          >
            {name}
            <button
              onClick={() => onRemove(name)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Send Inquiry */}
      <button
        onClick={handleBulkInquiry}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors shadow-md"
      >
        <MessageCircle className="h-5 w-5" />
        Send Bulk Enquiry via WhatsApp
      </button>
    </div>
  );
}
