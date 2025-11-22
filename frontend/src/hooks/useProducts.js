import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAll(filters);
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  const refetch = async () => {
    try {
      const data = await productApi.getAll(filters);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return { products, loading, error, refetch };
};