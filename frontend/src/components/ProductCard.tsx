import { Plus, Check } from 'lucide-react';
import { Product } from '../backend';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import { useBusinessSettings } from '../hooks/useBusinessSettings';

interface ProductCardProps {
  product: Product;
  onAddToBasket: () => void;
  isInBasket: boolean;
}

export default function ProductCard({ product, onAddToBasket, isInBasket }: ProductCardProps) {
  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();
  const { data: settings } = useBusinessSettings();

  const handleDirectInquiry = () => {
    const companyName = settings?.companyName || 'MAHAVEER PLYWOOD & INTERIORS';
    const message = templates?.productInquiryTemplate
      ? replacePlaceholders(templates.productInquiryTemplate, {
          companyName,
          product: product.name,
          category: product.category,
          specifications: product.specifications,
        })
      : `Hello ${companyName},\n\nProduct Inquiry:\n• ${product.name}\n\nCity/Area:\nQuantity:\nBrand preference (if any):`;
    openWhatsApp(message);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative h-36 sm:h-40 bg-secondary overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/20 text-4xl">
            📦
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-background/80 backdrop-blur-sm border border-border rounded-full text-xs text-foreground/70 capitalize">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm sm:text-base text-foreground mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs sm:text-sm text-foreground/60 mb-2 line-clamp-2 flex-1">{product.description}</p>
        {product.specifications && (
          <p className="text-xs text-foreground/40 mb-3 line-clamp-1">{product.specifications}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={handleDirectInquiry}
            className="w-full px-3 py-2.5 border border-primary/30 text-primary rounded-lg text-xs sm:text-sm font-medium hover:bg-primary/10 transition-colors min-h-[40px]"
          >
            Quick Inquiry
          </button>
          <button
            onClick={onAddToBasket}
            disabled={isInBasket}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[40px] ${
              isInBasket
                ? 'bg-primary/20 text-primary border border-primary/30 cursor-default'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isInBasket ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Add to Basket
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
