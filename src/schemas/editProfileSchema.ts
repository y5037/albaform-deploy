import { z } from 'zod';

// 공통 필드 정의
export const baseUserSchema = z.object({
  imageUrl: z.string(),
  name: z.string(),
  nickname: z.string(),
  store: z.string(),
  storeTel: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
});

export const ownerProfileSchema = baseUserSchema.extend({
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  store: z.string().min(1, '상호명을 입력해주세요'),
  storeTel: z.string().min(1, '가게 전화번호를 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
});

export const applicatnProfileSchema = baseUserSchema.extend({
  name: z.string().min(1, '이름을 입력해주세요'),
  store: z.string().min(1, '상호명을 입력해주세요'),
  storeTel: z.string().min(1, '가게 전화번호를 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
});

export type EditProfileInput = z.infer<typeof ownerProfileSchema>;
