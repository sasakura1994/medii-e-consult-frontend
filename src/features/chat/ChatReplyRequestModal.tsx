import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useState } from 'react';
import {
  PostChatRoomSendResponseRequestResponseData,
  usePostChatRoomSendResponseRequest,
} from '@/hooks/api/chat/usePostChatRoomSendResponseRequest';
import { AxiosError } from 'axios';

type ChatReplyRequestModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoomData: FetchChatRoomResponseData;
};

export const ChatReplyRequestModal = (props: ChatReplyRequestModalProps) => {
  const { setIsOpen, chatRoomData } = props;
  const { sendResponseRequest } = usePostChatRoomSendResponseRequest();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <Modal className="w-full px-3 py-6 lg:w-[644px]" isCenter setShowModal={setIsOpen}>
      <p className="text-center text-2xl font-bold">返答依頼を送信しますか？</p>
      <p className="mt-4 text-center">返答を依頼するシステムメッセージが質問医師へ通知されます</p>
      <div className="mt-6 flex justify-center space-x-8">
        <OutlinedButton className="w-[223px]" onClick={() => setIsOpen(false)}>
          キャンセル
        </OutlinedButton>
        <PrimaryButton
          className="w-[223px]"
          onClick={async () => {
            const res = await sendResponseRequest({ chat_room_id: chatRoomData.chat_room.chat_room_id }).catch((e) => {
              const error = e as AxiosError<PostChatRoomSendResponseRequestResponseData>;
              if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
              }
            });
            if (res) {
              setIsOpen(false);
            }
          }}
        >
          送信する
        </PrimaryButton>
      </div>
      {errorMessage && <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>}
    </Modal>
  );
};
