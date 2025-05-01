import Image from 'next/image';
import {
  Title,
  PostWrapper,
  Description,
  KebabButton,
  PostDropdownContainer,
  PostDropwonButton,
} from '../../styles';
import { useClickOutside } from '@/utils/useClickOutside';

export default function ListContainer() {
  const { outRef, dropdown, setDropdown } = useClickOutside();

  return (
    <div className='flex flex-wrap gap-x-[2%] gap-y-[48px] max-[1199px]:gap-y-[16px]'>
      <PostWrapper>
        <div>
          <div className='w-[100%] flex justify-between items-start'>
            <Title>알바 추천해주세요</Title>
            <KebabButton ref={outRef}>
              <Image
                src='/images/kebabButton.svg'
                alt='더보기'
                width={36}
                height={36}
                className='cursor-pointer'
                onClick={() => setDropdown((prev) => !prev)}
              />
              <PostDropdownContainer $active={dropdown}>
                <PostDropwonButton>수정하기</PostDropwonButton>
                <PostDropwonButton>삭제하기</PostDropwonButton>
              </PostDropdownContainer>
            </KebabButton>
          </div>
          <Description>
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
            추천해주세요 알바 추천해주세요 알바 추천해주세요알바 추천해주세요
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
            추천해주세요 알바 추천해주세요알바 추천해주세요 알바 추천해주세요
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
          </Description>
        </div>
        <div className='flex items-center justify-between text-gray-500 pt-[80px] max-[1199px]:pt-[24px] max-[768px]:pt-[40px] font-light'>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <Image
                src='/images/defaultProfile.svg'
                alt='기본프로필'
                width={36}
                height={36}
                className='mr-[5px]'
              />
              김코드
            </div>
            <p className='pl-[16px] ml-[16px] border-l border-solid border-line-200 h-[18px] leading-[18px]'>
              2024. 08. 06
            </p>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center mr-[10px]'>
              <Image
                src='/images/mypage/comment.svg'
                alt='댓글'
                width={36}
                height={36}
              />
              10
            </div>
            <div className='flex items-center'>
              <Image
                src='/images/mypage/like.svg'
                alt='좋아요'
                width={36}
                height={36}
              />
              24
            </div>
          </div>
        </div>
      </PostWrapper>
    </div>
  );
}
