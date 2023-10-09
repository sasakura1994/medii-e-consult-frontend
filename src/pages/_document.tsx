import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const baseDir = process.env.EX_WEB_DIR ? process.env.EX_WEB_DIR + '/' : '/';
export const Document = () => {
  return (
    <Html lang="ja">
      {/* This head tag is common to all pages */}
      <Head>
        <base href={baseDir} />
        <link rel="icon" href="favicon.ico" />
        <link rel="stylesheet" href="fonts.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
