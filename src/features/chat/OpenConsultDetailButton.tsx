import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { Dispatch, SetStateAction } from 'react';
type OpenConsultDetailButtonProps = {
  isCloseRoom?: boolean;
  isChatRoomOwner?: boolean;
  chatRoomData: FetchChatRoomResponseData;
  setIsOpenReConsultConfirmModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenReplyRequestModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenTempResolveRequestModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenCloseChatRoomModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenResolveChatRoomModal: Dispatch<SetStateAction<boolean>>;
};

export const OpenConsultDetailButton = (props: OpenConsultDetailButtonProps) => {
  const {
    isCloseRoom,
    isChatRoomOwner,
    chatRoomData,
    setIsOpenReConsultConfirmModal,
    setIsOpenReplyRequestModal,
    setIsOpenTempResolveRequestModal,
    setIsOpenCloseChatRoomModal,
    setIsOpenResolveChatRoomModal,
  } = props;
  return (
    <>
      {!isCloseRoom && !isChatRoomOwner && (
        <>
          <button className="h-9 w-[78px] rounded-full bg-primary" onClick={() => setIsOpenReplyRequestModal(true)}>
            <p className="text-xs text-white">返答依頼</p>
          </button>
          <button
            className="h-9 w-[126px] rounded-full bg-primary"
            onClick={() => setIsOpenTempResolveRequestModal(true)}
          >
            <p className="text-xs text-white">コンサル終了依頼</p>
          </button>
          <button className="h-9 w-[78px] rounded-full bg-strong" onClick={() => setIsOpenCloseChatRoomModal(true)}>
            <p className="text-xs text-white">回答パス</p>
          </button>
        </>
      )}

      {isChatRoomOwner && chatRoomData.chat_room.room_type !== 'GROUP' && chatRoomData.members.length > 0 && (
        <button className="h-9 w-[138px] rounded-full bg-primary" onClick={() => setIsOpenReConsultConfirmModal(true)}>
          <p className="text-xs text-white">他の医師に相談する</p>
        </button>
      )}
      {!isCloseRoom && isChatRoomOwner && chatRoomData.members.length > 0 && (
        <button className="h-9 w-[78px] rounded-full bg-strong" onClick={() => setIsOpenResolveChatRoomModal(true)}>
          <p className="text-xs text-white">解決する</p>
        </button>
      )}
    </>
  );
};
