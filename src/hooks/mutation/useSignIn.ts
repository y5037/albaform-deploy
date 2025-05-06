'use client';

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface SignInProps {
  email: string;
  password: string;
}

const signIn = async ({ email, password }: SignInProps) => {
  const response = await instance.post('/auth/sign-in', { email, password });

  const { accessToken, refreshToken } = response.data;

  // 쿠키에 토큰 저장
  Cookies.set('accessToken', accessToken, { path: '/' });
  Cookies.set('refreshToken', refreshToken, { path: '/' });

  return response.data;
};

export const useSignIn = (onSuccess?: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      router.push('/');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
