import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { NotifySettings } from '@/features/mypages/notifySettings/NotifySettings';
import type { NextPageWithLayout } from '@/pages/_app';

const NotifySettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      <NotifySettings />
    </>
  );
};

export default NotifySettingsPage;

NotifySettingsPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
