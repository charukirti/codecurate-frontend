import { rotateToken } from '@/features/auth/api';
import { setAccessToken } from '@/lib/axios';
import { useEffect, useState } from 'react';

export function useInitAuth() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    rotateToken()
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
      })
      .catch(() => {})
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  return isReady;
}
