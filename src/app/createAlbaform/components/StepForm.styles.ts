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
  padding: 14px;
  padding-bottom: 12px;
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
