"use client"
import { useEffect, useState } from 'react';
import { languageType } from '../../utils/interface';
import { allLanguages } from '../../utils/savedInfo';
import { getLanguages } from '@/redux/action/extra';

interface LanguageState {
  languages: languageType[];
  loading: boolean;
  error: string | null;
//   handleGetLanguages: () => Promise<void>;
}

export const useLanguage = (): LanguageState => {
   const [ languages, setLanguages ] = useState<languageType[]>(allLanguages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetLanguages();
  }, [])

  const handleGetLanguages = () => {
    setLoading(true);
    getLanguages()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setLanguages(res.data);
      }
    })
    .catch(err => {
      setLoading(false);
      setError(err?.response ? err?.response.data : err?.message);
    })
  }

  return { languages, loading, error };
};
