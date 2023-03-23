import { atom } from 'recoil';
import type { EmailEntityType } from '@/types/entities/emailEntity';

export const emailState = atom<EmailEntityType>({
  key: 'email',
  default: undefined,
});
