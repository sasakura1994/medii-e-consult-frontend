import { Modal } from '@/components/Parts/Modal/Modal';
import React from 'react';
import { StyledSpinner } from './styled';

const RectSpinnerDialog = () => {
  return (
    <Modal className="min-h-[166px] w-[610px] border" isCenter>
      <div className="grid justify-items-center text-center">
        <div className="m-5 flex items-center justify-center">
          <StyledSpinner className=" h-[70px] w-[70px] border-4 border-primary" />
        </div>
        <div className="mt-3">アップロード中</div>
      </div>
    </Modal>
  );
};

export default RectSpinnerDialog;
