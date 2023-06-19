import React, { useRef, useEffect } from 'react';

export const ChatTextInput = () => {
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = () => {
    if (textInputRef.current) {
      textInputRef.current.style.height = '42px';
      textInputRef.current.style.height = `${textInputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeHeight();
  }, []);

  return (
    <div className="relative">
      <div className="absolute bottom-0 w-full">
        <textarea
          ref={textInputRef}
          onChange={resizeHeight}
          className="flex w-[682px] resize-none rounded border border-solid border-block-gray py-1 px-2
          disabled:bg-[#d5d5d5] disabled:text-block-gray"
          placeholder="メッセージを入力 (Shift + Enterキーで送信)"
        />
      </div>
    </div>
  );
};
