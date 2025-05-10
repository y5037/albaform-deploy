import Overlay from '@/components/modal/Overlay';
import { EditProfileModalProps } from '../../types';

export default function EditProfileModal({
  showModal,
  setShowModal,
}: EditProfileModalProps) {
  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      asd
    </Overlay>
  );
}
