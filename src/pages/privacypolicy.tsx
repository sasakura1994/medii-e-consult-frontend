import React from 'react';
import PrivacyPolicy from '@/features/privacypolicy';
import { NextPageWithLayout } from './_app';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { PublicLayout } from '@/components/Layouts/PublicLayout';

const PrivacyPolicyPage: NextPageWithLayout = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;

PrivacyPolicyPage.getLayout = (page) => (
  <>
    <CustomHead />
    <PublicLayout>{page}</PublicLayout>
  </>
);
