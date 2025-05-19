'use client';

import Overlay from '@/components/modal/Overlay';
import { EditProfileModalProps } from '../../../types';
import { useForm } from 'react-hook-form';
import {
  EditProfileInput,
  ownerProfileSchema,
} from '@/schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ScrollHiddenDiv } from '../../../styles';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';
import { formattedStoreTel } from '@/utils/formattedStoreTel';
import useChangeProfilePreview from '@/hooks/common/useChangeProfilePreview';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import useFormChangeDetector from '../../../hooks/useFormChangeDetector';
import EditProfileSkeleton from './EditProfileSkeleton';
import Address from '@/components/controller/Address';
import useInitializeUserForm from '@/app/mypage/hooks/useInitializeUserForm';
import { useState } from 'react';
import { useUploadImage } from '@/hooks/mutation/useUploadImage';
import { useEditUser } from '@/hooks/mutation/useEditUser';
import { useQueryClient } from '@tanstack/react-query';

export default function EditProfileModal({
  showModal,
  setShowModal,
}: EditProfileModalProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const { data: user, isLoading } = useGetMyInfo();
  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadImage();
  const { mutate: patchEditUser, isPending: isPatchingUser } = useEditUser();

  const isPending = isUploadingImage || isPatchingUser;

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { isValid, errors },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(ownerProfileSchema),
    mode: 'onChange',
    defaultValues: {
      imageUrl: '',
      nickname: '',
      store: '',
      storeTel: '',
      phoneNumber: '',
      address: '',
    },
  });
  const watched = watch();

  useInitializeUserForm({ user, setValue });

  const { isPreview, setIsPreview, handleImgChange } = useChangeProfilePreview(
    user?.imageUrl || '',
  );

  const { isModified: isFormModified } = useFormChangeDetector({
    watched,
    setValue,
    user,
  });

  const isModified =
    isFormModified || !!selectedImageFile || !!watch('imageUrl');

  const onSubmit = async (formData: EditProfileInput) => {
    let imageUrl;

    if (selectedImageFile) {
      imageUrl = await uploadImage(selectedImageFile);
    } else if (isPreview === '') {
      imageUrl = '';
    } else {
      imageUrl = user?.imageUrl || '';
    }

    const payload = {
      ...formData,
      imageUrl,
    };

    const refetchUserInfo = async () => {
      const keysToInvalidate = [['myInfo'], ['myPosts']];

      await Promise.all(
        keysToInvalidate.map((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        }),
      );
    };

    patchEditUser(payload, {
      onSuccess: () => {
        setShowModal(false);
        refetchUserInfo();
      },
    });
  };

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
            <fieldset
              disabled={isPending}
              className={`${isPending ? 'pointer-events-none' : ''}`}
            >
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
                    className='rounded-[50%] overflow-hidden object-cover min-h-[80px]'
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
                    accept='image/png, image/jpg'
                    className='hidden'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleImgChange(e);
                      setSelectedImageFile(file!);
                      setValue('imageUrl', file ? file.name : '', {
                        shouldDirty: true,
                      });
                      trigger('imageUrl');
                    }}
                  />
                </label>
                {isPreview?.length > 0 && (
                  <Image
                    src='/images/closePreview.svg'
                    alt='X'
                    width={24}
                    height={24}
                    className='absolute z-[100] top-[24px] left-[0] cursor-pointer'
                    onClick={() => {
                      setIsPreview('');
                      setSelectedImageFile(null);
                      setValue('imageUrl', '', {
                        shouldDirty: true,
                      });
                      trigger('imageUrl');
                    }}
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
                  inputMode='numeric'
                  {...register('phoneNumber', {
                    onChange: (e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                      const formatted = formattedPhoneNumber(onlyNums);
                      setValue('phoneNumber', formatted, {
                        shouldValidate: true,
                      });
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
                <Address editInfoControl={control} disabled={isPending} />
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
                  disabled={!isValid || !isModified || isPending}
                >
                  수정하기
                </button>
              </div>
            </fieldset>
          </form>
        )}
        {isPending && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Image
              src='/images/loader.gif'
              alt='Loading...'
              width={80}
              height={80}
            />
          </div>
        )}
      </ScrollHiddenDiv>
    </Overlay>
  );
}
