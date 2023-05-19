import React, { useEffect } from 'react';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import { useFetcher } from '@/hooks/network/useFetcher';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import { CustomHead } from '@/components/Commons/CustomHead';
import { Layout } from '@/components/Layouts/Layout';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppInner = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { fetcher } = useFetcher();
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <CustomHead />
        <Layout>{page}</Layout>
      </>
    ));

  return (
    <CookiesProvider>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    </CookiesProvider>
  );
};

const App = (props: AppPropsWithLayout) => {
  const router = useRouter();
  const handleStart = (url: string) => {
    if (
      [
        '/',
        '/top',
        '/assign',
        '/seminar',
        '/seminar/archive',
        '/affiliate',
        '/amazongift',
        '/document',
        '/editprofile',
        '/howtouse',
        '/initpassword',
        '/login',
        '/newchatroom',
        '/notifysettings',
        '/passwordreset',
        '/passwordresetrequest',
        '/pointhistory',
        '/registration',
      ].includes(url)
    ) {
      window.location.href = url;
      throw 'routeChange aborted.';
    }
  };
  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
  }, [router]);

  return (
    <RecoilRoot>
      <AppInner {...props} />
    </RecoilRoot>
  );
};

export default App;
