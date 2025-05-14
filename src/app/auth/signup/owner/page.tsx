'use client';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useSignUp } from '@/hooks/mutation/useSignUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, SignUpInput } from '@/schemas/signupSchema';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
  });

  const { mutate, isPending, error } = useSignUp();

  const onSubmit = (data: SignUpInput) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] mx-auto py-[200px]'
    >
      <div className='flex flex-col items-center'>
        <p className='font-semibold text-3xl mb-[32px]'>회원가입</p>
      </div>
    </form>
  );
}
