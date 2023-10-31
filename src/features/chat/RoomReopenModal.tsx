import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import React from 'react';
import { KeyedMutator } from 'swr';
import { useRoomReopenModal } from './useRoomReopenModal';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';

type RoomReopenModalProps = {
  chatRoomID: string;
  isChatRoomOwner?: boolean;
  setIsOpenRoomReopenModal: (isOpen: boolean) => void;
  mutateChatRoom: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList: KeyedMutator<ChatRoomEntity[]>;
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
};

export const RoomReopenModal = (props: RoomReopenModalProps) => {
  const { chatRoomID, isChatRoomOwner, setIsOpenRoomReopenModal, mutateChatRoom, mutateChatRoomList, setSelectedTab } =
    props;
  const { selectedReason, setSelectedReason, reOpenChatRoom } = useRoomReopenModal({
    isChatRoomOwner: isChatRoomOwner,
  });

  return (
    <Modal className="w-full px-3 lg:w-[644px]" isCenter setShowModal={setIsOpenRoomReopenModal}>
      <div className="mx-2 lg:mx-[82px] lg:my-[15px]">
        <p className="mt-9 text-2xl font-bold">このコンサルルームを再度オープンします</p>
        {isChatRoomOwner ? (
          <div className="mb-9 mt-3 text-center text-sm font-bold">
            <p className="mb-3">再度オープンの理由をお聞かせください</p>
            <div className="inline-block text-left">
              <label className="mt-2 block text-sm font-bold">
                <input
                  className="mr-1"
                  type="radio"
                  name="open_reason"
                  value="unsolved"
                  onChange={() => setSelectedReason('unsolved')}
                />
                解決前にクローズしてしまった
              </label>
              <label className="mt-2 block text-sm font-bold">
                <input
                  className="mr-1"
                  type="radio"
                  name="open_reason"
                  value="thanks"
                  onChange={() => setSelectedReason('thanks')}
                />
                最後にお礼等のコメントをしたい
              </label>
              <label className="mt-2 block text-sm font-bold">
                <input
                  className="mr-1"
                  type="radio"
                  name="open_reason"
                  value="additional"
                  onChange={() => setSelectedReason('additional')}
                />
                同じ症例内で追加の質問をしたい
              </label>
            </div>
          </div>
        ) : (
          <div className="mb-3 mt-3 text-center text-sm font-bold">
            <p className="mt-2 block text-sm font-bold">質問医への確認や、患者さんの逆紹介時などにご利用ください。</p>
          </div>
        )}

        <div className="mb-10 flex justify-center space-x-4">
          <SecondaryButton className="w-[191px]" onClick={() => setIsOpenRoomReopenModal(false)}>
            キャンセル
          </SecondaryButton>
          <PrimaryButton
            className="w-[191px]"
            onClick={async () => {
              await reOpenChatRoom({ chat_room_id: chatRoomID, reason: selectedReason });
              setIsOpenRoomReopenModal(false);
              mutateChatRoom();
              mutateChatRoomList();
              setSelectedTab('open');
            }}
          >
            決定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
