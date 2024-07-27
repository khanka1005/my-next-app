import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/app/productView/productView.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { fetchProducts } from '@/app/lib/data';


interface SearchParams {
  page: number;
  q?: string;
}

interface Product {
  id: string;
  title: string;
  desc: string;
  price: number;
  createdAt: Date;
  stock: number;
  img?: string;
}

interface ProductsPageProps {
  searchParams: SearchParams;
}

const MainProductsPage: React.FC<ProductsPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  return (
      <div className={styles.wrapper}>
      
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a product..." />
        </div>
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
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.product}>
                    <Image
                      src={product.img || "/noproduct.jpg"}
                      alt=""
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
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
      
   
    
    </div>
  );
};

export default MainProductsPage
