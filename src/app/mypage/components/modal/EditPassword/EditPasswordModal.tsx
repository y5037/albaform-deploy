import { EditModalProps } from '@/app/mypage/types';
import Overlay from '@/components/modal/Overlay';

export default function EditPasswordModal({
  showModal,
  setShowModal,
  handleCloseModal,
  onSuccess,
}: EditModalProps) {
  return (
    <Overlay
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      asd
    </Overlay>
  );
}
