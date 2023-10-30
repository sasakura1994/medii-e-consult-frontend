import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { PostCloseChatRoomResponseData, usePostCloseChatRoom } from '@/hooks/api/chat/usePostCloseChatRoom';
import { KeyedMutator } from 'swr';

type CloseChatRoomModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
};

export const CloseChatRoomModal = (props: CloseChatRoomModalProps) => {
  const { setIsOpen, chatRoomData, mutateChatRoom } = props;
  const { closeChatRoom } = usePostCloseChatRoom();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <Modal className="w-full px-3 py-6 lg:w-[644px]" isCenter setShowModal={setIsOpen}>
      <p className="text-center text-2xl font-bold">回答をパスしてこのルームを閉じます</p>
      <div className="mt-6 flex justify-center space-x-8">
        <OutlinedButton className="w-[240px]" onClick={() => setIsOpen(false)}>
          ルームに戻る
        </OutlinedButton>
        <PrimaryButton
          className="w-[223px]"
          onClick={async () => {
            await closeChatRoom({
              chat_room_id: chatRoomData.chat_room.chat_room_id,
              comment: '',
              score: 0,
              system_comment: '',
            }).catch((e) => {
              const error = e as AxiosError<PostCloseChatRoomResponseData>;
              if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
              }
            });
            mutateChatRoom?.();
            setIsOpen(false);
          }}
        >
          送信
        </PrimaryButton>
      </div>
      {errorMessage && <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>}
    </Modal>
  );
};
