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
          <TertiaryButton size="large" className="whitespace-nowrap px-4">
            閉じる
          </TertiaryButton>
        </Link>
      }
      submitButton={
        <div>
          <Link href="/newchatroom?from=onboarding_questionary_completed">
            <PrimaryButton size="large" className="whitespace-nowrap px-4">
              相談内容の編集に進む
            </PrimaryButton>
          </Link>
        </div>
      }
    >
      <p
        className="mx-auto mt-6 w-[300px] rounded-full bg-medii-blue-base px-4 py-1.5 text-center
       text-base font-semibold text-white lg:w-[400px]"
      >
        はじめてのコンサルで
        <br className="block lg:hidden" />
        1,000円相当のポイント進呈
      </p>
      <p className="mb-4 mt-3 px-3 text-center text-2xl font-semibold text-text-primary">
        アンケートにご回答された疑問を
        <br className="hidden lg:block" />
        経験豊富な専門医に相談してみませんか？
      </p>
      <div className="px-6 py-4">
        <TextArea
          disabled
          id="answerDetail"
          className="min-h-[160px] w-full resize-none disabled:text-text-primary"
          value={onboardingAnswered.title}
          labelText="回答いただいたご相談内容"
        />
        <p className="mt-4 text-center text-sm text-medii-blue-base">
          意見を仰ぎたい医師や内容は「相談内容の編集に進む」から編集・投稿いただけます
        </p>
      </div>
    </Modal>
  );
};
