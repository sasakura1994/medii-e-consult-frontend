import React from 'react';
import { useRecoilState } from 'recoil';
import { amazonGiftPointExchangeState } from './amazonGiftPointExchangeState';
import { amazonGiftCodeComfirmState } from './amazonGiftCodeComfirmState';
import { useToken } from '@/hooks/useToken';
import { useFetchCurrentPoint } from '@/features/mypages/pointHistory/useFetchCurrentPoint';
import { usePostAmazonGift } from './usePostAmazonGift';
import { usePostAmazonGiftCode } from './usePostAmazonGiftCode';
import { usePostAmazonGiftPinCode } from './usePostAmazonGiftPinCode';
import type { AmazonGiftPointExchangeType } from './amazonGiftPointExchange';
import type { AmazonGiftCodeComfirmType } from './amazonGiftCodeComfirm';

export type UseAmazonGiftType = {
  priceList: number[];
  currentPoint: number;
  pointExchangeState: AmazonGiftPointExchangeType;
  codeConfirmState: AmazonGiftCodeComfirmType;
  isSelectEnabled: (price: number) => boolean;
  selectPrice: (e: React.MouseEvent<HTMLButtonElement>, price: number) => void;
  exchangeConfirm: () => void;
  exchangeExec: (price: number) => void;
  closePointExchangeDialog: () => void;
  inputPinCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showGiftCode: (requestId: string, pinCode: string) => void;
  resendPinCode: (requestId: string) => void;
  closeCodeComfirmDialog: () => void;
};

export const useAmazonGift = (): UseAmazonGiftType => {
  const [amazonGiftPointExchange, setAmazonGiftPointExchange] = useRecoilState(
    amazonGiftPointExchangeState
  );
  const [amazonGiftCodeComfirm, setAmazonGiftCodeComfirm] = useRecoilState(
    amazonGiftCodeComfirmState
  );

  const token = useToken();

  const { currentPoint } = useFetchCurrentPoint(token);
  const { requestExchange } = usePostAmazonGift(token);
  const { requestGiftCode } = usePostAmazonGiftCode(token);
  const { requestPinCode } = usePostAmazonGiftPinCode(token);

  const isSelectEnabled = (price: number): boolean => {
    if (!currentPoint || currentPoint < price) {
      return true;
    }
    return false;
  };

  /**
   * 金額選択
   */
  const selectPrice = (
    e: React.MouseEvent<HTMLButtonElement>,
    price: number
  ) => {
    const target = e.target as HTMLButtonElement;
    const parent = target.parentNode;
    if (!parent) {
      return;
    }

    // スタイルをリセットする
    const buttons = parent.querySelectorAll('button');
    buttons.forEach((btn) => {
      btn.style.border = '';
      btn.style.fontWeight = 'normal';
    });

    // 選択状態のスタイルを適用する
    target.style.border = '2px solid #5c6bc0';
    target.style.fontWeight = '700';

    setAmazonGiftPointExchange((oldValues) => ({
      ...oldValues,
      price,
    }));
  };

  /**
   * ポイント交換確認ダイアログ表示
   */
  const exchangeConfirm = () => {
    setAmazonGiftPointExchange((oldValues) => ({
      ...oldValues,
      showExchangeDialog: true, // ダイアログ表示
      isExchange: false, // 交換未実行
      purchaseCompleted: false, // 交換未完了
    }));
  };

  /**
   * ポイント交換実行
   */
  const exchangeExec = (price: number) => {
    setAmazonGiftPointExchange((oldValues) => ({
      ...oldValues,
      showExchangeDialog: true, // ダイアログ表示
      isExchange: true, // 交換実行
      purchaseCompleted: false, // 交換未完了
    }));

    // 交換金額を送信する
    requestExchange(price);
  };

  /**
   * ポイント交換確認ダイアログ閉じる
   */
  const closePointExchangeDialog = () => {
    // デフォルトにリセット
    setAmazonGiftPointExchange((oldValues) => ({
      ...oldValues,
      price: 0,
      showExchangeDialog: false,
      isExchange: false,
      purchaseCompleted: false,
    }));
  };

  /**
   * PINコード入力
   */
  const inputPinCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmazonGiftCodeComfirm((oldValues) => ({
      ...oldValues,
      pinCode: e.target.value,
    }));
  };

  /**
   * ギフトコードの表示
   */
  const showGiftCode = (requestId: string, pinCode: string) => {
    requestGiftCode(requestId, pinCode);
  };

  /**
   * PINコード再送
   */
  const resendPinCode = (requestId: string) => {
    requestPinCode(requestId, false);
    setAmazonGiftCodeComfirm((oldValues) => ({
      ...oldValues,
      message: '確認コードを再送信しました。',
    }));
  };

  /**
   * ギフトコード確認ダイアログ閉じる
   */
  const closeCodeComfirmDialog = () => {
    // デフォルトにリセット
    setAmazonGiftCodeComfirm((oldValues) => ({
      ...oldValues,
      pinCode: '',
      requestId: '',
      giftCode: '',
      showComfirmDialog: false,
      message: '',
    }));
  };

  return {
    priceList: [1000, 3000, 5000, 10000],
    currentPoint: currentPoint || 0,
    pointExchangeState: amazonGiftPointExchange,
    codeConfirmState: amazonGiftCodeComfirm,
    isSelectEnabled,
    selectPrice,
    exchangeConfirm,
    exchangeExec,
    closePointExchangeDialog,
    inputPinCode,
    showGiftCode,
    resendPinCode,
    closeCodeComfirmDialog,
  };
};
