import CustomButton from './components/CustomButton';

export default function CreateForm() {
  return (
    <>
      <div className='flex justify-between items-center max-w-[327px] pt-[84px] mx-auto md:pt-[112px] lg:max-w-[640px]'>
        <h1
          className='
          font-semibold text-[20px] leading-[32px]
          lg:text-[32px] lg:leading-[46px]
        '
        >
          알바폼 만들기
        </h1>
        <CustomButton>작성취소</CustomButton>
      </div>
    </>
  );
}
