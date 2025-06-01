export interface PostDetailProps {
  post: PostData;
  handleToggleComments: () => void;
}

type WriterType = {
  id: number;
  imageUrl: string;
  nickname: string;
};

export interface PostData {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  writer: WriterType;
}
