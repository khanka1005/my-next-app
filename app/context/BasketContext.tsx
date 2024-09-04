"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { Product } from '@/app/basket/page'; 

interface BasketContextType {
  basket: Product[];
  quantities: { [key: string]: number };
  addToBasket: (product: Product) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, quantity: number | string) => void;
  clearBasket: () => void; 
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
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find(p => p._id === product._id);
      if (existingProduct) {
        return prevBasket.map(p => 
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prevBasket, { ...product, quantity: 1 }];
    });
    setQuantities((prevQuantities) => ({ 
      ...prevQuantities, 
      [product._id]: (prevQuantities[product._id] || 0) + 1 
    }));
  };

  const removeFromBasket = (id: string) => {
    setBasket((prevBasket) => prevBasket.filter(product => product._id !== id));
    setQuantities((prevQuantities) => {
      const { [id]: _, ...rest } = prevQuantities;
      return rest;
    });
  };

  const updateQuantity = (id: string, quantity: number | string) => {
    const newQuantity = Math.max(1, Number(quantity) || 1);
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: newQuantity }));
    setBasket((prevBasket) => 
      prevBasket.map(product => 
        product._id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const clearBasket = () => {
    setBasket([]);
    setQuantities({});
  };

  if (!isClient) {
    return null; 
  }

  return (
    <BasketContext.Provider value={{ basket, quantities, addToBasket, removeFromBasket, updateQuantity, clearBasket }}>
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