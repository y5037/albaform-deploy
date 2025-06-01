'use client';

import { useGetPostsById } from '@/hooks/query/useGetPostsById';
import { ResponsiveStyle } from '@/styles/responsiveStyle';
import { useParams } from 'next/navigation';
import DetailContainer from './components/DetailContainer';
import CommentContainer from './components/CommentContainer';
import { useState } from 'react';

export default function DetailPage() {
  const [isShowComments, setIsShowComments] = useState(false);

  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id ?? '';

  const { data: post } = useGetPostsById(postId);

  const handleToggleComments = () => {
    setIsShowComments((prev) => !prev);
  };

  return (
    <ResponsiveStyle>
      <DetailContainer
        post={post}
        handleToggleComments={handleToggleComments}
      />
      <div
        className={`transition-all duration-500 ${
          isShowComments
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-y4'
        }`}
      >
        <CommentContainer />
      </div>
    </ResponsiveStyle>
  );
}
