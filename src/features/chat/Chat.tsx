import React from 'react';
import { ConsultList } from './ConsultList';
import { ConsultDetail } from './ConsultDetail';
import { useRouter } from 'next/router';
export const Chat = () => {
  const router = useRouter();
  const { chat_room_id } = router.query;
  return (
    <div className="flex bg-white">
      <ConsultList />
      {chat_room_id ? (
        <ConsultDetail />
      ) : (
        <div className="flex h-screen w-[787px] flex-col border border-[#d5d5d5] bg-bg" />
      )}
    </div>
  );
};
