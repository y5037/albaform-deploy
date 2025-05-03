import { SetStateAction } from 'react';

export interface FilterContainerProps {
  selectedTab: 'post' | 'comment';
  setSelectedTab: React.Dispatch<SetStateAction<'post' | 'comment'>>;
  isSort: 'mostRecent' | 'mostCommented' | 'mostLiked';
  setIsSort: React.Dispatch<
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
}
