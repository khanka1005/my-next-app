import { useState, useEffect } from 'react';

import { fetchProducts } from '@/app/lib/data';

import { connectToDB } from './utils';

const useProducts = (q, page) => {
  const [data, setData] = useState({ count: 0, products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        connectToDB()
        const result = await fetchProducts(q, page);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [q, page]);

  return { data, loading, error };
};

export default useProducts;