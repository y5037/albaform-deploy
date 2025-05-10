import Overlay from '@/components/modal/Overlay';
import { EditProfileModalProps } from '../../types';
import { useForm } from 'react-hook-form';
import {
  EditProfileInput,
  editProfileSchema,
} from '@/schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function EditProfileModal({
  showModal,
  setShowModal,
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInput>({ resolver: zodResolver(editProfileSchema) });

  const onSubmit = (data: any) => {};

  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      <p className='text-[24px] font-medium max-[768px]:text-[18px]'>
        사장님 정보 관리
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>
            닉네임 <span>*</span>
          </p>
          <input
            type='text'
            {...register('nickname')}
            placeholder='닉네임을 입력해주세요'
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </div>
        <div>
          <p>
            가게 이름 <span>*</span>
          </p>
          <input
            type='text'
            {...register('store')}
            placeholder='가게 이름(상호명)을 입력해주세요'
          />
          {errors.store && <p>{errors.store.message}</p>}
        </div>
        <div>
          <p>
            가게 전화번호 <span>*</span>
          </p>
          <input
            type='tel'
            {...register('storeTel')}
            placeholder='가게 전화번호를 입력해주세요'
          />
          {errors.storeTel && <p>{errors.storeTel.message}</p>}
        </div>
        <div>
          <p>사장님 전화번호</p>
          <input type='tel' placeholder='사장님 전화번호를 입력해주세요' />
        </div>
        <div>
          <p>
            가게 위치 <span>*</span>
          </p>
          <input
            type='address'
            {...register('address')}
            placeholder='가게 위치를 설정해주세요'
            readOnly
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div className='flex items-center'>
          <button type='button' onClick={() => setShowModal(false)}>
            취소
          </button>
          <button type='submit'>수정하기</button>
        </div>
      </form>
    </Overlay>
  );
}
