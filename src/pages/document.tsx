import React from 'react';
import { Document } from '@/features/document';
import { NextPageWithLayout } from './_app';
import { MyPageLayoutWithoutSpFooterMenu } from '@/components/Layouts/MyPageLayoutWithoutSpFooterMenu';

const DocumentPage: NextPageWithLayout = () => {
  return <Document />;
};

export default DocumentPage;

DocumentPage.getLayout = (page) => (
  <MyPageLayoutWithoutSpFooterMenu>{page}</MyPageLayoutWithoutSpFooterMenu>
);
