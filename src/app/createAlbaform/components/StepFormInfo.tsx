'use client';

import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FormWrapper,
  FormGroup,
  FormLabel,
  RequiredMark,
  FormInput,
  FormTextarea,
} from './StepForm.styles';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';

export type InfoFormValues = {
  title: string;
  description: string;
  period: string;
  image: FileList;
};

type Props = {
  onDataChange: (data: InfoFormValues) => void;
};

const CustomDateInput = styled(FormInput)`
  cursor: pointer;
  background-color: #f9f9f9;
`;

export default function StepFormInfo({ onDataChange }: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InfoFormValues>({
    mode: 'onChange',
  });

  const title = watch('title');
  const description = watch('description');
  const period = watch('period');
  const image = watch('image');

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      const formatted = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
      setValue('period', formatted);
    }
  }, [startDate, endDate, setValue]);

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
        <Controller
          control={control}
          name='period'
          rules={{ required: true }}
          render={() => (
            <DatePicker
              locale={ko}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update as [Date, Date]);
              }}
              customInput={
                <CustomDateInput
                  readOnly
                  value={
                    startDate && endDate
                      ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                      : ''
                  }
                  placeholder='시작일 ~ 종료일'
                />
              }
              dateFormat='yyyy.MM.dd'
              placeholderText='시작일 ~ 종료일'
            />
          )}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>이미지 첨부</FormLabel>
        <FormInput type='file' accept='image/*' {...register('image')} />
      </FormGroup>
    </FormWrapper>
  );
}
