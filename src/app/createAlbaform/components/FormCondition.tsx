'use client';

import React, { useEffect, useState } from 'react';
import { FormWrapper, FormGroup, FormLabel, RequiredMark } from './Form.styles';
import InputDropdown from './InputDropdown';

export interface ConditionFormValues {
  numberOfPositions: number;
  gender: string;
  education: string;
  age: string;
  preferred: string;
}

interface FormConditionProps {
  onDataChange: (data: ConditionFormValues) => void;
  initialValue: ConditionFormValues;
}

export default function FormCondition({
  onDataChange,
  initialValue,
}: FormConditionProps) {
  // numberOfPositions는 number | string 으로 관리
  const [numberOfPositions, setNumberOfPositions] = useState<number | string>(
    initialValue.numberOfPositions,
  );
  const [gender, setGender] = useState<number | string>(initialValue.gender);
  const [education, setEducation] = useState<number | string>(
    initialValue.education,
  );
  const [age, setAge] = useState<number | string>(initialValue.age);
  const [preferred, setPreferred] = useState<number | string>(
    initialValue.preferred,
  );

  // 상태 변경 시마다 상위 컴포넌트로 데이터 전달
  useEffect(() => {
    onDataChange({
      numberOfPositions:
        typeof numberOfPositions === 'string'
          ? Number(numberOfPositions) || 0
          : numberOfPositions,
      gender: typeof gender === 'string' ? gender : String(gender) || '',
      education:
        typeof education === 'string' ? education : String(education) || '',
      age: typeof age === 'string' ? age : String(age) || '',
      preferred:
        typeof preferred === 'string' ? preferred : String(preferred) || '',
    });
  }, [numberOfPositions, gender, education, age, preferred]);

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel>
          모집인원 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={numberOfPositions} // 숫자 또는 문자열 그대로 전달
          onChange={setNumberOfPositions}
          options={[0, 1, 2, 3, 4, 5]} // 숫자 배열로 수정
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          성별 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={gender}
          onChange={setGender}
          options={['성별무관', '남성', '여성']}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          학력 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={education}
          onChange={setEducation}
          options={[
            '학력무관',
            '고졸 이상',
            '대졸(2,3년제) 이상',
            '대졸(4년제) 이상',
          ]}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          연령 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={age}
          onChange={setAge}
          options={['연령무관', '20대', '30대', '40대 이상']}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          우대사항 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={preferred}
          onChange={setPreferred}
          options={['없음', '직접입력']}
          placeholder='선택'
        />
      </FormGroup>
    </FormWrapper>
  );
}
