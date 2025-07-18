import { media } from '@/styles/media';
import { min } from 'date-fns';
import styled, { css } from 'styled-components';

type EditContainerProps = {
  $active?: boolean;
};

type EditButtonProps = {
  $editInfo?: boolean;
};

type TabButtonProps = {
  $active?: boolean;
};

type SlideBgProps = {
  $activeTab?: 'post' | 'comment' | 'scrap';
  $applicant?: boolean;
};

type DropdownProps = {
  $active?: boolean;
};

type DropdownButtonProps = {
  $active?: boolean;
};

type TextProps = {
  comment?: boolean;
};

type FormWrapperProps = {
  $noActive?: boolean;
};

export const KebabButton = styled.div`
  min-width: 36px;
  margin-top: -3px;
  position: relative;
  cursor: pointer;

  .kebabImgWrapper {
    display: none;

    @media ${media.tabletPC} {
      display: block;
    }
  }
`;

export const EditButtonContainer = styled.div<EditContainerProps>`
  @media ${media.tabletPC} {
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    position: absolute;
    right: 0;
    padding: 5px;
    z-index: 100;
    border: 1px solid var(--line100);
    box-shadow: 4px 4px 4px rgba(228, 228, 228, 0.1);
    border-radius: 8px;
    background: var(--white);
  }
`;

export const EditButton = styled.button<EditButtonProps>`
  width: 180px;
  height: 58px;
  border-radius: 8px;
  margin-right: ${({ $editInfo }) => $editInfo && '16px'};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border: ${({ $editInfo }) =>
    !$editInfo && '1px solid var(--primary-orange400)'};
  background: ${({ $editInfo }) =>
    $editInfo ? 'var(--primary-orange400)' : 'var(--white)'};
  color: ${({ $editInfo }) =>
    $editInfo ? 'var(--white)' : 'var(--primary-orange400)'};

  @media ${media.tabletPC} {
    width: 96px;
    height: 38px;
    margin-right: 0;
    border: 0;
    background: var(--white);
    color: var(--gray400);
    font-size: 14px;
    box-sizing: border-box;
    transition: 0.2s;

    &:hover {
      background: var(--primary-orange100);
      color: var(--black400);
    }
  }
`;

export const TabWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const SlideBg = styled.div<SlideBgProps>`
  position: absolute;
  left: ${({ $activeTab, $applicant }) =>
    $activeTab === 'post'
      ? '6px'
      : $applicant && $activeTab === 'comment'
      ? 'calc(33% + 3px)'
      : $applicant && $activeTab === 'scrap'
      ? 'calc(33% + 140px)'
      : 'calc(50% + 3px)'};
  width: ${({ $applicant }) =>
    $applicant ? 'calc(33% - 6px)' : 'calc(50% - 6px)'};
  height: 38px;
  border-radius: 8px;
  background-color: white;
  transition: all 0.3s ease;
  z-index: 0;
`;

export const TabButton = styled.button<TabButtonProps>`
  width: 130px;
  flex: 1;
  z-index: 1;
  color: ${({ $active }) => ($active ? 'var(--primary)' : '#A0AEC0')};
  background: ${({ $active }) => $active && 'var(--white)'};
  text-align: center;
  border: none;
  border-radius: 8px;
  transition: color 10s ease;
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 32%;
  width: 32%;
  padding: 24px;
  position: relative;
  border: 1px solid var(--line100);
  border-radius: 16px;
  box-shadow: 4px 4px 6px 0 rgba(212, 212, 212, 0.1);
  cursor: pointer;

  @media (max-width: 1450px) {
    min-width: 49%;
    width: 49%;
  }

  @media ${media.tabletPC} {
    flex-direction: column;
    width: 100%;
    min-width: 100%;
  }
`;

export const ScrapWrapper = styled.div<FormWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 32%;
  width: 32%;
  position: relative;
  cursor: ${({ $noActive }) => ($noActive ? 'default' : 'pointer')};

  @media (max-width: 1450px) {
    min-width: 49%;
    width: 49%;
  }

  @media ${media.tabletPC} {
    flex-direction: column;
    width: 100%;
    min-width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    padding: 0 100px;
  }
`;

export const Title = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'comment',
})<TextProps>`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 18px;
  font-weight: 500;

  ${({ comment }) =>
    comment &&
    css`
      font-size: 16px;
      color: var(--black100);
    `}
`;

export const Description = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'comment',
})<TextProps>`
  width: 85%;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 300;
  color: var(--gray500);

  ${({ comment }) =>
    comment &&
    css`
      font-size: 14px;
    `}
`;

export const PostDropdownContainer = styled.div<DropdownProps>`
  display: ${({ $active }) => ($active ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  padding: 7px;
  background: var(--white);
  border-radius: 8px;
  border: 1px solid var(--line100);
  box-shadow: 4px 4px 4px rgba(228, 228, 228, 0.1);
  z-index: 100;
  font-size: 16px;
`;

export const PostDropdownButton = styled.button<DropdownButtonProps>`
  width: 118px;
  height: 38px;
  margin-bottom: 7px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 400;
  color: var(--gray400);

  &:hover {
    background: var(--primary-orange100);
    color: var(--black400);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Comment = styled.p`
  width: 95%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 18px;
  font-weight: 500;
`;

export const ScrollHiddenDiv = styled.div`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
