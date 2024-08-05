"use client";

import React from 'react';
import { MdSearch } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import styles from './searchCard.module.css'; 

interface SearchCardProps {
  placeholder: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (e.target.value) {
      if (e.target.value.length > 2) {
        params.set("q", e.target.value);
        params.set("page", "1");
      }
    } else {
      params.delete("q");
      params.delete("page");
      
      
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch} />
    </div>
  );
};

export default SearchCard;
