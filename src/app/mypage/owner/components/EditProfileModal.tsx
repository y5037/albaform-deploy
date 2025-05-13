'use client';

import Overlay from '@/components/modal/Overlay';
import { EditProfileModalProps } from '../../types';
import { useForm } from 'react-hook-form';
import {
  EditProfileInput,
  editProfileSchema,
} from '@/schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ScrollHiddenDiv } from '../../styles';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { formatStoreTel } from '@/utils/formatStoreTel';
import { ChangeEvent, useState } from 'react';
import useChangeProfilePreview from '@/utils/useChangeProfilePreview';

export default function EditProfileModal({
  showModal,
  setShowModal,
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {};

  const { isPreview, handleImgChange } = useChangeProfilePreview();

  return (
    <Overlay $fluid isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='w-[100%] pb-[14px] text-black-400 max-h-[calc(100vh_*_(1090/1256))] overflow-y-scroll scrollbar-hide'>
        <p className='text-[24px] font-medium max-[768px]:text-[18px]'>
          사장님 정보 관리
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='relative inline-block justify-items-center mt-[24px] mb-[24px] cursor-pointer'>
            <Image
              src={`${
                isPreview.length > 0
                  ? isPreview
                  : '/images/mypage/editProfileImg.svg'
              }`}
              alt='기본 이미지'
              width={80}
              height={80}
              className='rounded-[50%] overflow-hidden'
            />
            <Image
              src='/images/mypage/iconEditImg.svg'
              alt='이미지 수정'
              width={24}
              height={24}
              className='absolute right-[0] bottom-[0]'
            />
            <input
              type='file'
              accept='image/png'
              className='hidden'
              onChange={(e) => handleImgChange(e)}
            />
          </label>
          <div>
            <p className='text-left mb-[10px]'>
              닉네임{' '}
              <span className='text-orange-300 relative top-[1px]'>*</span>
            </p>
            <input
              type='text'
              {...register('nickname')}
              placeholder='닉네임을 입력해주세요'
              className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
            />
            {errors.nickname && (
              <p className='text-left mt-[10px] text-red'>
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div>
            <p className='text-left mt-[15px] mb-[10px]'>
              가게 이름{' '}
              <span className='text-orange-300 relative top-[1px]'>*</span>
            </p>
            <input
              type='text'
              {...register('store')}
              placeholder='가게 이름(상호명)을 입력해주세요'
              className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
            />
            {errors.store && (
              <p className='text-left mt-[10px] text-red'>
                {errors.store.message}
              </p>
            )}
          </div>
          <div>
            <p className='text-left mt-[15px] mb-[10px]'>
              가게 전화번호{' '}
              <span className='text-orange-300 relative top-[1px]'>*</span>
            </p>
            <input
              type='tel'
              inputMode='numeric'
              {...register('storeTel', {
                onChange: (e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  const formatted = formatStoreTel(onlyNums);
                  setValue('storeTel', formatted, { shouldValidate: true });
                },
              })}
              placeholder='가게 전화번호를 입력해주세요'
              className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
            />
            {errors.storeTel && (
              <p className='text-left mt-[10px] text-red'>
                {errors.storeTel.message}
              </p>
            )}
          </div>
          <div>
            <p className='text-left mt-[15px] mb-[10px]'>사장님 전화번호</p>
            <input
              type='tel'
              inputMode='numeric'
              {...register('ownerTel', {
                onChange: (e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  const formatted = formatPhoneNumber(onlyNums);
                  setValue('ownerTel', formatted, { shouldValidate: true });
                },
              })}
              placeholder='사장님 전화번호를 입력해주세요'
              className='w-[100%] p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray-400'
            />
          </div>
          <div>
            <p className='text-left mt-[15px] mb-[10px]'>
              가게 위치{' '}
              <span className='text-orange-300 relative top-[1px]'>*</span>
            </p>
            <input
              type='address'
              {...register('address')}
              placeholder='가게 위치를 설정해주세요'
              className='w-[100%] cursor-pointer p-[14px] border border-gray-200 border-solid rounded-[8px] pladeholer-gray400'
              readOnly
            />
            {errors.address && (
              <p className='text-left mt-[10px] text-red'>
                {errors.address.message}
              </p>
            )}
          </div>
          <div className='flex items-center justify-center mt-[24px]'>
            <button
              type='button'
              onClick={() => setShowModal(false)}
              className='mr-[10px] flex-[1] pt-[20px] pb-[20px] text-white bg-gray-200 rounded-[8px]'
            >
              취소
            </button>
            <button
              type='submit'
              className='flex-[1] pt-[20px] pb-[20px] text-white bg-primary-orange300 rounded-[8px] disabled:bg-gray-400 disabled:cursor-not-allowed'
              disabled={!isValid}
            >
              수정하기
            </button>
          </div>
        </form>
      </ScrollHiddenDiv>
    </Overlay>
  );
}
