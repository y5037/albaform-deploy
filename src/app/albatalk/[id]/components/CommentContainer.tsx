import Image from 'next/image';
import KebabDropdown from './KebabDropdown';

export default function CommentContainer() {
  const handleSubmit = () => {};

  return (
    <>
      <div className='mt-[40px] mb-[80px] text-right'>
        <form onSubmit={handleSubmit}>
          <textarea
            name='comment'
            placeholder='댓글을 입력해주세요'
            className='w-full p-[14px] bg-background-200 rounded-[8px] font-light'
          />
          <button className='mt-[16px] bg-orange-400 rounded-[8px] px-[50px] h-[60px] text-white font-medium text-[18px]'>
            등록하기
          </button>
        </form>
      </div>
      <div>
        <div className='pb-[24px] border-b border-solid border-line-200'>
          <div className='flex items-center justify-between text-gray-500 font-light text-[16px] mb-[37px]'>
            <div className='flex items-center'>
              <Image
                src='/images/defaultProfile.svg'
                alt='기본프로필'
                width={26}
                height={26}
              />
              <p className='ml-[10px]'>김코드</p>
              <div className='ml-[15px] mr-[15px] w-[1px] h-[20px] bg-line-200'></div>
              <p>2024. 08. 06</p>
            </div>
            <KebabDropdown />
          </div>
          <div>댓글입니다. 댓글입니다. 댓글입니다. 댓글입니다.댓글입니다.</div>
        </div>
      </div>
    </>
  );
}
