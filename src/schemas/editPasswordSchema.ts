import { z } from 'zod';

export const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export type EditPasswordInput = z.infer<typeof passwordSchema>;
