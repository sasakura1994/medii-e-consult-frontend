import { atom } from 'jotai';
import type { AmazonGiftCodeComfirmType } from './amazonGiftCodeComfirm';

export const amazonGiftCodeComfirmState = atom<AmazonGiftCodeComfirmType>({
  pinCode: '',
  requestId: '',
  giftCode: '',
  showComfirmDialog: false,
  message: '',
});
