// components/ProductGrid.js
"use client";
import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import styles from '@/app/components/styles/ProductCarousel.module.css';

const ProductGrid = () => {
  const router = useRouter();

  const handleProductClick = () => {
    router.push('/productView');
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <Image
            className={styles.gridImage}
            src="https://i.pinimg.com/564x/d7/3f/ba/d73fba5266b268ccc519985fa60d2a11.jpg"
            alt="Product 1"
            width={200}
            height={200}
            layout="responsive"
          />
          <h3>Product 1</h3>
        </div>
        <div className={styles.gridItem}>
          <Image
            className={styles.gridImage}
            src="https://i.pinimg.com/564x/7d/92/8b/7d928beb69159278158b7cf3d507fb27.jpg"
            alt="Product 2"
            width={200}
            height={200}
            layout="responsive"
          />
          <h3>Product 2</h3>
        </div>
        <div className={styles.gridItem}>
          <Image
            className={styles.gridImage}
            src="https://i.pinimg.com/474x/1f/6a/a8/1f6aa8983ffee5a48ab2fdf3c8256f46.jpg"
            alt="Product 3"
            width={200}
            height={200}
            layout="responsive"
          />
          <h3>Product 3</h3>
        </div>
        <div className={styles.gridItem}>
          <Image
            className={styles.gridImage}
            src="https://i.pinimg.com/474x/92/fb/ec/92fbec3293407f87ff9b3e3c85286c5e.jpg"
            alt="Product 4"
            width={200}
            height={200}
            layout="responsive"
          />
          <h3>Product 4</h3>
        </div>
        {/* Add more items as needed */}
      </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={handleProductClick}>View All Products</Button>
      </div>
    </div>
  );
};

export default ProductGrid;
