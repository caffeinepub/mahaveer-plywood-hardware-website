import { useState } from 'react';
import { toast } from 'sonner';

export function useInquiryBasket() {
  const [basket, setBasket] = useState<string[]>([]);

  const addToBasket = (productName: string) => {
    if (!basket.includes(productName)) {
      setBasket([...basket, productName]);
      toast.success('Added to enquiry list');
    }
  };

  const removeFromBasket = (productName: string) => {
    setBasket(basket.filter((item) => item !== productName));
    toast.success('Removed from enquiry list');
  };

  const clearBasket = () => {
    setBasket([]);
    toast.success('Enquiry list cleared');
  };

  return {
    basket,
    addToBasket,
    removeFromBasket,
    clearBasket,
  };
}
