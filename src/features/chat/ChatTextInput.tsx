import React, { useRef, useEffect } from 'react';

export const ChatTextInput = () => {
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = () => {
    if (textInputRef.current) {
      textInputRef.current.style.height = '40px';
      textInputRef.current.style.height = `${textInputRef.current.scrollHeight}px`;
      if (textInputRef.current.scrollHeight > 400) {
        textInputRef.current.style.height = '400px';
        textInputRef.current.style.overflowY = 'scroll';
      }
    }
  };

  useEffect(() => {
    resizeHeight();
  }, []);

  return (
    <div className="relative">
      <div className="absolute bottom-0 flex w-full bg-white">
        <textarea
          ref={textInputRef}
          onChange={resizeHeight}
          className="ml-2 flex w-[682px] resize-none rounded border border-solid border-block-gray py-1 px-2
          placeholder-gray-600 disabled:bg-[#d5d5d5] disabled:text-block-gray"
          placeholder="メッセージを入力 (Shift + Enterキーで送信)"
        />
        <img
          src="/icons/clip_message.svg"
          alt=""
          className="my-auto ml-3 h-[30px] w-[30px]"
        />
        <img
          src="/icons/send_message.svg"
          alt=""
          className="my-auto ml-3 h-[30px] w-[30px]"
        />
      </div>
    </div>
  );
};
