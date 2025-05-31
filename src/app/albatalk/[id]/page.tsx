'use client';

import { useGetPostsById } from '@/hooks/query/useGetPostsById';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import { useParams } from 'next/navigation';
import DetailContainer from './components/DetailContainer';
import CommentContainer from './components/CommentContainer';

export default function DetailPage() {
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

  const { data } = useGetPostsById(postId);

  console.log(data);

  return (
    <ResponsiveStyle>
      <DetailContainer />
      <CommentContainer />
    </ResponsiveStyle>
  );
}
