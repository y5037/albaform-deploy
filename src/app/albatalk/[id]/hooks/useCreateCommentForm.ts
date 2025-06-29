import { usePostComments } from '@/hooks/mutation/usePostComments';
import {
  CreateCommentInput,
  createCommentSchema,
} from '@/schemas/updateCommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';

export function useCreateCommentForm(
  postId: number,
  setPage: Dispatch<SetStateAction<number>>,
) {
  const queryClient = useQueryClient();

  const { mutate: patchCreateComment, isPending } = usePostComments();

  const form = useForm({
    resolver: zodResolver(createCommentSchema),
    mode: 'onChange',
  });

  const { setValue } = form;

  const onSubmit = (formData: CreateCommentInput) => {
    const { createComment } = formData;

    if (!postId || !createComment) return;

    patchCreateComment(
      { postId, createComment },
      {
        onSuccess: () => {
          ['comments', 'myComments', 'myPosts'].forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
          });
          setValue('createComment', '');
          setPage(1);
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
