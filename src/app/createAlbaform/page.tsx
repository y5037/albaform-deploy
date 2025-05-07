export default function CreateForm() {
  return (
    <>
      <div className='flex justify-between items-center max-w-[327px] pt-[112px] mx-auto md:max-w-[640px]'>
        <h1 className='font-semibold text-xl leading-[32px]'>알바폼 만들기</h1>
        <button
          className='
          bg-[var(--gray100)] text-[var(--white)] font-semibold text-center text-sm
          rounded-lg px-[14px] py-[8px]'
        >
          작성취소
        </button>
      </div>
    </>
  );
}
