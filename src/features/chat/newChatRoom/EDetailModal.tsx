import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { Heading } from '@/components/Parts/Text/Heading';
import PrimaryButton from '@/components/Button/PrimaryButton';

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
          <Heading as="h2" className="text-center">
            E-コンサルのご利用ありがとうございます。
          </Heading>
          <p>
            E-コンサルは患者の診断や治療方針に悩む医師が、 近くにいない専門領域の専門医に症例を相談できる
            完全無料のオンライン専門医相談サービスです。
          </p>
          <div className="flex justify-center gap-4">
            <PrimaryButton onClick={() => onClose()}>無料・匿名で相談する</PrimaryButton>
            <a href="https://medii.jp/e-consult" target="_blank" rel="nofollow noreferrer">
              <TertiaryButton>E-コンサルの詳細を見る</TertiaryButton>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
