'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styled from 'styled-components';

interface StepSelectorProps {
  currentStep: 'info' | 'condition' | 'work';
  setCurrentStep: (step: 'info' | 'condition' | 'work') => void;
  isStepInProgress: (step: 'info' | 'condition' | 'work') => boolean;
}

const steps = [
  { key: 'info', label: '모집 내용', index: 1 },
  { key: 'condition', label: '모집 조건', index: 2 },
  { key: 'work', label: '근무 조건', index: 3 },
] as const;

export default function StepSelector({
  currentStep,
  setCurrentStep,
  isStepInProgress,
}: StepSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 데스크탑: 사이드바 */}
      <div
        className='
          hidden lg:flex flex-col gap-2 
          p-4 w-60 bg-[#F7F7F7] rounded-xl shadow-sm'
      >
        {steps.map(({ key, label, index }) => (
          <StepButton
            key={key}
            selected={currentStep === key}
            onClick={() => setCurrentStep(key)}
          >
            <StepLabel>
              <StepIndex selected={currentStep === key}>{index}</StepIndex>
              {label}
            </StepLabel>
            {isStepInProgress(key) && (
              <WritingBadge selected={currentStep === key}>작성중</WritingBadge>
            )}
          </StepButton>
        ))}
      </div>

      {/* 테블릿 + 모바일 : 드롭다운 */}
      <div className='block lg:hidden w-full mb-4'>
        <DropdownContainer>
          <DropdownHeader selected onClick={() => setOpen(!open)}>
            <span>
              <StepIndex selected>
                {steps.find((s) => s.key === currentStep)?.index}
              </StepIndex>
              {steps.find((s) => s.key === currentStep)?.label}
              {isStepInProgress(currentStep) && (
                <WritingBadge selected>작성중</WritingBadge>
              )}
            </span>
            {open ? (
              <ChevronUp size={24} color='var(--white)' />
            ) : (
              <ChevronDown size={24} color='var(--white)' />
            )}
          </DropdownHeader>

          {/* 드롭다운 리스트 */}
          {open && (
            <DropdownList>
              {steps
                .filter((s) => s.key !== currentStep)
                .map(({ key, label, index }) => (
                  <DropdownItem
                    key={key}
                    onClick={() => {
                      setCurrentStep(key);
                      setOpen(false);
                    }}
                  >
                    <StepIndex>{index}</StepIndex>
                    {label}
                    {isStepInProgress(key) && (
                      <WritingBadge>작성중</WritingBadge>
                    )}
                  </DropdownItem>
                ))}
            </DropdownList>
          )}
        </DropdownContainer>
      </div>
    </>
  );
}

//  데스크탑 < 수정해야함!!!!!! >
const StepButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) =>
    selected ? 'var(--primary-orange400)' : 'var(--background200)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--black100)')};
  font-size: 16px;
  font-weight: 700;
  height: 28px;
  padding: 10px 14px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepLabel = styled.span`
  display: flex;
  align-items: center;
`;

//  데스크탑 + 테블릿 : 반응형 작업 해야함!!!!!!
const StepIndex = styled.span<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? 'var(--primary-orange100)' : 'var(--background300)'};
  color: ${({ selected }) =>
    selected ? 'var(--primary-orange400)' : 'var(--gray200)'};
  font-size: 14px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const WritingBadge = styled.span<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? '#FBAF37' : 'var(--white)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--gray300)')};
  font-size: 12px;
  padding: 4px 8px;
  margin-left: 12px;
  border: ${({ selected }) =>
    selected ? '1px solid var(--white)' : '1px solid var(--gray100)'};
  border-radius: 100px;
`;

//  테블릿 + 모바일 : 드롭다운
const DropdownContainer = styled.div`
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  border: 1px solid var(--line200);
  border-radius: 16px;
`;

const DropdownHeader = styled.div<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? '#F89A05' : 'var(--white)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--black100)')};
  width: 100%;
  padding: 12px 24px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DropdownList = styled.div`
  background-color: var(--white);
  overflow: hidden;
  border-radius: 16px;
`;

const DropdownItem = styled.div`
  color: var(--black100);
  padding: 12px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;
