import React from 'react';

import { fetchAProducts } from '@/app/lib/data';
import Search from '@/app/ui/dashboard/search/searchCard';
import Scroll from '@/app/scroll/scroll';
import Category from '@/app/ui/dashboard/category/category';
import Container  from '@/app/Container';

import styles from './productView.module.css'; 


interface SearchParams {
  page?: number;
  q?: string;
  cat?: string;
}

interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  createdAt: string;
  stock: number;
  img?: string;
}

interface ProductViewProps {
  searchParams: SearchParams;
}

const ProductView: React.FC<ProductViewProps> = async ({ searchParams }) => {
  const q = searchParams.q || "";
  const page = searchParams.page || 1;
  const cat = searchParams.cat || "all";
  const { count, products } = await fetchAProducts(q, page, cat);
  const serializedProducts = products.map((product) => ({
    ...product,
    createdAt: new Date(product.createdAt).toISOString(),
  }));

  return (
    <div>
       
      <Container>
      <div className="row">
        
        <div>
          <div className={styles.searchContainer}>
            <Search placeholder="Search products..." />
          </div>
          <div className={styles.scrollContainer}>
            <Scroll initialProducts={serializedProducts} initialPage={page} searchQuery={q} initialCategory={cat} />
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default ProductView;
