import { DropdownButton } from '../../styles';
import { SortDropdownProps } from '../../types';

export default function SortDropdown({ isSort, setIsSort }: SortDropdownProps) {
  return (
    <>
      <DropdownButton
        $active={isSort === 'mostRecent'}
        onClick={() => {
          setIsSort('mostRecent');
        }}
      >
        최신순
      </DropdownButton>
      <DropdownButton
        $active={isSort === 'mostCommented'}
        onClick={() => {
          setIsSort('mostCommented');
        }}
      >
        댓글순
      </DropdownButton>
      <DropdownButton
        $active={isSort === 'mostLiked'}
        onClick={() => {
          setIsSort('mostLiked');
        }}
      >
        좋아요순
      </DropdownButton>
    </>
  );
}
