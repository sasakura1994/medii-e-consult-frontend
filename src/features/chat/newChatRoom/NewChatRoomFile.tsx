import React from 'react';

type Props = {
  isImage: boolean;
  url: string;
  fileName: string;
  onDelete: () => void;
};

export const NewChatRoomFile = (props: Props) => {
  const { fileName, isImage, url, onDelete } = props;

  return (
    <div className="flex items-center gap-4">
      <div className="w-full grow">{isImage ? <img src={url} className="max-w-full" alt="" /> : <>{fileName}</>}</div>
      <div className="shrink-0 grow-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          <img src="icons/close.png" width="16" height="16" alt="Close" />
        </a>
      </div>
    </div>
  );
};
