import React, { useEffect, useState } from 'react';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { Chat } from '@/features/chat/Chat';
import { isChatRoomSelectedState } from '@/globalStates/chat';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { FooterSpMenu } from '@/components/Layouts/Footer/FooterSpMenu';
import { Header } from '@/components/Layouts/Header/Header';

type Query = {
  chat_room_id?: string;
};

const ChatPage = () => {
  const router = useRouter();
  const { chat_room_id } = router.query as Query;
  const [isChatRoomSelected, setIsChatRoomSelected] = useAtom(isChatRoomSelectedState);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chat_room_id) {
      setIsChatRoomSelected(true);
    }
  }, [chat_room_id, setIsChatRoomSelected]);

  return (
    <>
      <CustomHead />
      {windowWidth && windowWidth >= 1024 ? (
        <div className="h-[100dvh] overflow-hidden">
          <Header />
          <Chat />
        </div>
      ) : isChatRoomSelected ? (
        <div className="h-[100dvh] overflow-hidden">
          <Chat />
        </div>
      ) : (
        <div className="h-[100dvh] overflow-hidden">
          <Header />
          <Chat />
          <FooterSpMenu />
        </div>
      )}
    </>
  );
};

export default ChatPage;

ChatPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};
