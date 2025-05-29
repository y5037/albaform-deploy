'use client';

import FilterContainer from './components/FilterContainer';
import { useState } from 'react';
import { FilterResponsive, ListResponsive } from './styles';
import ContentsList from './components/ContentsList';

export default function AlbaTalk() {
  const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');

  return (
    <>
      <FilterResponsive>
        <FilterContainer isSort={isSort} setIsSort={setIsSort} />
      </FilterResponsive>
      <ListResponsive>
        <ContentsList />
      </ListResponsive>
    </>
  );
}
