'use client';

import { useState, useCallback } from 'react';
import CustomButton from '../components/CustomButton';
import StepSelector from '../components/StepSelector';
import StepFormInfo, { InfoFormValues } from '../components/StepFormInfo';

export default function CreateForm() {
  const [currentStep, setCurrentStep] = useState<'info' | 'condition' | 'work'>(
    'info',
  );

  // 각 단계별 작성 상태 저장 (예시용. 실제로는 각 step 내용 입력 상태 기반으로 로직 구현)
  const [formData, setFormData] = useState<{
    info: InfoFormValues | null;
    condition: any;
    work: any;
  }>({
    info: null,
    condition: null,
    work: null,
  });

  const isStepInProgress = (step: 'info' | 'condition' | 'work'): boolean => {
    if (step === 'info') {
      const data = formData.info;
      return !!(
        data &&
        (data.title?.trim() ||
          data.description?.trim() ||
          data.period?.trim() ||
          (data.image && data.image.length > 0))
      );
    }

    // 이후 조건/근무 입력 상태 확인 로직 추가
    return false;
  };

  const handleInfoChange = useCallback((data: InfoFormValues) => {
    setFormData((prev) => ({ ...prev, info: data }));
  }, []);

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

      {/* 조건 선택 영역 */}
      <div
        className='
          max-w-[375px] mx-auto mt-6 px-[24px] pb-[80px]
          lg:flex lg:gap-[40px] lg:max-w-[1220px] lg:px-[120px] lg:mt-6'
      >
        <StepSelector
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isStepInProgress={isStepInProgress}
        />

        <div className='flex-1 pt-6 lg:mt-0'>
          {currentStep === 'info' && (
            <StepFormInfo onDataChange={handleInfoChange} />
          )}
          {/* 나중에 condition, work 폼 추가 */}
        </div>
      </div>
    </>
  );
}
