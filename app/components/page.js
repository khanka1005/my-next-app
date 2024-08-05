// app/components/MainProductsPage.js
'use client'; // Ensure this is client-side code

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '@/app/productView/productView.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

const MainProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
      setCount(data.count);
      setLoading(false);
    };

    getProducts();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    const response = await fetch(`/api/products?q=${query}`);
    const data = await response.json();
    setProducts(data.products);
    setCount(data.count);
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a product..." onSearch={handleSearch} />
        </div>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Price</td>
                <td>Created at</td>
                <td>Stock</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.product}>
                      <Image
                        src={product.img || "/noproduct.jpg"}
                        alt={product.title}
                        width={40}
                        height={40}
                        className={styles.productImage}
                      />
                      {product.title}
                    </div>
                  </td>
                  <td>{product.desc}</td>
                  <td>{product.price}</td>
                  <td>{product.createdAt?.toString().slice(4, 16)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className={styles.buttons}>
                      {/* Add buttons as needed */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination count={count} />
      </div>
      <div className={styles.body}>Hello</div>
    </div>
  );
};

export default MainProductsPage;
