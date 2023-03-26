import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="bg-white pt-20 pb-6">
      <div className="flex flex-col justify-center gap-10 md:gap-[126px] pl-20 md:flex-row md:pl-0">
        <div className="flex flex-col justify-center gap-[40px] md:flex-row">
          <img
            src="/images/side_logo.svg"
            alt="Medii E-コンサル"
            className="h-fit w-[156px]"
          />
          <p className="text-sm font-bold">
            どこにいても より良い医療を
            <br />
            全ての人に
          </p>
        </div>
        <div className="flex flex-col">
          {[
            { label: 'E-コンサルとは?', href: 'https://medii.jp/service' },
            { label: 'コーポレートサイト', href: 'https://medii.jp' },
            {
              label: 'お問い合わせ',
              href: 'https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6/',
            },
            {
              label: 'プライバシーポリシー',
              href: 'https://e-consult.medii.jp/PrivacyPolicy',
            },
          ].map((e) => (
            <Link href={e.href}>
              <a className="mb-4 text-[14px] font-bold text-primary">
                {e.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-[32px] py-6 md:py-0">
        <a href="https://www.facebook.com/medii0220/">
          <img src="/icons/facebook.svg" />
        </a>
        <a href="https://twitter.com/medii_inc">
          <img src="/icons/twitter.svg" />
        </a>
        <a href="https://note.com/medii_ecns/">
          <img src="/icons/note.svg" />
        </a>
      </div>
      <div>
        <p className="mt-4 text-center text-[11px] font-bold">
          ©Medii, Inc. All Rights Reserved
        </p>
      </div>
    </div>
  );
};
