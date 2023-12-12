import React from 'react';
import { Document } from '@/features/document';
import { NextPageWithLayout } from './_app';
import { ProfileRegistrationLayout } from '@/components/Layouts/ProfileRegistrationLayout';

const DocumentPage: NextPageWithLayout = () => {
  return <Document />;
};

export default DocumentPage;

DocumentPage.getLayout = (page) => <ProfileRegistrationLayout>{page}</ProfileRegistrationLayout>;
