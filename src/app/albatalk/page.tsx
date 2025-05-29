'use client';

import FilterContainer from './components/FilterContainer';
import { useState } from 'react';
import { ResponsiveContainer } from './styles';

export default function AlbaTalk() {
  const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');

  return (
    <ResponsiveContainer>
      <FilterContainer isSort={isSort} setIsSort={setIsSort} />
    </ResponsiveContainer>
  );
}
