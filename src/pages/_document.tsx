import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="ja">
      {/* This head tag is common to all pages */}
      <Head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
