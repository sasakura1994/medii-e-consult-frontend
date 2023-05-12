import React, { useCallback, useEffect } from 'react';
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
  const handleStart = useCallback(async (url: string) => {
    if (
      [
        '/',
        '/affiliate',
        '/AmazonGift',
        '/Document',
        '/EditProfile',
        '/HowToUse',
        '/InitPassword',
        '/login',
        '/NewChatRoom',
        '/NotifySettings',
        '/PasswordReset',
        '/PasswordResetRequest',
        '/PointHistory',
        '/registration',
      ].includes(url)
    ) {
      window.location.href = url;
      throw url;
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
  }, [handleStart, router.events]);

  return (
    <RecoilRoot>
      <AppInner {...props} />
    </RecoilRoot>
  );
};

export default App;
