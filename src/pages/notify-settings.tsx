import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { NotifySettingsContainer } from '@/components/Organisms/MyPage/NotifySettingsContainer';
import type { NextPageWithLayout } from '@/pages/_app';

const NotifySettings: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl leading-[2.2rem] text-center mb-10">
        マイページ
      </h1>
      <MyPageMenu />
      <NotifySettingsContainer />
    </>
  );
};

export default NotifySettings;

NotifySettings.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
