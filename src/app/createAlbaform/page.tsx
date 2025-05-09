'use client';

import { useState } from 'react';
import CustomButton from './components/CustomButton';
import StepSelector from './components/StepSelector';

export default function CreateForm() {
  const [currentStep, setCurrentStep] = useState<'info' | 'condition' | 'work'>(
    'info',
  );

  // 각 단계별 작성 상태 저장 (예시용. 실제로는 각 step 내용 입력 상태 기반으로 로직 구현)
  const [formData, setFormData] = useState({
    info: '',
    condition: '',
    work: '',
  });

  const isStepInProgress = (step: 'info' | 'condition' | 'work') => {
    return formData[step].trim().length > 0;
  };

  return (
    <>
      {/* 상단 제목 + 취소버튼 */}
      <div
        className='
          flex justify-between items-center max-w-[375px] pt-[84px] px-[24px] mx-auto
          md:pt-[112px] lg:max-w-[1220px] lg:px-[120px]'
      >
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

      {/* 단계 선택 영역 */}
      <div
        className='
          max-w-[375px] mx-auto mt-6 px-[24px]
          lg:flex lg:gap-[40px] lg:max-w-[1220px] lg:px-[120px] lg:mt-6'
      >
        <StepSelector
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isStepInProgress={isStepInProgress}
        />

        {/* 오른쪽에 현재 단계별 내용 표시 (테스트용) */}
        <div className='flex-1 pt-6 lg:mt-0'>
          <textarea
            value={formData[currentStep]}
            onChange={(e) =>
              setFormData({ ...formData, [currentStep]: e.target.value })
            }
            placeholder={`${currentStep} 내용 입력`}
            className='w-full h-40 border rounded-md lg:max-w-[640px]'
          />
        </div>
      </div>
    </>
  );
}
