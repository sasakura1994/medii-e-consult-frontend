import { atom } from 'recoil';
import type { AmazonGiftCodeComfirmType } from './amazonGiftCodeComfirm';

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
