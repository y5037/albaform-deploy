import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { UserDataProps, WatchedFields } from '../types';
import { formattedStoreTel } from '@/utils/formattedStoreTel';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';

export default function useFormChangeDetector(props: {
  watched: WatchedFields;
  setValue: UseFormSetValue<WatchedFields>;
  user?: UserDataProps;
}) {
  const { watched, setValue, user } = props;

  useEffect(() => {
    if (user) {
      setValue('imageUrl', user.imageUrl || '');
      setValue('nickname', user.nickname || '');
      setValue('store', user.storeName || '');
      setValue('storeTel', user.storePhoneNumber || '');
      setValue('ownerTel', user.phoneNumber || '');
      setValue('address', user.location || '');
    }
  }, [user, setValue]);

  const isModified =
    watched.imageUrl !== user?.imageUrl ||
    watched.nickname !== user?.nickname ||
    watched.store !== user?.storeName ||
    watched.storeTel !== formattedStoreTel(user?.storePhoneNumber) ||
    watched.ownerTel !== formattedPhoneNumber(user?.phoneNumber) ||
    watched.address !== user?.location;

  return { isModified };
}
