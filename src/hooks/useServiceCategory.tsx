"use client"
import { useEffect, useState } from 'react';
import { categoryType } from '../../utils/interface';
import { savedCategory } from '../../utils/savedInfo';
import { getServiceCategories } from '@/redux/action/extra';

interface categoryState {
  categories: categoryType[];
  loading: boolean;
  error: string | null;
}

export const useServiceCategory = (): categoryState => {
  const [ categories, setCategories ] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetCategories();
  }, [])

  const handleGetCategories = () => {
    setLoading(true);
    getServiceCategories()
    .then(res => {
        if(res.status === 200) {
          setLoading(false);
          setCategories(res.data.data);
        }
    })
    .catch(err => {
        setLoading(false);
        setCategories(savedCategory);
        setError(err?.response ? err?.response.data : err?.message);
    })
  }

  return { categories, loading, error };
};
