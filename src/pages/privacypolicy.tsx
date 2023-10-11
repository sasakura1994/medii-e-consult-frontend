import React from 'react';
import PrivacyPolicy from '@/features/privacypolicy';
import { NextPageWithLayout } from './_app';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { LayoutLogoOnly } from '@/components/Layouts/LayoutLogoOnly';

const PrivacyPolicyPage: NextPageWithLayout = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;

PrivacyPolicyPage.getLayout = (page) => (
  <>
    <CustomHead />
    <LayoutLogoOnly isPublicPage = {true}>{page}</LayoutLogoOnly>
  </>
);
