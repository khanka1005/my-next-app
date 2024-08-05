// Category.tsx
"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const categories = ["all", "kitchen", "computer", "toy"];

const Category: React.FC = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category !== "all") {
      params.set("cat", category);
      // Reset to page 1 when category changes
      replace(`${pathname}?${params.toString()}`);
    } else {
       replace(pathname);
    }
  };

  return (
    <div>
      <h5>Categories</h5>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => handleCategoryClick(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
