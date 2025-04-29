'use client';

import React from 'react';
import Image from 'next/image';
import CloseButton from '../closebutton/CloseButton';

interface TooltipProps {
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md';
}

export default function Tooltip({
  children,
  onClose,
  size = 'sm',
}: TooltipProps) {
  const containerClass =
    size === 'sm' ? 'w-fit py-2 px-3' : 'w-[476px] py-4 px-6';

  const iconSize = size === 'sm' ? 24 : 36;
  const textClass =
    size === 'sm'
      ? 'text-sm font-medium'
      : 'text-xl font-semibold leading-normal';

  return (
    <div
      className={`relative flex justify-between items-center gap-4 rounded-[8px] bg-primary-blue300 ${containerClass}`}
    >
      {/* 말풍선모양 */}
      <div className='w-0 h-0 border-x-8 border-x-transparent border-b-[10px] border-b-primary-blue300' />
      <div className='flex items-center gap-2'>
        <Image
          src='/images/tooltip.svg'
          alt='tooltip'
          width={iconSize}
          height={iconSize}
        />
        <p className={textClass}>{children}</p>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
}
