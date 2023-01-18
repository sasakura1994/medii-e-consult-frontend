import React from 'react';
import '@/styles/globals.scss'
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return <Component {...pageProps} />
}

export default App;
