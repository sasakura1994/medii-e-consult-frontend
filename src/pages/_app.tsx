import React from 'react';
import '@/styles/globals.scss';
import { CustomHead } from '@/components/Commons/CustomHead';
import { Layout } from '@/components/Layouts/Layout';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <CustomHead />
        <Layout>{page}</Layout>
      </>
    ));

  return getLayout(<Component {...pageProps} />);
};

export default App;
