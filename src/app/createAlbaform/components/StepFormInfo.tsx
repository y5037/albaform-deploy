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
  ImageUploadWrapper,
  UploadBox,
  HiddenFileInput,
  PreviewWrapper,
  PreviewImage,
  DeleteButton,
} from './StepForm.styles';
import { CustomDateInput, StyledDatePickerWrapper } from './Datepicker.styles';
import { ko } from 'date-fns/locale';

export type InfoFormValues = {
  title: string;
  description: string;
  period: string;
  image: File[];
};

type Props = {
  onDataChange: (data: InfoFormValues) => void;
};

export default function StepFormInfo({ onDataChange }: Props) {
  const { register, control, watch, setValue } = useForm<InfoFormValues>({
    mode: 'onChange',
    defaultValues: {
      image: [],
    },
  });

  const title = watch('title');
  const description = watch('description');
  const images = watch('image');

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [previews, setPreviews] = useState<string[]>([]);

  // 이미지 미리보기 설정
  useEffect(() => {
    if (images && images.length > 0) {
      const urls = images.map((file) => URL.createObjectURL(file));
      setPreviews(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [images]);

  // 날짜 선택 시 내부 상태 설정
  useEffect(() => {
    if (startDate && endDate) {
      const formatted = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
      setValue('period', formatted);
      setIsCalendarOpen(false);
    }
  }, [startDate, endDate, setValue]);

  // 외부로 전달
  useEffect(() => {
    const isAnyFilled =
      title?.trim() !== '' ||
      description?.trim() !== '' ||
      (startDate && endDate) ||
      (images && images.length > 0);

    if (isAnyFilled) {
      onDataChange({
        title,
        description,
        period:
          startDate && endDate
            ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
            : '',
        image: images,
      });
    } else {
      onDataChange({
        title: '',
        description: '',
        period: '',
        image: [],
      });
    }
  }, [title, description, images, startDate, endDate, onDataChange]);

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newFiles = [...images, ...fileArray].slice(0, 4); // 최대 4개 제한
    setValue('image', newFiles);
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index: number) => {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setValue('image', newFiles);
  };

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

      {/* 이미지 첨부 */}
      <FormGroup>
        <FormLabel>
          이미지 첨부 <RequiredMark> (최대 4장)</RequiredMark>
        </FormLabel>
        <ImageUploadWrapper>
          {previews.length < 4 && (
            <>
              <UploadBox htmlFor='imageUpload'>+</UploadBox>
              <HiddenFileInput
                id='imageUpload'
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
              />
            </>
          )}
          {previews.map((url, index) => (
            <PreviewWrapper key={index}>
              <PreviewImage src={url} alt={`업로드된 이미지 ${index + 1}`} />
              <DeleteButton
                type='button'
                onClick={() => handleDeleteImage(index)}
              >
                ×
              </DeleteButton>
            </PreviewWrapper>
          ))}
        </ImageUploadWrapper>
      </FormGroup>
    </FormWrapper>
  );
}
