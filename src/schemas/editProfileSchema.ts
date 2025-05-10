import { z } from 'zod';

export const editProfileSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임은 필수입니다' }),
  store: z.string().min(1, {message:'가게 이름(상호명)을 필수로 입력해주세요'}),
  storeTel: z.string().min(1, {message:'가게 전화번호는 필수입니다'}),
  address: z.string().min(1, {message:'가게 위치 설정은 필수입니다'}),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
