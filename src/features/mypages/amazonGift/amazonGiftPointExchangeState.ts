import { atom } from 'jotai';
import type { AmazonGiftPointExchangeType } from './amazonGiftPointExchange';

export const amazonGiftPointExchangeState = atom<AmazonGiftPointExchangeType>({
  price: 0,
  showExchangeDialog: false,
  isExchange: false,
  purchaseCompleted: false,
});
