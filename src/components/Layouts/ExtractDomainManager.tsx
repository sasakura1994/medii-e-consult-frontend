import React from 'react';
import Script from 'next/script';

export const ExtractDomainManager: React.FC = () => {
  return (
    <Script
      id="edm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `{
          var head = document.getElementsByTagName('head')[0]
          var base = document.createElement('base')
          //ホストがmedii.jpドメインでない場合はサブディレクトリ挟んだbaseを指定する
          var baseDir
          if (location.hostname.includes('medii.jp') || location.hostname === 'localhost') {
            baseDir = '/'
          } else {
            baseDir = '/medii/' + location.pathname.split('/')[2] + '/'
          }
          base.setAttribute('href', baseDir)
          head.appendChild(base)
        }
      `,
      }}
    />
  );
};
