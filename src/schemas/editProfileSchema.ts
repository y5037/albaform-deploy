import { z } from 'zod';

export const editProfileSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요' }),
  store: z.string().min(1, { message: '가게 이름(상호명)을 입력해주세요' }),
  storeTel: z.string().min(1, { message: '가게 전화번호를 입력해주세요' }),
  ownerTel: z.string(),
  address: z.string().min(1, { message: '가게 위치를 설정해주세요' }),

  xCoord:z.number().optional(),
  yCoord:z.number().optional(),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
