import { z } from 'zod';

export const editProfileSchema = z.object({
  imageUrl: z.string().optional(),
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요' }),
  store: z.string().min(1, { message: '가게 이름(상호명)을 입력해주세요' }),
  storeTel: z.string().min(1, { message: '가게 전화번호를 입력해주세요' }),
  ownerTel: z.string().optional(),
  address: z.string().min(1, { message: '가게 위치를 설정해주세요' }),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
