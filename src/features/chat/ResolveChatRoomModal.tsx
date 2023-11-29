import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useState } from 'react';
import { KeyedMutator } from 'swr';
import { usePostResolveChatRoom } from '@/hooks/api/chat/usePostResolveChatRoom';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';

type ResolveChatRoomModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenReConsultSuggestionModal: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
};

export const ResolveChatRoomModal = (props: ResolveChatRoomModalProps) => {
  const { setIsOpen, setIsOpenReConsultSuggestionModal, chatRoomData, mutateChatRoom, setSelectedTab } = props;
  const [score, setScore] = useState<number>(5);
  const { resolveChatRoom } = usePostResolveChatRoom();

  return (
    <Modal className="w-full py-4 lg:w-[644px] lg:px-20" isCenter setShowModal={setIsOpen}>
      <p className="text-center text-sm text-text-secondary">解決済みとしてルームを閉じます</p>
      <p className="mt-2 text-center text-2xl font-bold">コンサルの評価を行ってください</p>
      <div className="my-5 border-b-2 border-border-divider" />
      <p className="text-center text-base font-bold text-[#333333]">
        このコンサルの評価をお願いします。
        <br />
        コンサルの評価は、次回以降の回答医割当の参考にし、
        <br />
        さらにサービスの改善に使用致します。
      </p>
      <p className="text-center text-base text-[#333333]">※回答医にはコンサルの評価は通知されません。</p>
      <div className="my-2 flex justify-center">
        <img src="icons/star-fill.svg" className="cursor-pointer" alt="star1" onClick={() => setScore(1)} />
        <img
          src={score >= 2 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
          className="cursor-pointer"
          alt="star2"
          onClick={() => setScore(2)}
        />
        <img
          src={score >= 3 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
          className="cursor-pointer"
          alt="star3"
          onClick={() => setScore(3)}
        />
        <img
          src={score >= 4 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
          className="cursor-pointer"
          alt="star4"
          onClick={() => setScore(4)}
        />
        <img
          src={score >= 5 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
          className="cursor-pointer"
          alt="star5"
          onClick={() => setScore(5)}
        />
      </div>
      <p className="text-center text-base text-[#333333]">
        回答医に対してお礼のコメントは済みましたか？
        <br />
        まだの方は、ルームに戻り
        <br />
        お礼コメントをしてみてください。
      </p>
      <div className="mt-6 flex justify-center space-x-8">
        <SecondaryButton className="w-[150px]" onClick={() => setIsOpen(false)}>
          ルームに戻る
        </SecondaryButton>
        <PrimaryButton
          className="w-[150px]"
          onClick={async () => {
            await resolveChatRoom({
              chat_room_id: chatRoomData.chat_room.chat_room_id,
              comment: '',
              score: score,
              system_comment: '',
            });
            await mutateChatRoom?.();
            setIsOpenReConsultSuggestionModal(true);
            setIsOpen(false);
            setSelectedTab('close');
          }}
        >
          確定
        </PrimaryButton>
      </div>
    </Modal>
  );
};
