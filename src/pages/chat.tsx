import React from 'react';
import { Layout } from '@/components/Layouts/Layout';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { Chat } from '@/features/chat/Chat';
import { NextPageWithLayout } from './_app';

const ChatPage: NextPageWithLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <CustomHead />
      <Layout>
        <Chat />
      </Layout>
    </div>
  );
};

export default ChatPage;

ChatPage.getLayout = (page) => {
  return <>{page}</>;
};
