import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { usePostChatRoomReOpen } from '@/hooks/api/chat/usePostChatRoomReOpen';
import React, { useState } from 'react';
import { KeyedMutator } from 'swr';

type RoomReopenModalProps = {
  chatRoomID: string;
  setIsOpenRoomReopenModal: (isOpen: boolean) => void;
  mutateChatRoom: KeyedMutator<FetchChatRoomResponseData>;
};

export const RoomReopenModal = (props: RoomReopenModalProps) => {
  const { chatRoomID, setIsOpenRoomReopenModal, mutateChatRoom } = props;
  const [selectedReason, setSelectedReason] = useState<'unsolved' | 'thanks' | 'additional' | undefined>(undefined);
  const { reOpenChatRoom } = usePostChatRoomReOpen();

  return (
    <Modal className="w-[644px]" isCenter setShowModal={setIsOpenRoomReopenModal}>
      <div className="mx-[82px] my-[15px]">
        <p className="mt-9 text-2xl font-bold">このコンサルルームを再度オープンします</p>
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

        <div className="mb-10 flex justify-center space-x-4">
          <OutlinedButton className="w-[191px]" onClick={() => setIsOpenRoomReopenModal(false)}>
            キャンセル
          </OutlinedButton>
          <PrimaryButton
            className="w-[191px]"
            onClick={() => {
              reOpenChatRoom({ chat_room_id: chatRoomID, reason: selectedReason });
              setIsOpenRoomReopenModal(false);
              mutateChatRoom();
            }}
          >
            決定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
