import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="ja">
      {/* This head tag is common to all pages */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
