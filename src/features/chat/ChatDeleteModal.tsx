import { GrayButton } from '@/components/Parts/Button/GrayButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { useDeleteMessage } from '@/hooks/api/chat/useDeleteMessage';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React from 'react';
import { KeyedMutator } from 'swr';

type ChatDeleteModalProps = {
  chatRoomId: string;
  chatUid: number;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
};

export const ChatDeleteModal = (props: ChatDeleteModalProps) => {
  const { chatRoomId, chatUid, setIsOpenDeleteModal, mutateChatRoom } = props;
  const { deleteChat } = useDeleteMessage();
  return (
    <Modal isCenter setShowModal={setIsOpenDeleteModal} className="min-w-[644px] pt-9">
      <p className="text-center text-2xl font-bold">このメッセージを削除しますか？</p>
      <p className="text-center text-base text-[#333333]">削除後はもとに戻すことはできません。</p>
      <div className="my-10 flex justify-center space-x-4">
        <GrayButton className="lg:w-[223px]" onClick={() => setIsOpenDeleteModal(false)}>
          キャンセル
        </GrayButton>
        <button
          className="h-9 rounded-full bg-strong px-8 lg:w-[223px]"
          onClick={async () => {
            await deleteChat({ chat_room_id: chatRoomId, uid: chatUid });
            await mutateChatRoom?.();
            setIsOpenDeleteModal(false);
          }}
        >
          <p className="font-bold text-white drop-shadow-button">削除する</p>
        </button>
      </div>
    </Modal>
  );
};
