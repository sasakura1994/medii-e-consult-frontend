import React from 'react';
import Welcome from '@/features/welcome';
import { NextPageWithLayout } from './_app';
import { Layout } from '@/components/Layouts/Layout';
import { CustomHead } from '@/components/Commons/CustomHead';

const WelcomePage: NextPageWithLayout = () => {
  return <Welcome />;
};

export default WelcomePage;

WelcomePage.getLayout = (page) => (
  <>
    <CustomHead />
    <Layout headerFigure="logoOnly">{page}</Layout>
  </>
);
