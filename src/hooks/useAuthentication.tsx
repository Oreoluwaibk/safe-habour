"use client"
import { useEffect, useState } from 'react';
import { IUser } from '../../utils/interface';
import { verifyMe } from '@/redux/action/auth';
import { useAppSelector } from '@/hook';

interface AuthenticationState {
  authentication: IUser | undefined;
  loading: boolean;
  error: string | null;
  handleGetAuthentication: () => void;
}

export const useAuthentication = (): AuthenticationState => {
    const [ authentication, setAuthentication ] = useState<IUser>();
    const { user } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        handleGetAuthentication();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setAuthentication(user);
            setError(err?.response ? err?.response.data : err?.message);
        })
    }

  return { authentication, loading, error, handleGetAuthentication };
};
