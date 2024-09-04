"use client";

import React, { Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './searchCard.module.css';

const { Search } = Input;

interface SearchCardProps {
  placeholder: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ placeholder }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      if (value.length > 0) {
        params.set("q", value);
      }
    } else {
      params.delete("q");
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`,{ scroll: false });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <Suspense>
      <div className={styles.searchContainer}>
        <Tooltip title="Search">
          <Input
            placeholder={placeholder}
            onChange={handleInputChange}
            size="large"
            className={styles.searchInput}
          />
        </Tooltip>
      </div>
    </Suspense>
  );
};

export default SearchCard;