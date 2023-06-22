import React from 'react';

type ConsultTitleProps = {
  chatRoomId: string;
  isUnreadConsult: boolean;
  title: string;
  latestMessage: string;
  lastUpdatedDate: string;
  ownerAccountId: string;
};

export const ConsultTitle = (props: ConsultTitleProps) => {
  const { title, latestMessage, lastUpdatedDate, isUnreadConsult } = props;
  const date = new Date(lastUpdatedDate);
  const formattedDate = date.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div
      className="h-auto min-h-[64px] cursor-pointer border-b border-[#d5d5d5] pb-2
       hover:bg-primary-light active:bg-primary-light"
    >
      <div className="flex items-center">
        {isUnreadConsult ? (
          <div className="mt-2 ml-3 h-[10px] w-[10px] rounded-full bg-[#63dce3] " />
        ) : (
          <div className="ml-5" />
        )}
        <p className="mt-2 ml-2 flex-grow text-l font-bold">{title}</p>
        <p className="mt-3 mr-3 text-xs">{formattedDate}</p>
      </div>
      <p className="ml-9 text-sm text-[#999999] line-clamp-2">
        {latestMessage}
      </p>
    </div>
  );
};
