import React from 'react';
import { useRecoilState } from 'recoil';
import { amazonGiftPointExchangeState } from '@/globalStates/amazonGiftPointExchangeState';
import { amazonGiftCodeComfirmState } from '@/globalStates/amazonGiftCodeComfirmState';
import { useFetchCurrentPoint } from '@/hooks/useFetchCurrentPoint';
import { usePostAmazonGift } from '@/hooks/usePostAmazonGift';
import { usePostAmazonGiftCode } from '@/hooks/usePostAmazonGiftCode';
import { usePostAmazonGiftPinCode } from '@/hooks/usePostAmazonGiftPinCode';
import type { AmazonGiftPointExchangeType } from '@/types/amazonGiftPointExchange';
import type { AmazonGiftCodeComfirmType } from '@/types/amazonGiftCodeComfirm';

export type UseAmazonGiftType = {
  priceList: number[];
  currentPoint: number;
  pointExchangeState: AmazonGiftPointExchangeType;
  codeConfirmState: AmazonGiftCodeComfirmType;
  isSelectEnabled: (price: number) => boolean;
  selectPrice: (e: React.MouseEvent<HTMLButtonElement>, price: number) => void;
  exchangeConfirm: () => void;
  exchangeExec: () => void;
  closePointExchangeDialog: () => void;
  inputPinCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showGiftCode: () => void;
  resendPinCode: () => void;
  closeCodeComfirmDialog: () => void;
};

export const useAmazonGift = (): UseAmazonGiftType => {
  const [amazonGiftPointExchange, setAmazonGiftPointExchange] = useRecoilState(
    amazonGiftPointExchangeState
  );
  const [amazonGiftCodeComfirm, setAmazonGiftCodeComfirm] = useRecoilState(
    amazonGiftCodeComfirmState
  );

  const { currentPoint } = useFetchCurrentPoint();
  const { requestExchange } = usePostAmazonGift();
  const { requestGiftCode } = usePostAmazonGiftCode();
  const { requestPinCode } = usePostAmazonGiftPinCode();

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

    // setPrice(price);
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
  const exchangeExec = () => {
    setAmazonGiftPointExchange((oldValues) => ({
      ...oldValues,
      showExchangeDialog: true, // ダイアログ表示
      isExchange: true, // 交換実行
      purchaseCompleted: false, // 交換未完了
    }));

    // 交換金額を送信する
    requestExchange(amazonGiftPointExchange.price);
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
  const showGiftCode = () => {
    requestGiftCode(
      amazonGiftCodeComfirm.requestId,
      amazonGiftCodeComfirm.pinCode
    );
  };

  /**
   * PINコード再送
   */
  const resendPinCode = () => {
    requestPinCode(amazonGiftCodeComfirm.requestId, false);
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
