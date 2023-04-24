import React from 'react';
import { NextPageWithLayout } from './_app';
import { Document } from '@/features/document';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';

const DocumentPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="-mt-10">
        <MyPageMenu />
      </div>
      <Document />
    </>
  );
};

export default DocumentPage;
DocumentPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
