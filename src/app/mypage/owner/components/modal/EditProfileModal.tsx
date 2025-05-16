'use client';

import Overlay from '@/components/modal/Overlay';
import { EditProfileModalProps } from '../../../types';
import { Controller, useForm } from 'react-hook-form';
import {
  EditProfileInput,
  editProfileSchema,
} from '@/schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ScrollHiddenDiv } from '../../../styles';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';
import { formattedStoreTel } from '@/utils/formattedStoreTel';
import useChangeProfilePreview from '@/hooks/common/useChangeProfilePreview';
import { useGetMyInfo } from '@/hooks/query/useUser';
import useFormChangeDetector from '../../../hooks/useFormChangeDetector';
import EditProfileSkeleton from './EditProfileSkeleton';
import { openKakaoAddress } from '@/utils/openKakaoAddress';
import { getCoordsByAddress } from '@/utils/getCoordsByAddress';

export default function EditProfileModal({
  showModal,
  setShowModal,
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  });
  const { data: user, isLoading } = useGetMyInfo();

  const { isPreview, setIsPreview, handleImgChange } = useChangeProfilePreview(
    user?.imageUrl || '',
  );

  const watched = watch();

  const { isModified } = useFormChangeDetector({ watched, setValue, user });

  const onSubmit = (data: any) => {};

  return (
    <Overlay $fluid isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='relative w-[100%] pb-[14px] text-black-400 max-h-[calc(100vh_*_(1090/1256))] min-h-[500px] overflow-y-scroll scrollbar-hide'>
        <p className='text-[24px] font-medium max-[768px]:text-[18px]'>
          사장님 정보 관리
        </p>
        {isLoading ? (
          <EditProfileSkeleton />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative inline-block'>
              <label className='inline-block justify-items-center mt-[24px] mb-[24px] cursor-pointer'>
                <Image
                  src={`${
                    isPreview?.length > 0
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
                  className='absolute right-[0] bottom-[28px]'
                />
                <input
                  type='file'
                  accept='image/png'
                  className='hidden'
                  onChange={(e) => handleImgChange(e)}
                />
              </label>
              {isPreview?.length > 0 && (
                <Image
                  src='/images/closePreview.svg'
                  alt='X'
                  width={24}
                  height={24}
                  className='absolute z-[100] top-[24px] left-[0] cursor-pointer'
                  onClick={() => setIsPreview('')}
                />
              )}
            </div>
            <div>
              <p className='text-left mb-[10px]'>
                닉네임{' '}
                <span className='text-orange-300 relative top-[1px]'>*</span>
              </p>
              <input
                type='text'
                defaultValue={user?.nickname}
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
                defaultValue={user?.storeName}
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
                defaultValue={user?.storePhoneNumber}
                inputMode='numeric'
                {...register('storeTel', {
                  onChange: (e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    const formatted = formattedStoreTel(onlyNums);
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
                defaultValue={user?.phoneNumber}
                inputMode='numeric'
                {...register('ownerTel', {
                  onChange: (e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    const formatted = formattedPhoneNumber(onlyNums);
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
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <div
                    className='flex items-center w-full px-[7px] py-[8px] border border-gray-200 border-solid rounded-[8px] text-left cursor-pointer'
                    onClick={() =>
                      openKakaoAddress(async (addr) => {
                        field.onChange(addr);

                        try {
                          const { x, y } = await getCoordsByAddress(addr);
                          setValue('xCoord', x);
                          setValue('yCoord', y);
                        } catch (err) {
                          console.error('📌 좌표 변환 실패:', err);
                        }
                      })
                    }
                  >
                    <Image
                      src='/images/mypage/iconLocation.svg'
                      alt='주소:'
                      width={36}
                      height={36}
                      className='mt-[.5px]'
                    />
                    <p
                      className={`${
                        !field.value && 'text-gray-400'
                      } whitespace-pre-wrap`}
                    >
                      {field.value || '가게 위치를 설정해주세요'}
                    </p>
                  </div>
                )}
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
                disabled={!isValid || !isModified}
              >
                수정하기
              </button>
            </div>
          </form>
        )}
      </ScrollHiddenDiv>
    </Overlay>
  );
}
