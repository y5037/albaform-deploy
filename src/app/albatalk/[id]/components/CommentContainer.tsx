import Image from 'next/image';
import KebabDropdown from './KebabDropdown';
import { CommentsProps } from '../types';
import Pagination from '@/components/pagination/Pagination';
import { formattedDate } from '@/utils/formattedDate';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import DetailSkeleton from './DetailSkeleton';
import Empty from '@/components/empty/Empty';

export default function CommentContainer({
  userId,
  comments,
  page,
  setPage,
  totalPages,
  showModal,
  setShowModal,
  mainMessage,
  setMainMessage,
  subMessage,
  setSubMessage,
  modalType,
  setModalType,
  isLoading,
  isFetching,
  onSuccess,
}: CommentsProps) {
  const [postId, setPostId] = useState<number>();
  const [profileImg, setProfileImg] = useState<Record<string, string>>({});

  const defaultProfileImg = '/images/defaultProfile.svg';
  const handleProfileImgError = (src: string) => {
    setProfileImg((prev) => ({ ...prev, [src]: defaultProfileImg }));
  };

  const handleSubmit = () => {};

  return (
    <>
      {showModal && modalType === 'deletePost' && (
        <Modal
          $deleteComment
          showModal={showModal}
          setShowModal={setShowModal}
          mainMessage={mainMessage}
          subMessage={subMessage}
          deletePostId={postId}
          onSuccess={onSuccess}
        />
      )}
      <div
        className={`mt-[40px] text-right ${
          (!isLoading || !isFetching) && comments.length === 0
            ? 'mb-[-20px]'
            : 'mb-[80px]'
        }`}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            name='comment'
            placeholder='댓글을 입력해주세요'
            className='w-full p-[14px] bg-background-200 rounded-[8px] font-light'
          />
          <button className='mt-[16px] bg-orange-400 rounded-[8px] px-[50px] h-[60px] text-white font-medium text-[18px]'>
            등록하기
          </button>
        </form>
      </div>
      {(!isLoading || !isFetching) && comments.length === 0 ? (
        <Empty comments />
      ) : (
        <>
          {(isLoading || isFetching) && <DetailSkeleton $comment />}
          <div>
            {comments?.map((comment) => {
              const { writer } = comment;
              return (
                <div
                  key={comment.id}
                  className='pb-[24px] border-b border-solid border-line-200'
                >
                  <div className='flex items-center justify-between text-gray-500 font-light text-[16px] mb-[37px] mt-[48px]'>
                    <div className='flex items-center'>
                      <Image
                        src={
                          profileImg[String(writer?.imageUrl)] ||
                          writer?.imageUrl ||
                          defaultProfileImg
                        }
                        alt='기본 프로필'
                        width={26}
                        height={26}
                        className='mr-[5px] rounded-[50%] object-cover border border-gray500 min-h-[26px]'
                        onError={() =>
                          handleProfileImgError(String(writer?.imageUrl))
                        }
                      />
                      <p>{writer.nickname}</p>
                      <div className='ml-[15px] mr-[15px] w-[1px] h-[20px] bg-line-200' />
                      <p>{formattedDate(comment.createdAt)}</p>
                    </div>
                    {userId && writer.id && (
                      <KebabDropdown
                        $deleteComment
                        postId={comment.id}
                        setPostId={setPostId}
                        setShowModal={setShowModal}
                        setMainMessage={setMainMessage}
                        setModalType={setModalType}
                        setSubMessage={setSubMessage}
                      />
                    )}
                  </div>
                  <div className='whitespace-pre-wrap font-light'>
                    {comment.content}
                  </div>
                </div>
              );
            })}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </>
      )}
    </>
  );
}
