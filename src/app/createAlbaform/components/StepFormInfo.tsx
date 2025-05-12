'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  FormWrapper,
  FormGroup,
  FormLabel,
  RequiredMark,
  FormInput,
  FormTextarea,
} from './StepForm.styles';

export type InfoFormValues = {
  title: string;
  description: string;
  period: string;
  image: FileList;
};

type Props = {
  onDataChange: (data: InfoFormValues) => void;
};

export default function StepFormInfo({ onDataChange }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<InfoFormValues>({
    mode: 'onChange',
  });

  const title = watch('title');
  const description = watch('description');
  const period = watch('period');
  const image = watch('image');

  useEffect(() => {
    onDataChange({ title, description, period, image });
  }, [title, description, period, image]);

  return (
    <FormWrapper>
      <FormGroup>
        <FormLabel>
          알바폼 제목 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormInput
          type='text'
          placeholder='제목을 입력해주세요.'
          {...register('title', { required: true })}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          소개글 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormTextarea
          placeholder='최대 200자까지 입력 가능합니다.'
          maxLength={200}
          {...register('description', { required: true })}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          모집 기간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormInput
          type='text'
          placeholder='시작일 ~ 종료일'
          {...register('period', { required: true })}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>이미지 첨부</FormLabel>
        <FormInput type='file' accept='image/*' {...register('image')} />
      </FormGroup>
    </FormWrapper>
  );
}
