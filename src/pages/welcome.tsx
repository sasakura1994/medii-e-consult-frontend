import React from 'react';
import Welcome from '@/features/welcome';
import { NextPageWithLayout } from './_app';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { LayoutLogoOnly } from '@/components/Layouts/LayoutLogoOnly';

const WelcomePage: NextPageWithLayout = () => {
  return <Welcome />;
};

export default WelcomePage;

WelcomePage.getLayout = (page) => (
  <>
    <CustomHead />
    <LayoutLogoOnly>{page}</LayoutLogoOnly>
  </>
);
