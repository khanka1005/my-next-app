"use client"
import React from 'react';
import styles from './pagination.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1");
  const params = new URLSearchParams(searchParams.toString());
  const ITEM_PER_PAGE = 2;

  const hasPrev = page > 1;
  const hasNext = ITEM_PER_PAGE * page < count;

  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev") {
      params.set("page", (page - 1).toString());
    } else {
      params.set("page", (page + 1).toString());
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>
        Previous
      </button>
      <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
