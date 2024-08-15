"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FaShoppingBasket } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { useBasket } from '@/app/context/BasketContext';

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
  const { addToBasket, removeFromBasket, basket } = useBasket();
  const router = useRouter();

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
      if (loading) return;
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

  // Load added to basket products from localStorage
  useEffect(() => {
    const savedAddedToBasket = new Set<string>(JSON.parse(localStorage.getItem('addedToBasket') || '[]') as string[]);
    setAddedToBasket(savedAddedToBasket);
  }, []);

  useEffect(() => {
    // Sync with basket changes
    const updatedSet = new Set(basket.map((product: Product) => product._id));
    setAddedToBasket(updatedSet);
    // Save to localStorage
    localStorage.setItem('addedToBasket', JSON.stringify(Array.from(updatedSet)));
  }, [basket]);

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToBasket = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!addedToBasket.has(product._id)) {
      addToBasket(product);
      setAddedToBasket(prev => {
        const updatedSet = new Set(prev).add(product._id);
        // Save to localStorage
        localStorage.setItem('addedToBasket', JSON.stringify(Array.from(updatedSet)));
        return updatedSet;
      });
    }
  };

  const [addedToBasket, setAddedToBasket] = useState<Set<string>>(new Set());

  return (
    <div className="row">
  {products.map((product, index) => (
    <div
      key={product._id}
      className={`col-12 col-md-6 mb-4 ${index % 2 === 0 ? '' : ''}`} // No additional margin adjustments here
      ref={index === products.length - 1 ? lastProductElementRef : null} // Add ref only to the last card
    >
      <div
        className="card"
        style={{
          width: '25rem',
          borderRadius: '15px',
          overflow: 'hidden',
          cursor: 'pointer',
          margin: '0 auto', // Ensure that the card is centered in the row
        }}
        onClick={() => handleCardClick(product._id)}
      >
        <Image
          className="card-img-top"
          src={product.img || "/noproduct.jpg"}
          alt={product.title}
          width={350}
          height={350}
          style={{ objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{product.title}</h5>
          <p className="card-text" style={{ color: '#6c757d' }}>{product.desc}</p>
          <p className="card-text" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₮{product.price}</p>
          <p className="card-text">Stock: {product.stock}</p>
          <hr />
          <button
            className="btn btn-success"
            style={{
              borderRadius: '30px',
              width: '70%',
              backgroundColor: 'green',
            }}
            onClick={(e) => handleAddToBasket(product, e)}
            disabled={addedToBasket.has(product._id)}
          >
            <FaShoppingBasket size={20} /> {addedToBasket.has(product._id) ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  ))}
  {products.length % 2 !== 0 && <div className="col-12 col-md-6 mb-4"></div>} 



      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {!hasMore && !loading && <div>No more products to show.</div>}
    </div>
  );
};

export default Scroll;
