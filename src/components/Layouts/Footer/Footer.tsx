import { contactUrl, faqUrl } from '@/data/constants';
import Link from 'next/link';
import React from 'react';

type Props = {
  noMenu?: boolean;
};

export const Footer = (props: Props) => {
  const { noMenu = false } = props;

  return (
    <div className="flex flex-col gap-4 bg-white py-4">
      {!noMenu && (
        <div className="flex flex-col justify-center gap-4 text-sm font-light lg:flex-row">
          <div className="flex justify-center gap-4">
            <a href={faqUrl} target="_blank" rel="noreferrer">
              よくある質問
            </a>
            <a href={contactUrl} target="_blank" rel="noreferrer">
              お問い合わせ
            </a>
            <a href="https://e-consult.medii.jp/doc/terms_of_usage.pdf" target="_blank" rel="noreferrer">
              利用規約
            </a>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/privacypolicy">プライバシーポリシー</Link>
            <a href="https://medii.jp" target="_blank" rel="noreferrer">
              運営会社
            </a>
          </div>
        </div>
      )}
      <div className="text-center text-medii-sm font-light">&copy;Medii, Inc. All Right Reserved</div>
    </div>
  );
};
