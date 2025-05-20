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
  const [numberOfPositions, setNumberOfPositions] = useState(
    initialValue.numberOfPositions.toString(),
  );
  const [gender, setGender] = useState(initialValue.gender);
  const [education, setEducation] = useState(initialValue.education);
  const [age, setAge] = useState(initialValue.age);
  const [preference, setPreference] = useState(initialValue.preferred);

  // 상태 변경 시마다 상위 컴포넌트로 데이터 전달
  useEffect(() => {
    onDataChange({
      numberOfPositions: Number(numberOfPositions) || 0,
      gender,
      education,
      age,
      preferred: preference,
    });
  }, [numberOfPositions, gender, education, age, preference]);

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel>
          모집인원 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={numberOfPositions}
          onChange={setNumberOfPositions}
          options={['1', '2', '3', '4', '5']}
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
          options={['성별 무관', '남성', '여성']}
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
          options={['학력 무관', '고등학교 졸업', '대학교 재학', '대학교 졸업']}
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
          options={['연령 무관', '20대', '30대', '40대 이상']}
          placeholder='선택'
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          우대사항 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <InputDropdown
          value={preference}
          onChange={setPreference}
          options={[
            '우대사항 없음',
            '인근 거주자',
            '군필자',
            '관련 자격증 소지자',
          ]}
          placeholder='선택'
        />
      </FormGroup>
    </FormWrapper>
  );
}
