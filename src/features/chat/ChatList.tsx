import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';

export const ChatList = () => {
  return (
    <div className="h-3/4 overflow-scroll bg-bg pb-2">
      <OtherChat />
      <MyChat />
    </div>
  );
};
