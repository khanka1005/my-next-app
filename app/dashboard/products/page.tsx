import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/products/products.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { fetchProducts } from '@/app/lib/data';
import { deleteProduct } from '@/app/lib/action';

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

const ProductsPage: React.FC<ProductsPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a product..." />
          <Link href="/dashboard/products/add">
            <button className={styles.addButton}>Add new</button>
          </Link>
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
                    <Link href={`/dashboard/products/${product.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>View</button>
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id}  />
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                    </form>
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

export default ProductsPage;
