'use client';

import Link from 'next/link';
import Input from '@/components/authInput/input';
import AuthButton from '@/components/authButton/authButton';
import { useSignIn } from '@/hooks/mutation/useSignIn';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useSignIn();

  {
    error && <p className='text-red-500 mt-2'>{error.message}</p>;
  }

  return (
    <div className='max-w-[640px] mx-auto py-[200px]'>
      <div className='flex flex-col items-center'>
        <p className='font-semibold text-3xl mb-[32px]'>로그인</p>
        <div className='flex gap-1 flex-col items-center text-[20px] text-black100'>
          <p>
            아직 계정이 없으신가요?
            <Link
              href='/signup/admin'
              className='inline underline ml-1 text-black'
            >
              회원가입 하기
            </Link>
          </p>
          <p>사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.</p>
        </div>
      </div>
      <div className='flex flex-col gap-[32px] mt-[60px] mb-[52px]'>
        <Input
          id='email'
          label='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='이메일을 입력하세요'
        />
        <Input
          id='password'
          type='password'
          label='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력하세요'
        />
      </div>
      <AuthButton onClick={() => mutate({ email, password })}>
        {isPending ? '로그인 중...' : '로그인'}
      </AuthButton>
    </div>
  );
}
