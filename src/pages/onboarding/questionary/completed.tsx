import TertiaryButton from '@/components/Button/TertiaryButton';
import { OnboardingConsultPointModal } from '@/features/onboarding/OnboardingConsultPointModal';
import Link from 'next/link';
import React from 'react';

const OnBoardingQuestionaryCompletedPage = () => {
  return (
    <>
      <div className="mx-6 mt-[64px] flex flex-col items-center">
        <div className="text-center text-[24px] font-semibold">
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
              <TertiaryButton size="large" className="mx-auto w-full px-4 lg:w-auto">
                ポイントを確認する
              </TertiaryButton>
            </a>
          </Link>
        </div>
      </div>
      <OnboardingConsultPointModal />
    </>
  );
};

export default OnBoardingQuestionaryCompletedPage;
