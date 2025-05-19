'use client';

import { useState, useCallback } from 'react';
import CustomButton from '../components/CustomButton';
import StepSelector from '../components/Selector';
import StepFormInfo, { InfoFormValues } from '../components/FormInfo';

export default function CreateForm() {
  const [currentStep, setCurrentStep] = useState<'info' | 'condition' | 'work'>(
    'info',
  );

  // 각 단계별 작성 상태 저장 (예시용. 실제로는 각 step 내용 입력 상태 기반으로 로직 구현)
  const [formData, setFormData] = useState<{
    info: InfoFormValues;
    condition: any;
    work: any;
  }>({
    info: {
      title: '',
      description: '',
      period: '',
      image: [],
    },
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

  const handleInfoChange = useCallback((infoData: InfoFormValues) => {
    setFormData((prev) => ({ ...prev, info: infoData }));
  }, []);

  return (
    <>
      {/* 상단 제목 + 취소버튼 */}
      <div
        className='
          flex justify-between items-center max-w-[375px] pt-[84px] px-[24px] mx-auto
          md:pt-[112px] min-[1025px]:max-w-[1220px] min-[1025px]:px-[120px]'
      >
        <h1
          className='
            font-semibold text-[20px] leading-[32px]
            min-[1025px]:text-[32px] min-[1025px]:leading-[46px]
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
          min-[1025px]:flex min-[1025px]:gap-[40px] 
          min-[1025px]:max-w-[1220px] min-[1025px]:px-[120px] min-[1025px]:mt-6'
      >
        <StepSelector
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isStepInProgress={isStepInProgress}
        />

        <div className='flex-1 pt-6 min-[1025px]:mt-0'>
          {currentStep === 'info' && (
            <StepFormInfo
              onDataChange={handleInfoChange}
              initialValue={
                formData.info ?? {
                  title: '',
                  description: '',
                  period: '',
                  image: [],
                }
              }
            />
          )}
          {/* 나중에 condition, work 폼 추가 */}
        </div>
      </div>
    </>
  );
}
