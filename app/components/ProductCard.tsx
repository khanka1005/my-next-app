// components/ProductCard.tsx
"use client"
import React from 'react';
import Image from 'next/image';

import { Product } from '@/app/lib/models';

interface Product {
  id: string;
  title: string;
  desc: string;
  price: number;
  createdAt: Date;
  stock: number;
  img?: string;
}interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps>= ({ product }) => {
  return (
    <div className="card mb-4" style={{ width: '18rem' }}>
      <Image
        src={product.img || '/noproduct.jpg'}
        alt={product.title}
        width={286}
        height={180}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.desc}</p>
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text">Stock: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductCard;
