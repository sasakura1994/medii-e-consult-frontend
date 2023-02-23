import { atom } from 'recoil';
import type { AmazonGiftCodeComfirmType } from '@/types/amazonGiftCodeComfirm';

export const amazonGiftCodeComfirmState = atom<AmazonGiftCodeComfirmType>({
  key: 'amazonGiftComfirm',
  default: {
    pinCode: '',
    requestId: '',
    giftCode: '',
    showComfirmDialog: false,
    message: '',
  },
});
