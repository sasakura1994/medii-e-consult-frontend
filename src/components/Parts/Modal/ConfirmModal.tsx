import React, { ReactNode } from 'react';
import { Modal } from './Modal';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';

type Props = {
  children: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onCancel: () => void;
};

export const ConfirmModal = (props: Props) => {
  const { children, okText, cancelText, onOk, onCancel } = props;
  return (
    <Modal isCenter className="p-8">
      {children}
      <div className="mt-4 flex justify-center gap-4">
        <TertiaryButton size="large" onClick={onCancel}>
          {cancelText ?? 'キャンセル'}
        </TertiaryButton>
        <PrimaryButton size="large" onClick={onOk} className="min-w-[100px]">
          {okText ?? 'OK'}
        </PrimaryButton>
      </div>
    </Modal>
  );
};
