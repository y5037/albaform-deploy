import { useForm } from 'react-hook-form';
import { EditCommentProps } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditCommentInput,
  editCommentSchema,
} from '@/schemas/updateCommentSchema';
import { useEditComments } from '@/hooks/mutation/useEditComments';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

export default function EditComment({
  content,
  editingCommentId,
  setEditingCommentId,
}: EditCommentProps) {
  const queryClient = useQueryClient();

  const { mutate: patchEditComment, isPending } = useEditComments();

  const { handleSubmit, register, watch } = useForm({
    resolver: zodResolver(editCommentSchema),
    mode: 'onChange',
  });

  const watched = watch();

  const handleEditSubmit = (formData: EditCommentInput) => {
    const { editComment } = formData;

    if (!editComment) return;

    patchEditComment(
      { commentId: editingCommentId, editComment },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
          setEditingCommentId(null);
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleEditSubmit)}>
        <textarea
          id='editComment'
          {...register('editComment')}
          defaultValue={content}
          className='w-full p-[14px] bg-background-200 rounded-[8px] font-light'
        />
        <div className='flex justify-self-end mt-[10px]'>
          <button
            onClick={() => setEditingCommentId(null)}
            className='h-[40px] border rounded-[8px] border-line-200 border-solid px-[20px] mr-[10px]'
          >
            취소
          </button>
          <button
            className='h-[40px] rounded-[8px] bg-orange-400 text-white min-w-[93px] text-center justify-items-center disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={
              isPending ||
              watched.editComment === '' ||
              watched.editComment === content
            }
          >
            {isPending ? (
              <Image
                src='/images/buttonLoader.gif'
                alt='Loading'
                width={25}
                height={10}
              />
            ) : (
              '수정하기'
            )}
          </button>
        </div>
      </form>
    </>
  );
}
