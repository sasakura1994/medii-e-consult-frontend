import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';

import { Modal } from '@/components/Parts/Modal/Modal';
import React from 'react';
import { useChatFirstMessageEditModal } from './useChatFirstMessageEditModal';
import { UseChat } from './useChat';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';

export type ChatFirstMessageEditModalProps = Pick<UseChat, 'updateMessageMutate'> & {
  chatRoomId: string;
  firstMessage: ChatData;
  onClose: () => void;
};

export const ChatFirstMessageEditModal = (props: ChatFirstMessageEditModalProps) => {
  const { onClose } = props;
  const { errorMessage, message, setMessage, update } = useChatFirstMessageEditModal(props);

  return (
    <Modal className="w-full lg:w-[644px]" isCenter setShowModal={() => onClose()}>
      <div className="p-3 lg:mx-[82px] lg:my-[15px]">
        <p className="my-8 text-center text-2xl font-bold">E-コンサル コンサル文編集</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
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
          <div className="mb-10 mt-8 flex justify-end space-x-4">
            <SecondaryButton className="grow lg:grow-0" onClick={() => onClose()}>
              キャンセル
            </SecondaryButton>
            <PrimaryButton className="grow lg:grow-0" type="submit">
              コンサル文を更新
            </PrimaryButton>
          </div>
        </form>
        {errorMessage && <p className="text-center">{errorMessage}</p>}
      </div>
    </Modal>
  );
};
