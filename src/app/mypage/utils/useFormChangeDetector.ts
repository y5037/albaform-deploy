import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { UserDataProps, WatchedFields } from '../types';

export default function useFormChangeDetector(props: {
  watched: WatchedFields;
  setValue: UseFormSetValue<WatchedFields>;
  user?: UserDataProps;
}) {
  const { watched, setValue, user } = props;

  useEffect(() => {
    if (user) {
      setValue('nickname', user.nickname || '');
      setValue('store', user.storeName || '');
      setValue('storeTel', user.storePhoneNumber || '');
      setValue('ownerTel', user.phoneNumber || '');
      setValue('address', user.location || '');
    }
  }, [user, setValue]);

  const isModified =
    watched.nickname !== user?.nickname ||
    watched.store !== user?.storeName ||
    watched.storeTel !== user?.storePhoneNumber ||
    watched.ownerTel !== user?.phoneNumber ||
    watched.address !== user?.location;

  return { isModified };
}
