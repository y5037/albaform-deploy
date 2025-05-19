import { SetStateAction } from 'react';

export interface FilterContainerProps {
  selectedTab: 'post' | 'comment';
  setSelectedTab: React.Dispatch<SetStateAction<'post' | 'comment'>>;
  isPostSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsPostSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
}

export interface SortDropdownProps {
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
    SetStateAction<'mostRecent' | 'mostCommented' | 'mostLiked'>
  >;
}

export interface ListContainerProps {
  selectedTab: 'post' | 'comment';
  listData: ListData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

type WriterData = {
  id: number;
  imageUrl?: string;
  nickname: string;
};

type PostData = {
  id: number;
  title: string;
  content: string;
};

export interface ListData {
  id: number;
  imageUrl?: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  commentCount?: number;
  likeCount?: number;
  writer?: WriterData;

  post?: PostData;

  isPublic?: boolean;
  scrapCount?: number;
  applyCount?: number;
  imageUrls?: string[];
  recruitmentEndDate?: string;
  recruitmentStartDate?: string;
}

export interface EditProfileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface HeadProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface UserDataProps {
  id: number;
  email: string;
  imageUrl: string;
  location: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  storePhoneNumber: string;
  role: string;
  storeName: string;
}

export type WatchedFields = {
  imageUrl: string;
  name: string;
  nickname: string;
  store: string;
  storeTel: string;
  phoneNumber: string;
  address: string;
};
