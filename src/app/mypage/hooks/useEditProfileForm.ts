import { UserDataProps } from '@/app/mypage/types';
import { useEditUser } from '@/hooks/mutation/useEditUser';
import { useUploadImage } from '@/hooks/mutation/useUploadImage';
import {
  EditProfileInput,
  ownerProfileSchema,
} from '@/schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

export function useEditProfileForm({
  user,
  setShowModal,
  isPreview,
}: {
  user: UserDataProps;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isPreview: string;
}) {
  const queryClient = useQueryClient();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadImage();
  const { mutate: patchEditUser, isPending: isPatchingUser } = useEditUser();

  const form = useForm<EditProfileInput>({
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

  return {
    form,
    onSubmit,
    selectedImageFile,
    setSelectedImageFile,
    isPending: isUploadingImage || isPatchingUser,
  };
}
