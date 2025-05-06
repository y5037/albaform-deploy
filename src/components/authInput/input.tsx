import { useState } from 'react';
import Image from 'next/image';

interface InputProps {
  id: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function Input({
  id,
  type = 'text',
  label,
  value,
  onChange,
  placeholder = '',
  className = '',
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='block text-xl font-normal text-black400'>
        {label}
      </label>
      <div className='relative mt-[16px]'>
        <input
          id={id}
          type={isPassword && !showPassword ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border-solid border-gray200 rounded-lg px-[14px] py-4 pr-12 ${className}`}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
            aria-label='비밀번호 보기 토글'
          >
            {showPassword ? (
              <Image
                src='/images/visibility_off.svg'
                alt='password unvisible'
                width={24}
                height={24}
              />
            ) : (
              <Image
                src='/images/visibility_on.svg'
                alt='password visible'
                width={24}
                height={24}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
