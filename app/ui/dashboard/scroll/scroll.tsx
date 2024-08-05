"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

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

  return (
    <div className="row">
      {products.map((product, index) => (
        <div className="col-12 col-md-6 mb-4" key={product._id} ref={index === products.length - 1 ? lastProductElementRef : null}>
          <div className="card" style={{ width: '18rem' }}>
            <Image className="card-img-top" src={product.img || "/noproduct.jpg"} alt={product.title} width={288} height={180} style={{ objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.desc}</p>
              <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
              <p className="card-text"><small className="text-muted">Created at: {new Date(product.createdAt).toString().slice(4, 16)}</small></p>
              <a href="#" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      ))}

      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {!hasMore && !loading && <div>No more products to show.</div>}
    </div>
  );
};

export default Scroll;
