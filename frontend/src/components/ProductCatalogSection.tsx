import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { useProductCatalog } from '../hooks/useProductCatalog';
import { useInquiryBasket } from '../hooks/useInquiryBasket';
import ProductCard from './ProductCard';
import InquiryBasket from './InquiryBasket';
import { Category } from '../backend';

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: Category.plywood, label: 'Plywood' },
  { value: Category.hardware, label: 'Hardware' },
  { value: Category.laminates, label: 'Laminates' },
  { value: Category.kitchen, label: 'Kitchen' },
  { value: Category.wardrobe, label: 'Wardrobe' },
  { value: Category.electricals, label: 'Electricals' },
  { value: Category.paints, label: 'Paints' },
];

export default function ProductCatalogSection() {
  const {
    filteredProducts,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProductCatalog();

  const { basket, addToBasket, removeFromBasket, clearBasket, isInBasket } = useInquiryBasket();

  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-300 mb-4">
            <span className="text-gold-700 text-sm font-semibold tracking-wide uppercase">Browse & Enquire</span>
          </div>
          <h2 className="section-title">Product Catalog</h2>
          <p className="section-subtitle">
            Explore our extensive range of premium building materials and interior products
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm"
            />
          </div>

          {/* Basket Indicator */}
          {basket.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gold-50 border border-gold-300">
              <ShoppingBag className="h-5 w-5 text-gold-600" />
              <span className="text-gold-700 font-semibold text-sm">{basket.length} item{basket.length > 1 ? 's' : ''} in basket</span>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'btn-gold shadow-gold'
                  : 'bg-white border border-gold-200 text-foreground/70 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="luxury-card h-72 animate-pulse bg-gold-50" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.name}
                product={product}
                isInBasket={isInBasket(product.name)}
                onAddToBasket={() => addToBasket(product.name)}
                onRemoveFromBasket={() => removeFromBasket(product.name)}
              />
            ))}
          </div>
        )}

        {/* Inquiry Basket */}
        {basket.length > 0 && (
          <InquiryBasket
            basket={basket}
            onRemove={removeFromBasket}
            onClear={clearBasket}
          />
        )}
      </div>
    </section>
  );
}
