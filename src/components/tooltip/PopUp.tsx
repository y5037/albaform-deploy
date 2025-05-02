'use client';

import React from 'react';
import Image from 'next/image';
import CloseButton from '../closebutton/CloseButton';

interface PopUpProps {
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md';
}

export default function PopUp({ children, onClose, size = 'sm' }: PopUpProps) {
  const containerClass =
    size === 'sm' ? 'w-fit py-2 px-3' : 'w-[476px] py-4 px-6';

  const iconSize = size === 'sm' ? 24 : 36;
  const textClass =
    size === 'sm'
      ? 'text-sm font-medium'
      : 'text-xl font-semibold leading-normal';

  return (
    <div
      className={`relative flex justify-between items-center gap-4 rounded-[14px] bg-primary-blue300 ${containerClass}`}
    >
      <div className='flex items-center gap-2'>
        <Image
          src='/images/popup.svg'
          alt='popup'
          width={iconSize}
          height={iconSize}
        />
        <p className={`text-white ${textClass}`}>{children}</p>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
}
