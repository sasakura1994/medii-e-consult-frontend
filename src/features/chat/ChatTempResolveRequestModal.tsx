import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import {
  TempResolveChatRoomResponseData,
  usePostTempResolveChatRoom,
} from '@/hooks/api/chat/usePostTempResolveChatRoom';
import { KeyedMutator } from 'swr';

type ChatTempResolveRequestModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
};

export const ChatTempResolveRequestModal = (props: ChatTempResolveRequestModalProps) => {
  const { setIsOpen, chatRoomData, mutateChatRoom } = props;
  const { tempResolveChatRoom } = usePostTempResolveChatRoom();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <Modal className="w-[644px] px-20 py-4" isCenter setShowModal={setIsOpen}>
      <p className="text-center text-2xl font-bold">コンサル終了依頼を送信しますか？</p>
      <p className="mt-4 text-center">コンサル終了を促すシステムメッセージが質問医師へ通知されます</p>
      <div className="mt-6 flex justify-center space-x-8">
        <OutlinedButton onClick={() => setIsOpen(false)}>キャンセル</OutlinedButton>
        <PrimaryButton
          onClick={async () => {
            await tempResolveChatRoom({ chat_room_id: chatRoomData.chat_room.chat_room_id }).catch((e) => {
              const error = e as AxiosError<TempResolveChatRoomResponseData>;
              if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
              }
            });
            mutateChatRoom?.();
            setIsOpen(false);
          }}
        >
          送信する
        </PrimaryButton>
      </div>
      {errorMessage && <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>}
    </Modal>
  );
};
