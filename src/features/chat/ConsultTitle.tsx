import React from 'react';

type ConsultTitleProps = {
  chatRoomId: string;
  title: string;
  latestMessage: string;
  lastUpdatedDate: string;
  ownerAccountId: string;
};

export const ConsultTitle = (props: ConsultTitleProps) => {
  const { chatRoomId, title, latestMessage, lastUpdatedDate } = props;
  const date = new Date(lastUpdatedDate);
  const formattedDate = date.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div
      key={chatRoomId}
      className="h-auto min-h-[64px] cursor-pointer border-b border-[#d5d5d5] pb-2
       hover:bg-primary-light active:bg-primary-light"
    >
      <div className="flex">
        <p className="mt-2 ml-9 flex-grow text-l font-bold">{title}</p>
        <p className="mt-3 mr-3 text-xs">{formattedDate}</p>
      </div>
      <p className="ml-9 text-sm text-[#999999] line-clamp-2">
        {latestMessage}
      </p>
    </div>
  );
};
