import React from 'react';
import { useGroupRoomTitle } from './useGroupRoomTitle';

type ConsultTitleProps = {
  groupRoomId: string;
  isUnreadConsult: boolean;
  title: string;
  latestMessage: string;
  lastUpdatedDate: string;
  ownerAccountId: string;
};

export const GroupRoomTitle = (props: ConsultTitleProps) => {
  const { groupRoomId, isUnreadConsult, title, latestMessage, lastUpdatedDate, ownerAccountId } = props;
  const { isSelected, formattedDate, isExistDraft } = useGroupRoomTitle({
    groupRoomId,
    lastUpdatedDate,
    ownerAccountId,
  });

  return (
    <div
      className={`h-auto min-h-[64px] cursor-pointer border-b border-[#d5d5d5] pb-2
       hover:bg-[#d0f0ea] active:bg-[#d0f0ea] ${isSelected && 'bg-[#d0f0ea]'}`}
    >
      <div className="flex items-center">
        {isUnreadConsult ? (
          <div className="ml-3 mt-2 h-[10px] w-[10px] rounded-full bg-[#63dce3] " />
        ) : (
          <div className="ml-5" />
        )}
        <p className="ml-2 mt-2 flex-grow text-l font-bold">{title}</p>
        <p className="mr-3 mt-3 text-xs">{formattedDate}</p>
      </div>
      {isExistDraft && <img src="icons/edit.svg" alt="下書きあり" className="ml-auto mr-5" />}
      <p className="ml-9 mr-3 line-clamp-2 text-sm text-[#999999]">{latestMessage}</p>
    </div>
  );
};
