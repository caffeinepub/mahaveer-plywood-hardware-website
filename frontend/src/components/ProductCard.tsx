import React from 'react';
import { MessageCircle, Plus, Minus } from 'lucide-react';
import { useWhatsAppTemplates } from '../hooks/useWhatsAppTemplates';
import { useWhatsAppContact } from '../hooks/useWhatsAppContact';
import type { Product } from '../backend';
import { Category } from '../backend';

interface ProductCardProps {
  product: Product;
  isInBasket: boolean;
  onAddToBasket: () => void;
  onRemoveFromBasket: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  [Category.plywood]: 'bg-amber-100 text-amber-800',
  [Category.hardware]: 'bg-slate-100 text-slate-800',
  [Category.laminates]: 'bg-rose-100 text-rose-800',
  [Category.kitchen]: 'bg-orange-100 text-orange-800',
  [Category.wardrobe]: 'bg-purple-100 text-purple-800',
  [Category.electricals]: 'bg-yellow-100 text-yellow-800',
  [Category.paints]: 'bg-blue-100 text-blue-800',
};

const CATEGORY_LABELS: Record<string, string> = {
  [Category.plywood]: 'Plywood',
  [Category.hardware]: 'Hardware',
  [Category.laminates]: 'Laminates',
  [Category.kitchen]: 'Kitchen',
  [Category.wardrobe]: 'Wardrobe',
  [Category.electricals]: 'Electricals',
  [Category.paints]: 'Paints',
};

export default function ProductCard({ product, isInBasket, onAddToBasket, onRemoveFromBasket }: ProductCardProps) {
  const { templates, replacePlaceholders } = useWhatsAppTemplates();
  const { openWhatsApp } = useWhatsAppContact();

  const handleWhatsAppInquiry = () => {
    const message = replacePlaceholders(templates.productInquiry, {
      products: `• ${product.name}\n  ${product.specifications}`,
    });
    openWhatsApp(message);
  };

  const categoryKey = typeof product.category === 'string' ? product.category : Object.keys(product.category)[0];

  return (
    <div className="luxury-card overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-40 bg-gold-50 overflow-hidden">
        <img
          src={product.image || '/assets/generated/service-plywood.dim_256x256.png'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => {
            (e.target as HTMLImageElement).src = '/assets/generated/service-plywood.dim_256x256.png';
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[categoryKey] ?? 'bg-gold-100 text-gold-800'}`}>
            {CATEGORY_LABELS[categoryKey] ?? categoryKey}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-foreground text-sm mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-2 line-clamp-2">{product.description}</p>
        <p className="text-xs text-gold-700 font-medium mb-4 line-clamp-2">{product.specifications}</p>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleWhatsAppInquiry}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Enquire
          </button>
          <button
            onClick={isInBasket ? onRemoveFromBasket : onAddToBasket}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              isInBasket
                ? 'bg-gold-500 text-white hover:bg-gold-600'
                : 'border border-gold-300 text-gold-700 hover:bg-gold-50'
            }`}
          >
            {isInBasket ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {isInBasket ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
