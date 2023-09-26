import React, { useEffect, cloneElement, ReactElement, ReactHTML, ReactNode } from 'react';
import '@/styles/globals.scss';
import '@/styles/swiperjs-custom.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-popper-tooltip/dist/styles.css';
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


// Headタグを追加する
function addBaseTagToHead(node: React.ReactNode): ReactNode {
  const baseDir = process.env.EX_WEB_DIR ? process.env.EX_WEB_DIR + '/' : '/';
  // ReactNodeがReact要素であることを確認
  if (!React.isValidElement(node)) {
    return node;
  }
  // React要素の型を取得
  const elementType = node.type as keyof ReactHTML;
  if (elementType !== 'head') {
    return node;
  }
  // ReactElementをReactElementとしてキャスト
  const headElement = node as ReactElement;
  // head要素にbase要素を追加
  return cloneElement(
    headElement,
    {},
    headElement.props.children,
    (<base href={baseDir} />)
  );
}


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
        {addBaseTagToHead(getLayout(<Component {...pageProps} />))}
      </SWRConfig>
    </CookiesProvider>
  );
};

const App = (props: AppPropsWithLayout) => {
  const router = useRouter();
  const handleStart = (url: string) => {
    const absoluteUrl = new URL(url, window.location.origin);
    const pathname = absoluteUrl.pathname.toLowerCase();
    // 同じページに遷移する場合は画面のリダイレクトを行わない
    if (router.pathname.toLowerCase() === pathname) {
      return;
    }
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
      ].some((str) => pathname.includes(str))
    ) {
      absoluteUrl.pathname = pathname;
      window.location.href = absoluteUrl.toString();
      throw 'routeChange aborted.';
    }
  };
  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
