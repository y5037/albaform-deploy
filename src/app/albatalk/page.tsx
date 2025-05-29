'use client';

import { ResponsiveStyle } from '@/styles/responsiveStyle';
import FilterContainer from './components/FilterContainer';
import { useState } from 'react';

export default function AlbaTalk() {
  const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');

  return (
    <ResponsiveStyle>
      <FilterContainer isSort={isSort} setIsSort={setIsSort} />
    </ResponsiveStyle>
  );
}
