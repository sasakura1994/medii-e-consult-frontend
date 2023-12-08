import React, { useCallback } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { onboardingAnsweredState } from '@/globalStates/onboarding';
import TextArea from '@/components/TextArea/TextArea';
import { useAtomValue } from 'jotai';

export const OnboardingConsultPointModal = () => {
  const onboardingAnswered = useAtomValue(onboardingAnsweredState);
  const { postEventLog } = useEventLog();

  const showOnboardingConsultPointModal = useCallback(async () => {
    await postEventLog({ name: 'show-first-consult-campaign-popup' });
  }, [postEventLog]);

  showOnboardingConsultPointModal();

  return (
    <Modal
      isCenter
      disableCloseOnOverlayClick
      pcWidth="600"
      dataTestId="onboarding-questionary-modal"
      isUseFooter
      closeButton={
        <Link href="/top">
          <TertiaryButton size="large" className="w-full whitespace-nowrap px-4">
            トップページに戻る
          </TertiaryButton>
        </Link>
      }
      submitButton={
        <div>
          <Link href="/newchatroom?from=onboarding_questionary_completed">
            <PrimaryButton size="large" className="w-full whitespace-nowrap px-4">
              相談の編集に進む（無料・匿名）
            </PrimaryButton>
          </Link>
        </div>
      }
    >
      <p
        className="mx-auto mt-6 w-[323px] rounded-full bg-medii-blue-base px-4 py-1.5
                    text-center text-base font-semibold text-white lg:w-[452px]"
      >
        はじめての相談で、
        <br className="block lg:hidden" />
        さらに1,000円相当のポイント進呈
      </p>
      <p className="mb-4 mt-3 px-3 text-center text-2xl font-semibold text-text-primary">
        アンケートの回答
        <br className="block lg:hidden" />
        ありがとうございました
      </p>
      <div className="flex flex-col gap-4 px-6 py-4 pb-0">
        <p>
          アンケートへのご回答、ありがとうございます。500ポイントを進呈いたしました。
          <br />
          アンケートでご回答いただいた内容をそのままエキスパート専門医へご相談いただくと、追加で1000ポイントを進呈いたします。
        </p>
        <TextArea
          disabled
          id="answerDetail"
          className="min-h-[64px] w-full resize-none disabled:text-text-primary"
          value={onboardingAnswered?.title}
          labelText="回答いただいたご相談内容"
        />
      </div>
    </Modal>
  );
};
