'use client';

import Image from 'next/image';
import React from 'react';

interface ToastProps {
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export default function Toast({ children, size = 'sm' }: ToastProps) {
  const containerClass =
    size === 'sm'
      ? 'w-[372px] px-8 justify-start'
      : 'w-[640px] px-[200px] justify-between';

  const contentClass =
    size === 'sm' ? 'justify-start gap-1' : 'justify-between gap-2';

  const textClass = size === 'sm' ? 'text-sm' : 'text-xl';

  const ImageClass = size === 'sm' ? 18 : 22;

  return (
    <div
      className={`relative h-auto py-3 flex items-center bg-primary-blue300 rounded-[8px] ${containerClass}`}
      role='alert'
    >
      <div className={`flex items-center ${contentClass}`}>
        <Image
          src='/images/toast.svg'
          alt='toast'
          width={18}
          height={18}
          className={`align-middle flex ${ImageClass}`}
        />
        <p className={`leading-normal font-semibold text-white ${textClass}`}>
          {children}
        </p>
      </div>
    </div>
  );
}
