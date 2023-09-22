import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { Dispatch, SetStateAction } from 'react';
type OpenConsultDetailButtonProps = {
  isCloseRoom?: boolean;
  isChatRoomOwner?: boolean;
  chatRoomData: FetchChatRoomResponseData;
  setIsOpenReConsultConfirmModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenRoomReopenModal: Dispatch<SetStateAction<boolean>>;
};

export const OpenConsultDetailButton = (props: OpenConsultDetailButtonProps) => {
  const { isCloseRoom, isChatRoomOwner, chatRoomData, setIsOpenReConsultConfirmModal, setIsOpenRoomReopenModal } =
    props;
  return (
    <>
      {!isCloseRoom && !isChatRoomOwner && (
        <>
          <button className="h-9 w-[78px] rounded-full bg-primary">
            <p className="text-xs text-white">返答依頼</p>
          </button>
          <button className="h-9 w-[126px] rounded-full bg-primary">
            <p className="text-xs text-white">コンサル終了依頼</p>
          </button>
          <button className="h-9 w-[78px] rounded-full bg-strong">
            <p className="text-xs text-white">回答パス</p>
          </button>
        </>
      )}

      {isChatRoomOwner && chatRoomData.chat_room.room_type !== 'GROUP' && (
        <button className="h-9 w-[138px] rounded-full bg-primary" onClick={() => setIsOpenReConsultConfirmModal(true)}>
          <p className="text-xs text-white">他の医師に相談する</p>
        </button>
      )}
      {!isCloseRoom && isChatRoomOwner && (
        <button className="h-9 w-[78px] rounded-full bg-strong">
          <p className="text-xs text-white">解決する</p>
        </button>
      )}
      {isCloseRoom && (
        <button className="h-9 w-[138px] rounded-full bg-primary" onClick={() => setIsOpenRoomReopenModal(true)}>
          <p className="text-xs text-white">このコンサルを再開する</p>
        </button>
      )}
    </>
  );
};
