"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { Product } from '@/app/basket/page'; // Adjust the path as necessary

interface BasketContextType {
  basket: Product[];
  quantities: { [key: string]: number };
  addToBasket: (product: Product) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [basket, setBasket] = useSessionStorage<Product[]>('basket', []);
  const [quantities, setQuantities] = useSessionStorage<{ [key: string]: number }>('quantities', {});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToBasket = (product: Product) => {
    setBasket((prevBasket) => [...prevBasket, product]);
    setQuantities((prevQuantities) => ({ ...prevQuantities, [product._id]: 1 }));
  };

  const removeFromBasket = (id: string) => {
    setBasket((prevBasket) => prevBasket.filter(product => product._id !== id));
    setQuantities((prevQuantities) => {
      const { [id]: _, ...rest } = prevQuantities;
      return rest;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: quantity }));
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <BasketContext.Provider value={{ basket, quantities, addToBasket, removeFromBasket, updateQuantity }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
