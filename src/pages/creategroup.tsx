import React from 'react';
import { NextPageWithLayout } from './_app';
import { CreateGroup } from '@/features/createGroup';
import { Header } from '@/components/Layouts/Header/Header';
import { FooterSpMenu } from '@/components/Layouts/Footer/FooterSpMenu';

const CreateGroupPage: NextPageWithLayout = () => {
  return <CreateGroup />;
};
CreateGroupPage.getLayout = (page: React.ReactElement) => {
  return (
    <div className="h-full min-h-screen w-full bg-bg pb-16 lg:pb-0">
      <Header />
      {page}
      <FooterSpMenu />
    </div>
  );
};
export default CreateGroupPage;
