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
        <Link
          href="/top"
          onClick={() => {
            postEventLog({ name: 'click-top-page-button-from-onboarding-modal' });
          }}
        >
          <TertiaryButton size="large" className="block w-full whitespace-nowrap px-4 lg:hidden">
            閉じる
          </TertiaryButton>
          <TertiaryButton size="large" className="hidden w-full whitespace-nowrap px-4 lg:block">
            トップページに戻る
          </TertiaryButton>
        </Link>
      }
      submitButton={
        <Link
          href="/newchatroom?from=onboarding_questionary_completed"
          onClick={() => {
            postEventLog({ name: 'click-newchatroom-page-button-from-onboarding-modal', parameter: '202312' });
          }}
        >
          <PrimaryButton size="large" className="block w-full whitespace-nowrap px-4 lg:hidden">
            相談内容の編集に進む
          </PrimaryButton>
          <PrimaryButton size="large" className="hidden w-full whitespace-nowrap px-4 lg:block">
            相談の編集に進む（無料・匿名）
          </PrimaryButton>
        </Link>
      }
    >
      <p
        className="mx-auto mt-6 w-[323px] rounded-full bg-medii-blue-base px-4 py-1.5
                    text-center text-base font-semibold text-white lg:w-[452px]"
      >
        はじめての相談で、
        <br className="block lg:hidden" />
        さらに3,000円相当のポイント進呈
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
          アンケートでご回答いただいた内容をもとにエキスパート専門医へご相談いただくと、追加で3,000ポイントを進呈いたします。
        </p>
        <TextArea
          disabled
          id="answerDetail"
          className="min-h-[64px] w-full resize-none disabled:text-text-primary"
          value={onboardingAnswered?.title}
          labelText="回答いただいたご相談内容"
        />
      </div>
      <div className="flex flex-col gap-4 px-6 py-4 pb-0">
        <p className="font-semibold">注意事項</p>
        <ul className="ml-4 list-disc text-xs">
          <li>
            E-コンサルでのご相談によるポイント進呈は、一般的な医学知識に関する相談ではなく、現在診療中の患者に関する相談に限ります。
          </li>
          <li>すでに診断がついている場合、治療を開始している場合でも構いません。</li>
          <li>エキスパート専門医の指定方法は問いません。</li>
          <li>ご相談が「解決」の状態になっていない場合、ポイントの進呈が遅れる可能性がございます。</li>
        </ul>
        <p>以下のいずれかに当てはまる場合、進呈の対象外となる可能性がございます。</p>
        <ul className="ml-4 list-disc text-xs">
          <li>過去と同一の相談や、再コンサル機能を利用した相談</li>
          <li>相談の目的や求める回答が、エキスパート専門医に理解できる形で明確に記載されていないもの</li>
          <li>
            患者さんの情報（年齢、性別、既往歴、服用薬、既に実施した検査結果、症状、所見など）が極度に少なく回答しづらいもの
          </li>
          <li>主治医としての見解が記載されていないもの エキスパート専門医への返信や最後のお礼がないもの</li>
        </ul>
      </div>
    </Modal>
  );
};
