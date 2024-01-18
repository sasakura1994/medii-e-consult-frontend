import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import TertiaryButton from '@/components/Button/TertiaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';

type Props = {
  onClose: () => void;
};

export const EDetailModal = (props: Props) => {
  const { onClose } = props;

  return (
    <Modal
      className="px-6 py-6 lg:w-[644px]"
      setShowModal={(isShow) => {
        if (isShow) {
          onClose();
        }
      }}
      isCenter
    >
      <div className="flex flex-col items-center" data-testid="e-detail-modal">
        <div className="my-5 flex flex-col gap-4">
          <p>E-コンサルのご利用ありがとうございます。</p>
          <p>
            E-コンサルは患者の診断や治療方針に悩む医師が、 近くにいない専門領域の専門医に症例を相談できる
            完全無料のオンライン専門医相談サービスです。
          </p>
          <p>詳細は以下をご確認ください。</p>
          <a href="https://medii.jp/e-consult" target="_blank" rel="nofollow noreferrer">
            <SecondaryButton>E-コンサルサービス紹介ページ</SecondaryButton>
          </a>
        </div>
        <div className="my-6">
          <TertiaryButton onClick={() => onClose()}>閉じる</TertiaryButton>
        </div>
      </div>
    </Modal>
  );
};
