import React, { useEffect, useRef } from 'react';
import '@/styles/globals.scss';
import '@/styles/swiperjs-custom.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-popper-tooltip/dist/styles.css';
import { SWRConfig } from 'swr';
import { useFetcher } from '@/hooks/network/useFetcher';
import { CookiesProvider } from 'react-cookie';
import { Provider, useAtomValue } from 'jotai';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { Layout } from '@/components/Layouts/Layout';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GoogleTagManager } from '@/components/Layouts/GoogleTagManager';
import Script from 'next/script';
import { useToken } from '@/hooks/authentication/useToken';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { openModalCountState } from '@/globalStates/modal';
import 'react-day-picker/dist/style.css';
import '../components/Form/DateField.scss';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppInner = ({ Component, pageProps }: AppPropsWithLayout) => {
  const openModalCount = useAtomValue(openModalCountState);
  const { fetcher } = useFetcher();
  const { accountId, isTokenInitialized } = useToken();
  useAuthenticationOnPage();
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
      <GlobalStyle openModalCount={openModalCount} />
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
  // 認証が不要なページはsrc/hooks/authentication/useAuthenticationOnPage.tsに記載する
  const router = useRouter();
  const queryRef = useRef<ParsedUrlQuery>();

  const persistQuery = ['utm_source'];

  useEffect(() => {
    // 初回のクエリパラメータを保持
    const currentParams = new URLSearchParams(window.location.search);
    queryRef.current = Object.fromEntries(currentParams.entries());
  }, []);

  const replaceWithMergedQuery = () => {
    if (queryRef.current) {
      // 現在のページのクエリパラメータを取得
      const currentParams = new URLSearchParams(window.location.search);
      // 新しいクエリパラメータを作成
      const newParams = new URLSearchParams(queryRef.current as Record<string, string>);
      // 現在のクエリパラメータと新しいクエリパラメータをマージ
      newParams.forEach((value, key) => {
        if (persistQuery.includes(key) && !currentParams.has(key)) {
          currentParams.set(key, value);
        }
      });
      const newUrl = window.location.pathname + (currentParams.toString() ? '?' + currentParams.toString() : '');
      const absoluteUrl = new URL(newUrl, window.location.origin).toString();
      // URLを置き換えるだけでリダイレクトは行わない

      if (absoluteUrl !== window.location.href) {
        router.replace(newUrl);
      }
    }
  };

  const handleStart = (url: string) => {
    const absoluteUrl = new URL(url, window.location.origin);
    const currentQuery = new URLSearchParams(absoluteUrl.search);
    const newQuery = Object.fromEntries(currentQuery.entries());
    // クエリパラメータを保持
    queryRef.current = { ...queryRef.current, ...newQuery };
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', replaceWithMergedQuery);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', replaceWithMergedQuery);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <Provider>
      <AppInner {...props} />
    </Provider>
  );
};

// 初回queryのundefined現象を解決する
App.getInitialProps = async () => ({ pageProps: {} });

export default App;
