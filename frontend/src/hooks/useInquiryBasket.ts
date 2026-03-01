import { useState } from 'react';

export function useInquiryBasket() {
  const [basket, setBasket] = useState<string[]>([]);

  const addToBasket = (productName: string) => {
    setBasket(prev => {
      if (prev.includes(productName)) return prev;
      return [...prev, productName];
    });
  };

  const removeFromBasket = (productName: string) => {
    setBasket(prev => prev.filter(name => name !== productName));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const isInBasket = (productName: string) => basket.includes(productName);

  return { basket, addToBasket, removeFromBasket, clearBasket, isInBasket };
}
