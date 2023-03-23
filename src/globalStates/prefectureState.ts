import { atom } from 'recoil';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';

export const prefectureState = atom<PrefectureEntityType[]>({
  key: 'prefecture',
  default: undefined,
});
