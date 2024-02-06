import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';

import { Modal } from '@/components/Parts/Modal/Modal';
import React, { useState } from 'react';

type ChatFirstMessageEditModalProps = {
  defaultMessage: string;
  onClose: () => void;
};

export const ChatFirstMessageEditModal = (props: ChatFirstMessageEditModalProps) => {
  const { defaultMessage, onClose } = props;
  const [errorMessage /*, setErrorMessage*/] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState(defaultMessage);

  return (
    <Modal className="w-full lg:w-[644px]" isCenter setShowModal={() => onClose()}>
      <div className="p-3 lg:mx-[82px] lg:my-[15px]">
        <p className="my-8 text-center text-2xl font-bold">E-コンサル コンサル文編集</p>
        <div className="mb-4 text-base font-bold">コンサル文</div>
        <div>
          <ExpandTextArea
            name="first_message"
            className="min-h-[140px] text-[13px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="mb-10 mt-8 flex justify-center space-x-4">
          <SecondaryButton className="w-[223px]" onClick={() => onClose()}>
            キャンセル
          </SecondaryButton>
          <PrimaryButton className="w-[223px]" onClick={async () => {}}>
            ルームを更新
          </PrimaryButton>
        </div>
        {errorMessage && <p className="text-center">{errorMessage}</p>}
      </div>
    </Modal>
  );
};
