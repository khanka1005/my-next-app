"use client";

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './category.module.css';

const categories = ["all", "kitchen", "computer","Угж", "Хаздаг Тоглоом","Сойз","Соск"];

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());

    if (category !== "all") {
      params.set("cat", category);
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(pathname);
    }
  };

  return (
    <ul className={styles.categoryList}>
      <li className={styles.categoryItem}>
        <button
          className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.selected : ''}`}
          onClick={() => handleCategoryClick('all')}
        >
          Categories {selectedCategory ? '▾' : '▸'}
        </button>
        {selectedCategory && (
          <ul className={styles.subCategoryList}>
            {categories.map((category) => (
              <li key={category} className={styles.subCategoryItem}>
                <button
                  className={`${styles.subCategoryButton} ${selectedCategory === category ? styles.selected : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default Category;
