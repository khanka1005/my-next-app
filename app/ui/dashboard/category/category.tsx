"use client";

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import styles from './category.module.css';


const categories = [
  { name: "all", label: "Бүгд", icon: "🛒" }, 
  { name: "Угж", label: "Угж", icon: "🍼" },
  { name: "Хаздаг Тоглоом", label: "Хаздаг Тоглоом", icon: "🧸" },
  { name: "Сойз", label: "Сойз", icon: "🪥" },
  { name: "Соск", label: "Соск", icon: "/pacifier.png" } // Updated category for pacifier
];

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());

    if (category !== "all") {
      params.set("cat", category);
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      replace(pathname);
    }
  };

  return (
    <div className={styles.categoryContainer}>
      <ul className={styles.categoryList}>
        {categories.map(({ name, label, icon }) => (
          <li key={name} className={styles.categoryItem}>
            <button
              className={`${styles.categoryButton} ${selectedCategory === name ? styles.selected : ''}`}
              onClick={() => handleCategoryClick(name)}
            >
              {icon.startsWith('/') ? (
                <Image width={15} height={15} src={icon} alt={label} className={styles.icon} />
              ) : (
                <span className={styles.icon}>{icon}</span>
              )}
              <span className={styles.label}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
