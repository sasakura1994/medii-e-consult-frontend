import SecondaryButton from '@/components/Button/SecondaryButton';
import Link from 'next/link';
import React from 'react';

const OnBoardingQuestionaryCompletedPage = () => {
  return (
    <div className="mx-6 mt-[64px] flex flex-col items-center">
      <div className="text-center text-xxxl font-semibold text-medii-blue-base">
        アンケートの回答
        <br className="lg:hidden" />
        ありがとうございます
      </div>
      <div className="mt-6 text-md leading-6 lg:text-center">
        アンケート回答のお礼として100ポイントを付与いたします。
        <br className="hidden lg:inline" />
        1,000ポイント以上貯まると、1ポイントを1円のAmazonポイントに変換してお使いいただけます。
      </div>
      <div className="mt-6 w-full">
        <Link href="/pointhistory">
          <a>
            <SecondaryButton size="large" className="mx-auto w-full px-4 lg:w-auto">
              ポイントを確認する
            </SecondaryButton>
          </a>
        </Link>
      </div>
      <Link href="/top">
        <a>
          <div className="mt-6 flex gap-1 text-md text-secondary">
            <div>トップページに移動する</div>
            <img src="/icons/arrow-right-short.svg" alt="" width="16" height="16" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default OnBoardingQuestionaryCompletedPage;
