import React from 'react';
import { Document } from '@/features/document';
import { NextPageWithLayout } from './_app';

const DocumentPage: NextPageWithLayout = () => {
  return <Document />;
};

export default DocumentPage;

DocumentPage.getLayout = (page) => <>{page}</>;
