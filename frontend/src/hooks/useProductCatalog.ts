import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product } from '../backend';
import { Category } from '../backend';

const DEFAULT_PRODUCTS: Product[] = [
  {
    name: 'BWR Grade Plywood 18mm',
    category: Category.plywood,
    description: 'Boiling Water Resistant plywood, ideal for kitchens and bathrooms. ISI marked for quality assurance.',
    specifications: 'Size: 8x4 ft | Thickness: 18mm | Grade: BWR | Brand: Century/Greenply',
    image: '/assets/generated/service-plywood.dim_256x256.png',
  },
  {
    name: 'Marine Plywood 12mm',
    category: Category.plywood,
    description: 'Premium marine grade plywood for high moisture areas. Excellent durability and strength.',
    specifications: 'Size: 8x4 ft | Thickness: 12mm | Grade: Marine | Brand: Kitply',
    image: '/assets/generated/service-plywood.dim_256x256.png',
  },
  {
    name: 'Concealed Door Hinges',
    category: Category.hardware,
    description: 'European style soft-close concealed hinges for cabinet doors. Smooth operation guaranteed.',
    specifications: 'Type: Soft-close | Opening: 110° | Material: Zinc alloy | Brand: Hettich/Hafele',
    image: '/assets/generated/service-hardware.dim_256x256.png',
  },
  {
    name: 'Drawer Channel Slides',
    category: Category.hardware,
    description: 'Full extension ball bearing drawer slides for smooth and silent operation.',
    specifications: 'Length: 18"/24" | Load: 40kg | Type: Full extension | Brand: Hettich',
    image: '/assets/generated/service-hardware.dim_256x256.png',
  },
  {
    name: 'Sunmica Laminate Sheet',
    category: Category.laminates,
    description: 'High pressure decorative laminate sheets in 300+ designs. Scratch and heat resistant.',
    specifications: 'Size: 8x4 ft | Thickness: 1mm | Finish: Matte/Gloss | Brand: Merino/Greenlam',
    image: '/assets/generated/service-laminates.dim_256x256.png',
  },
  {
    name: 'Acrylic Laminate Sheet',
    category: Category.laminates,
    description: 'Premium acrylic finish laminate for a glossy, mirror-like appearance on furniture.',
    specifications: 'Size: 8x4 ft | Thickness: 1.2mm | Finish: High Gloss | Brand: Durian',
    image: '/assets/generated/service-laminates.dim_256x256.png',
  },
  {
    name: 'Modular Kitchen Cabinet',
    category: Category.kitchen,
    description: 'Complete modular kitchen cabinet unit with soft-close hinges and drawer channels.',
    specifications: 'Material: BWR Plywood | Finish: Acrylic | Hardware: Hettich | Custom sizes',
    image: '/assets/generated/service-kitchen.dim_256x256.png',
  },
  {
    name: 'Kitchen Countertop',
    category: Category.kitchen,
    description: 'Granite and quartz countertops for kitchen. Durable, hygienic and easy to maintain.',
    specifications: 'Material: Granite/Quartz | Thickness: 20mm | Edge: Bullnose | Custom cut',
    image: '/assets/generated/service-kitchen.dim_256x256.png',
  },
  {
    name: 'Sliding Wardrobe',
    category: Category.wardrobe,
    description: 'Space-saving sliding door wardrobe with mirror panels and internal organizers.',
    specifications: 'Material: BWR Plywood | Doors: Sliding | Mirror: Optional | Custom sizes',
    image: '/assets/generated/service-wardrobe.dim_256x256.png',
  },
  {
    name: 'Walk-in Wardrobe System',
    category: Category.wardrobe,
    description: 'Luxury walk-in wardrobe with dedicated sections for clothes, shoes, and accessories.',
    specifications: 'Material: MDF/Plywood | Finish: Lacquer | Lighting: LED | Custom design',
    image: '/assets/generated/service-wardrobe.dim_256x256.png',
  },
  {
    name: 'Modular Switches & Sockets',
    category: Category.electricals,
    description: 'Premium modular electrical switches and sockets. Safe, stylish and durable.',
    specifications: 'Type: Modular | Rating: 6A/16A | Brand: Legrand/Havells | Multiple finishes',
    image: '/assets/generated/service-hardware.dim_256x256.png',
  },
  {
    name: 'LED Strip Lighting',
    category: Category.electricals,
    description: 'Flexible LED strip lights for under-cabinet, cove, and accent lighting.',
    specifications: 'Type: LED Strip | Color: Warm/Cool/RGB | IP Rating: IP20/IP65 | 5m roll',
    image: '/assets/generated/service-hardware.dim_256x256.png',
  },
  {
    name: 'Asian Paints Royale',
    category: Category.paints,
    description: 'Premium interior emulsion paint with smooth finish and excellent coverage.',
    specifications: 'Type: Interior Emulsion | Finish: Smooth | Coverage: 120 sq ft/L | 1000+ shades',
    image: '/assets/generated/service-laminates.dim_256x256.png',
  },
  {
    name: 'Texture Paint',
    category: Category.paints,
    description: 'Decorative texture paint for feature walls. Creates unique patterns and depth.',
    specifications: 'Type: Texture | Finish: Various | Coverage: 40-60 sq ft/L | Custom designs',
    image: '/assets/generated/service-laminates.dim_256x256.png',
  },
];

export function useProductCatalog() {
  const { actor, isFetching } = useActor();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: products = DEFAULT_PRODUCTS, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return DEFAULT_PRODUCTS;
      try {
        const result = await actor.getAllProducts();
        return result.length > 0 ? result : DEFAULT_PRODUCTS;
      } catch {
        return DEFAULT_PRODUCTS;
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.specifications.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [products, selectedCategory, searchTerm]);

  return {
    products,
    filteredProducts,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
}
