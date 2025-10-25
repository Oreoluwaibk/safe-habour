"use client"
import { useEffect, useState } from 'react';
import { IUser, languageType } from '../../utils/interface';
import { allLanguages } from '../../utils/savedInfo';
import { getLanguages } from '@/redux/action/extra';
import { verifyMe } from '@/redux/action/auth';

interface AuthenticationState {
  authentication: IUser | undefined;
  loading: boolean;
  error: string | null;
}

export const useAuthentication = (): AuthenticationState => {
   const [ authentication, setAuthentication ] = useState<IUser>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        handleGetAuthentication();
    }, [])

    const handleGetAuthentication = () => {
        setLoading(true);
        verifyMe()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setAuthentication(res.data.data);
            }
        })
        .catch(err => {
            setLoading(false);
            console.log("err", err);
            setError(err?.response ? err?.response.data : err?.message);
        })
  }

  return { authentication, loading, error };
};
