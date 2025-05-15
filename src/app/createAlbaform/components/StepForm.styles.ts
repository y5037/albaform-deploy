import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 640px;

  @media (max-width: 1024px) {
    gap: 32px;
    max-width: 100%;
  }
`;

//  라벨 + 인풋 태그 그룹화
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    gap: 12px;
  }
`;

//  label 태그
export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
`;

//  필수사항 마크
export const RequiredMark = styled.span`
  color: var(--primary-orange400);
  font-size: 14px;
`;

//  input 태그
export const FormInput = styled.input`
  width: 100%;
  background-color: var(--background200);
  border-radius: 8px;
  padding: 14px 14px 12px 14px;
`;

//  textarea 태그
export const FormTextarea = styled.textarea`
  width: 100%;
  background-color: var(--background200);
  border-radius: 8px;
  padding: 14px;
  height: 160px;
  resize: none;
`;

//  달력 커스텀 인풋
export const CustomDateInput = styled(FormInput)`
  width: 100%;
  background-color: var(--background200);
  border-radius: 8px;
  padding: 14px 14px 12px 14px;

  &:focus {
    border: 1px solid var(--gray200);
    padding: 13px 13px 11px 13px;
  }
`;

//  react-datepicker 커스터마이징
export const StyledDatePickerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 100%;
  margin-top: 8px;

  .react-datepicker {
    border: none;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    padding: 24px;
    background-color: white;
    max-width: 620px;
    width: 100%;
    box-sizing: border-box;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
    padding-bottom: 12px;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 2px;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
  }

  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: #ffe6c7;
    color: black;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__day--selected {
    background-color: #ff9f29;
    color: white;
  }

  @media (max-width: 768px) {
    .react-datepicker {
      max-width: 100%;
      padding: 16px;
    }

    .react-datepicker__day,
    .react-datepicker__day-name {
      width: 36px;
      height: 36px;
      font-size: 12px;
      margin: 1px;
    }
  }
`;
