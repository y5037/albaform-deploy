import Image from 'next/image';
import { FilterContainerProps } from '../types';
import PostSortButton from '@/components/postSort/PostSortButton';

export default function FilterContainer({
  isSort,
  setIsSort,
}: FilterContainerProps) {
  return (
    <div className='flex justify-between items-center'>
      <form>
        <div className='flex'>
          <Image
            src='/images/iconSearch.svg'
            alt='검색'
            width={36}
            height={36}
          />
          <input type='text' />
        </div>
      </form>
      <PostSortButton isSort={isSort} setIsSort={setIsSort} />
    </div>
  );
}
