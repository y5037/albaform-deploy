import { IoCloseOutline } from 'react-icons/io5';

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className='absolute top-2 right-2 rounded-full p-1'
      onClick={onClick}
    >
      <IoCloseOutline className='text-gray400' size={24} />
    </button>
  );
}
