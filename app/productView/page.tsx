// ProductView.tsx
import React from 'react';

import { fetchAProducts } from '@/app/lib/data';
import Search from '@/app/ui/dashboard/search/searchCard';
import Scroll from '@/app/ui/dashboard/scroll/scroll';
import Category from '@/app/ui/dashboard/category/category';

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
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Category />
        </div>
        <div className="col-md-9"> 

        
        <Search placeholder="Search products..." />
     

          <Scroll initialProducts={serializedProducts} initialPage={page} searchQuery={q} initialCategory={cat} />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
