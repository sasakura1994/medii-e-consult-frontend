import React from 'react';
import { Layout } from '@/components/Layouts/Layout';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { Chat } from '@/features/chat/Chat';
import { NextPageWithLayout } from './_app';

const ChatPage: NextPageWithLayout = () => {
  return (
    <>
      <CustomHead />
      <Layout>
        <Chat />
      </Layout>
    </>
  );
};

export default ChatPage;

ChatPage.getLayout = (page) => {
  return <>{page}</>;
};
