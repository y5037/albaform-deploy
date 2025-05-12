'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export type InfoFormValues = {
  title: string;
  description: string;
  period: string;
  image: FileList;
};

type Props = {
  onDataChange: (data: InfoFormValues) => void;
};

export default function StepFormInfo({ onDataChange }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<InfoFormValues>({
    mode: 'onChange',
  });

  const title = watch('title');
  const description = watch('description');
  const period = watch('period');
  const image = watch('image');

  useEffect(() => {
    onDataChange({ title, description, period, image });
  }, [title, description, period, image]);

  return (
    <form className='flex flex-col gap-8 min-[1025px]:max-w-[640px]'>
      {/* 제목 */}
      <div>
        <label className='block font-semibold mb-4'>
          알바폼 제목 <span className='text-orange-500'>*</span>
        </label>
        <input
          type='text'
          placeholder='제목을 입력해주세요.'
          {...register('title', { required: true })}
          className='w-full bg-[var(--background200)] border rounded-[8px] p-[14px] pb-[12px]'
        />
      </div>

      {/* 소개글 */}
      <div>
        <label className='block font-semibold mb-4'>
          소개글 <span className='text-orange-500'>*</span>
        </label>
        <textarea
          placeholder='최대 200자까지 입력 가능합니다.'
          maxLength={200}
          {...register('description', { required: true })}
          className='w-full bg-[var(--background200)] border rounded-[8px] p-[14px] h-40 resize-none'
        />
      </div>

      {/* 모집 기간 */}
      <div>
        <label className='block font-semibold mb-4'>
          모집 기간 <span className='text-orange-500'>*</span>
        </label>
        <input
          type='text'
          placeholder='시작일 ~ 종료일'
          {...register('period', { required: true })}
          className='w-full bg-[var(--background200)] border rounded-[8px] p-[14px] pb-[12px]'
        />
      </div>

      {/* 이미지 첨부 */}
      <div>
        <label className='block font-semibold mb-4'>이미지 첨부</label>
        <input
          type='file'
          accept='image/*'
          {...register('image')}
          className='w-full bg-[var(--background200)] border rounded-[8px] p-[14px] pb-[12px]'
        />
      </div>
    </form>
  );
}
