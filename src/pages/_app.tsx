import React, { useEffect } from 'react';
import '@/styles/globals.scss';
import '@/styles/swiperjs-custom.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import { useFetcher } from '@/hooks/network/useFetcher';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { Layout } from '@/components/Layouts/Layout';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GoogleTagManager } from '@/components/Layouts/GoogleTagManager';
import Script from 'next/script';
import { useToken } from '@/hooks/authentication/useToken';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppInner = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { fetcher } = useFetcher();
  const { accountId, isTokenInitialized } = useToken();

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
      {/* GTMタグだけ先に描画されるのを避けるため必ず両方同時にチェック */}
      {(isTokenInitialized || accountId) && (
        <>
          {accountId && (
            <Script
              id="gtm-data-layer"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ account_id: '${accountId}' })
            `,
              }}
            />
          )}
          <GoogleTagManager />
        </>
      )}
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
        '/affiliate',
        '/amazongift',
        '/assign',
        '/document',
        '/editprofile',
        '/examplelist',
        '/howtouse',
        '/initpassword',
        '/login',
        '/newchatroom',
        '/notifysettings',
        '/passwordreset',
        '/passwordresetrequest',
        '/pointhistory',
        '/registration',
        '/welcome',
        '/seminar',
        '/seminar/archives',
        '/top',
      ].some((str) => url.toLowerCase().includes(str))
    ) {
      window.location.href = url.toLowerCase();
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

// 初回queryのundefined現象を解決する
App.getInitialProps = async () => ({ pageProps: {} });

export default App;
