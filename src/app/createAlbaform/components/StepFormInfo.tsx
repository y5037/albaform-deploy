'use client';

import { useForm, Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FormWrapper,
  FormGroup,
  FormLabel,
  RequiredMark,
  FormInput,
  FormTextarea,
  CustomDateInput,
  StyledDatePickerWrapper,
} from './StepForm.styles';
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

export default function StepFormInfo({ onDataChange }: Props) {
  const { register, control, watch, setValue } = useForm<InfoFormValues>({
    mode: 'onChange',
  });

  const title = watch('title');
  const description = watch('description');
  const image = watch('image');

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 날짜 선택 시 내부 상태 설정
  useEffect(() => {
    if (startDate && endDate) {
      const formatted = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
      setValue('period', formatted);
      setIsCalendarOpen(false); // 날짜 선택 끝나면 달력 닫기
    }
  }, [startDate, endDate, setValue]);

  // 외부로 전달 (값이 없어졌을 때는 빈 값 전달)
  useEffect(() => {
    const isAnyFilled =
      title?.trim() !== '' ||
      description?.trim() !== '' ||
      (startDate && endDate) ||
      (image && image.length > 0); // image가 있고, 파일이 1개 이상인지 체크

    if (isAnyFilled) {
      onDataChange({
        title,
        description,
        period:
          startDate && endDate
            ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
            : '',
        image,
      });
    } else {
      onDataChange({
        title: '',
        description: '',
        period: '',
        image: undefined as unknown as FileList,
      });
    }
  }, [title, description, image, startDate, endDate, onDataChange]);

  return (
    <FormWrapper>
      {/* 제목 */}
      <FormGroup>
        <FormLabel>
          알바폼 제목 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormInput
          type='text'
          placeholder='제목을 입력해주세요.'
          {...register('title')}
        />
      </FormGroup>

      {/* 소개글 */}
      <FormGroup>
        <FormLabel>
          소개글 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <FormTextarea
          placeholder='최대 200자까지 입력 가능합니다.'
          maxLength={200}
          {...register('description')}
        />
      </FormGroup>

      {/* 모집 기간 */}
      <FormGroup>
        <FormLabel>
          모집 기간 <RequiredMark>*</RequiredMark>
        </FormLabel>
        <Controller
          control={control}
          name='period'
          render={() => (
            <div style={{ position: 'relative' }}>
              <CustomDateInput
                ref={inputRef}
                readOnly
                value={
                  startDate && endDate
                    ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                    : ''
                }
                placeholder='시작일 ~ 종료일'
                onClick={() => setIsCalendarOpen(true)}
              />
              {isCalendarOpen && (
                <StyledDatePickerWrapper>
                  <DatePicker
                    locale={ko}
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update as [Date, Date])}
                    onClickOutside={() => setIsCalendarOpen(false)}
                    inline
                  />
                </StyledDatePickerWrapper>
              )}
            </div>
          )}
        />
      </FormGroup>

      {/* 이미지 */}
      <FormGroup>
        <FormLabel>이미지 첨부</FormLabel>
        <FormInput type='file' accept='image/*' {...register('image')} />
      </FormGroup>
    </FormWrapper>
  );
}
