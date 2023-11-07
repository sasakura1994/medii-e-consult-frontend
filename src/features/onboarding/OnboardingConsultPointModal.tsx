import React, { useCallback, useState } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { useRecoilValue } from 'recoil';
import { whatListenState } from '@/globalStates/onboarding';

export const OnboardingConsultPointModal = () => {
  const [isClosed, setIsClosed] = useState(false);
  const { flag: isFirstConsultCampaignAvailable, isLoading: isLoadingFlag } = useFetchFlag('FirstConsultCampaign');
  const whatListen = useRecoilValue(whatListenState);
  const { postEventLog } = useEventLog();

  const showOnboardingConsultPointModal = useCallback(async () => {
    await postEventLog({ name: 'show-first-consult-campaign-popup' });
  }, [postEventLog]);

  if (isClosed || isFirstConsultCampaignAvailable !== true || isLoadingFlag) {
    return <></>;
  }

  showOnboardingConsultPointModal();

  return (
    <Modal
      className="w-full bg-white lg:w-[600px]"
      isCenter
      setShowModal={() => {
        setIsClosed(true);
      }}
      dataTestId="onboarding-questionary-modal"
    >
      <p
        className="mx-auto mt-6 w-[300px] rounded-full bg-medii-blue-base px-4 py-1.5 text-center
       text-base font-bold text-white lg:w-[400px]"
      >
        はじめてのコンサルで
        <br className="block lg:hidden" />
        1,000円相当のポイント進呈
      </p>
      <p className="mb-4 mt-3 px-3 text-center text-2xl font-bold text-text-primary">
        アンケートにご回答された疑問を
        <br className="hidden lg:block" />
        経験豊富な専門医に相談してみませんか？
      </p>
      <div className="px-6 py-4">
        <p className="mb-2 text-base font-bold text-text-primary">回答いただいたご相談内容</p>
        <TextArea
          disabled
          name=""
          className="h-40 w-full resize-none disabled:bg-bg-secondary disabled:text-text-primary"
          value={whatListen}
        />
        <p className="mt-4 text-center text-sm text-medii-blue-base">
          意見を仰ぎたい医師や内容は「相談内容の編集に進む」から編集・投稿いただけます
        </p>
      </div>

      <div className="flex justify-end gap-4 self-stretch p-4">
        <TertiaryButton
          size="large"
          onClick={() => {
            setIsClosed(true);
          }}
        >
          閉じる
        </TertiaryButton>

        <div>
          <Link href="/newchatroom?from=onboarding_questionary_completed" className="flex-1">
            <PrimaryButton size="large">相談内容の編集に進む</PrimaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
