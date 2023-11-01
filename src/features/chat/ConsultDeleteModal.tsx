import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { useDeleteChatRoom } from '@/hooks/api/chat/useDeleteChatRoom';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useRouter } from 'next/router';
import React from 'react';
import { KeyedMutator } from 'swr';

type ConsultDeleteModalProps = {
  chatRoomData: FetchChatRoomResponseData;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
};

export const ConsultDeleteModal = (props: ConsultDeleteModalProps) => {
  const { chatRoomData, setIsOpenDeleteModal, mutateChatRoomList } = props;
  const { deleteChatRoom } = useDeleteChatRoom();
  const router = useRouter();
  return (
    <Modal className="w-full lg:w-[644px]" isCenter setShowModal={setIsOpenDeleteModal}>
      <div className="lg:mx-[82px] lg:my-[15px]">
        <p className="my-8 text-center text-2xl font-bold">E-コンサル ルーム削除</p>
        <p className="text-center text-base"> このルームを削除します。</p>
        <p className="text-center text-base"> よろしいですか？</p>

        <div className="my-10 flex justify-center space-x-4">
          <OutlinedButton className="w-[223px]" onClick={() => setIsOpenDeleteModal(false)}>
            キャンセル
          </OutlinedButton>
          <PrimaryButton
            className="w-[223px] bg-strong"
            onClick={async () => {
              await deleteChatRoom({ chat_room_id: chatRoomData.chat_room.chat_room_id });
              await mutateChatRoomList?.();
              await router.push('/chat');
              setIsOpenDeleteModal(false);
            }}
          >
            削除する
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
