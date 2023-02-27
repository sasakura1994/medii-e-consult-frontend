import { atom } from 'recoil';
import type { AmazonGiftPointExchangeType } from './amazonGiftPointExchange';

export const amazonGiftPointExchangeState = atom<AmazonGiftPointExchangeType>({
  key: 'amazonGiftPointExchange',
  default: {
    price: 0,
    showExchangeDialog: false,
    isExchange: false,
    purchaseCompleted: false,
  },
});
