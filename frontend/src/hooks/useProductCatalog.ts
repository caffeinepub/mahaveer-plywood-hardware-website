import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Product, Category } from '@/backend';
import { useMemo } from 'react';

export function useProductCatalog(searchTerm: string, selectedCategory: Category | 'all') {
  const { actor, isFetching } = useActor();

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      // First check localStorage for admin-edited products
      try {
        const stored = localStorage.getItem('adminProducts');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // Fall through to backend
      }

      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.specifications.toLowerCase().includes(term)
      );
    }

    return products;
  }, [allProducts, selectedCategory, searchTerm]);

  return {
    filteredProducts,
    isLoading,
  };
}

