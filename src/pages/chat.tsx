import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layouts/Layout';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { Chat } from '@/features/chat/Chat';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';

type Query = {
  chat_room_id?: string;
};

const ChatPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { chat_room_id } = router.query as Query;
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

  return (
    <div className="h-screen overflow-hidden">
      <CustomHead />
      {(windowWidth && windowWidth >= 1024) || (!chat_room_id && windowWidth && windowWidth < 1024) ? (
        <Layout>
          <Chat />
        </Layout>
      ) : (
        <Chat />
      )}
    </div>
  );
};

export default ChatPage;

ChatPage.getLayout = (page) => {
  return <>{page}</>;
};
