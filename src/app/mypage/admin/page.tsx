'use client';

import { ResponsiveStyle } from '@/styles/responsiveStyle';
import FilterContainer from './components/FilterContainer';
import HeadContainer from './components/HeadContainer';
import { useState } from 'react';
import ListContainer from './components/ListContainer';
import { useGetMyContents } from '@/hooks/query/useUser';
import { ListData } from '../types';

export default function mypage() {
  const [selectedTab, setSelectedTab] = useState<'post' | 'comment'>('post');
  const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');

  const { data: listData } = useGetMyContents(selectedTab, isSort) as {
    data: ListData[];
  };

  return (
    <ResponsiveStyle>
      <HeadContainer />
      <FilterContainer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isSort={isSort}
        setIsSort={setIsSort}
      />
      <ListContainer selectedTab={selectedTab} listData={listData} />
    </ResponsiveStyle>
  );
}
