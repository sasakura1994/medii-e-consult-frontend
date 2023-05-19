import React from 'react';
import { NextPageWithLayout } from './_app';
import { Document } from '@/features/document';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { MyPageLayoutWithoutSpFooterMenu } from '@/components/Layouts/MyPageLayoutWithoutSpFooterMenu';

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
  return (
    <MyPageLayoutWithoutSpFooterMenu>{page}</MyPageLayoutWithoutSpFooterMenu>
  );
};
