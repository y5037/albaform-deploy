'use client';

import Toast from '@/components/tooltip/Toast';
import Tooltip from '@/components/tooltip/ToolTip';
import PopUp from '@/components/tooltip/PopUp';

export default function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-3xl font-semibold'>랜딩</div>
      <div className='flex flex-col gap-4'>
        <Toast size='sm'>Toast sm</Toast>
        <Toast size='md'>Toast md</Toast>
        <Tooltip size='sm' onClose={() => {}}>
          Tooltip sm
        </Tooltip>
        <Tooltip size='md' onClose={() => {}}>
          Tooltip md
        </Tooltip>
        <PopUp size='sm' onClose={() => {}}>
          PopUp sm
        </PopUp>
        <PopUp size='md' onClose={() => {}}>
          PopUp md
        </PopUp>
      </div>
    </div>
  );
}
