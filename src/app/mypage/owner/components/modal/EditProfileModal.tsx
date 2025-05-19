'use client';

import Overlay from '@/components/modal/Overlay';
import { EditProfileModalProps } from '../../../types';
import Image from 'next/image';
import { ScrollHiddenDiv } from '../../../styles';
import useChangeProfilePreview from '@/hooks/common/useChangeProfilePreview';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import useFormChangeDetector from '../../../hooks/useFormChangeDetector';
import EditProfileSkeleton from './EditProfileSkeleton';
import useInitializeUserForm from '@/app/mypage/hooks/useInitializeUserForm';
import { useEditProfileForm } from '../../../hooks/useEditProfileForm';
import EditProfileForm from './EditProfileForm';

export default function EditProfileModal({
  showModal,
  setShowModal,
  onSuccess
}: EditProfileModalProps) {
  const { data: user, isLoading } = useGetMyInfo();

  const { isPreview, setIsPreview, handleImgChange } = useChangeProfilePreview(
    user?.imageUrl || '',
  );

  const formLogic = useEditProfileForm({ user, setShowModal, isPreview, onSuccess });

  const { setValue, watch } = formLogic.form;

  const watched = watch();

  useInitializeUserForm({ user, setValue });

  const { isModified: isFormModified } = useFormChangeDetector({
    watched,
    setValue,
    user,
  });

  const isModified =
    isFormModified || !!formLogic.selectedImageFile || !!watch('imageUrl');

  return (
    <Overlay $fluid isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='relative w-[100%] pb-[14px] text-black-400 max-h-[calc(100vh_*_(1090/1256))] min-h-[500px] overflow-y-scroll scrollbar-hide'>
        <p className='text-[24px] font-medium max-[768px]:text-[18px]'>
          사장님 정보 관리
        </p>
        {isLoading ? (
          <EditProfileSkeleton />
        ) : (
          <EditProfileForm
            {...formLogic}
            isPreview={isPreview}
            setIsPreview={setIsPreview}
            handleImgChange={handleImgChange}
            isModified={isModified}
            setShowModal={setShowModal}
          />
        )}
        {formLogic.isPending && (
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
