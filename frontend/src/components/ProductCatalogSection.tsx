import { useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';
import InquiryBasket from './InquiryBasket';
import { useProductCatalog } from '../hooks/useProductCatalog';
import { useInquiryBasket } from '../hooks/useInquiryBasket';
import { Category } from '../backend';

const categories = [
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
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBasket, setShowBasket] = useState(false);

  const { filteredProducts, isLoading } = useProductCatalog(searchQuery, selectedCategory);
  const { basket, addToBasket, removeFromBasket, clearBasket } = useInquiryBasket();

  return (
    <section id="catalog" className="py-16 sm:py-20 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Product Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Browse Our Products
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto">
            Explore our wide range of premium interior products and materials.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[44px]"
            />
          </div>

          {/* Category Filters - horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as Category | 'all')}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[36px] whitespace-nowrap ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border text-foreground/70 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Basket Toggle Button */}
        {basket.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowBasket(!showBasket)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              Inquiry Basket ({basket.length})
            </button>
          </div>
        )}

        {/* Inquiry Basket */}
        {showBasket && basket.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <InquiryBasket
              basket={basket}
              onRemove={removeFromBasket}
              onClear={clearBasket}
              onClose={() => setShowBasket(false)}
            />
          </div>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                <div className="w-full h-36 sm:h-40 bg-secondary rounded-xl mb-4" />
                <div className="h-4 bg-secondary rounded mb-2" />
                <div className="h-3 bg-secondary rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-foreground/50 text-base sm:text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onAddToBasket={() => addToBasket(product.name)}
                isInBasket={basket.includes(product.name)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
