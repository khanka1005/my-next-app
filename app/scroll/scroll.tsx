"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useBasket } from '@/app/context/BasketContext';

import ProductCard from '../cards/ProductCard';

export interface Product {

  _id: string;
  title: string;
  desc: string;
  price: number;
  createdAt: string;
  stock: number;
  img?: string;
  
}

interface ScrollProps {
  initialProducts: Product[];
  initialPage: number;
  searchQuery: string;
  initialCategory: string;
}

const Scroll: React.FC<ScrollProps> = ({ initialProducts, initialPage, searchQuery, initialCategory }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const { addToBasket, basket } = useBasket();
  const [addedToBasket, setAddedToBasket] = useState<Set<string>>(new Set());

  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/route?${new URLSearchParams({ q: searchQuery, page: (page + 1).toString(), cat: initialCategory })}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedProducts = data.products;

      setProducts(prev => {
        const newProducts = [...prev, ...fetchedProducts];
        const uniqueProducts = Array.from(new Map(newProducts.map(p => [p._id, p])).values());
        return uniqueProducts;
      });

      setPage(prev => prev + 1);
      setHasMore(fetchedProducts.length > 0);
    } catch (error) {
      console.error('Failed to fetch more products:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchQuery, initialCategory, page]);

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMoreData]
  );

  useEffect(() => {
    setProducts(initialProducts);
    setPage(initialPage);
    setHasMore(true);
  }, [initialProducts, initialPage, searchQuery, initialCategory]);

  useEffect(() => {
    const savedAddedToBasket = new Set<string>(JSON.parse(localStorage.getItem('addedToBasket') || '[]') as string[]);
    setAddedToBasket(savedAddedToBasket);
  }, []);

  useEffect(() => {
    const updatedSet = new Set(basket.map((product: Product) => product._id));
    setAddedToBasket(updatedSet);
    localStorage.setItem('addedToBasket', JSON.stringify(Array.from(updatedSet)));
  }, [basket]);

  const handleAddToBasket = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!addedToBasket.has(product._id)) {
      addToBasket(product);
      setAddedToBasket(prev => {
        const updatedSet = new Set(prev).add(product._id);
        localStorage.setItem('addedToBasket', JSON.stringify(Array.from(updatedSet)));
        return updatedSet;
      });
    }
  };

  return (
    <div className="row">
      {products.map((product, index) => (
        <div
          key={product._id}
          className="col-12 col-md-4 col-lg-3 mb-4" 
          ref={index === products.length - 1 ? lastProductElementRef : null}
        >
          <ProductCard
            product={product}
            onAddToBasket={handleAddToBasket}
            addedToBasket={addedToBasket.has(product._id)}
          />
        </div>
      ))}
      {!hasMore && !loading && <div>No more products to show.</div>}
    </div>
  );
};

export default Scroll;
