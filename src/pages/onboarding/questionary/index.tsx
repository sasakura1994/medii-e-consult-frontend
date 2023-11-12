/* eslint-disable no-irregular-whitespace */
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { ColoredImage } from '@/components/Image/ColoredImage';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';
import { Optional } from '@/components/Parts/Form/Optional';
import { Radio } from '@/components/Parts/Form/Radio';
import { Required } from '@/components/Parts/Form/Required';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { QuestionaryItems } from '@/features/onboarding/QuestionaryItems';
import { useOnBoardingQuestionary } from '@/features/onboarding/useOnBoardingQuestionary';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';
import React from 'react';

const OnBoardingQuestionaryPage = () => {
  const { checkIsCheckboxRequired, isSending, questionAndAnswers, setAnswer, setOther, submit, toggleAnswers } =
    useOnBoardingQuestionary();
  const { postEventLog } = useEventLog();

  useEventLog({ name: 'view-onboarding-questionary' });

  return (
    <div className="mx-6 mb-10 mt-5 max-w-[1024px] lg:mx-auto lg:mt-4">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbItem>アンケート</BreadcrumbItem>
      </Breadcrumb>
      <h2 className="mt-2 text-xxl font-semibold">日常診療についてのアンケート</h2>
      <div className="mt-2 text-md">
        E-コンサルへのご登録ありがとうございます。
        <br />
        先生方が日常診療で感じる臨床疑問•不安を解決すべく、どのような課題や不安をお抱えになっているかお伺いしています。
        <br />
        アンケート回答のお礼として500ポイントを進呈いたします。ポイント付与はおひとりさま1回のみです。
      </div>
      <div className="mt-2 text-medii-sm font-light text-secondary">
        ※アンケートの回答は統計的に処理され、特定の個人が識別できる情報として公表されることはありません。
        <br />
        ※1,000ポイント以上貯まると、1ポイントを1円のAmazonポイントに変換してお使いいただけます。
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="mt-10 flex flex-col gap-6">
          {questionAndAnswers.map(({ question, answer }) => (
            <section key={question.id}>
              <div className="flex items-center gap-2">
                <h3 className="text-md font-bold">
                  {question.text}
                  {question.required ? (
                    <Required className="lg:relative lg:top-[-2px]" isInline>
                      必須
                    </Required>
                  ) : (
                    <Optional className="lg:relative lg:top-[-2px]" isInline>
                      任意
                    </Optional>
                  )}
                </h3>
              </div>
              {question.type === 'SingleChoice' && (
                <QuestionaryItems itemCount={question.items.length}>
                  {question.items.map((item) => (
                    <Radio
                      key={item.id}
                      label={item.text}
                      name={`questionary_item${question.id}`}
                      value={item.id.toString()}
                      checked={item.id === answer.value}
                      onChange={() => setAnswer(question.id, item.id)}
                      required={question.required}
                    />
                  ))}
                </QuestionaryItems>
              )}
              {question.type === 'MultiChoice' && (
                <QuestionaryItems itemCount={question.items.length}>
                  {question.items.map((item) => (
                    <CheckBox
                      key={item.id}
                      label={item.text}
                      name={`questionary_item${question.id}_${item.id}`}
                      value={item.id.toString()}
                      checked={answer.values.includes(item.id)}
                      onChange={() => toggleAnswers(question.id, item.id)}
                      required={checkIsCheckboxRequired(question.id)}
                    />
                  ))}
                </QuestionaryItems>
              )}
              {question.type === 'TextOnly' && (
                <ExpandTextArea
                  name={`other${question.id}`}
                  className="mt-2 min-h-[112px] w-full"
                  value={answer.other}
                  placeholder={question.other_hint}
                  onChange={(e) => setOther(question.id, e.target.value)}
                  required={question.required}
                />
              )}
            </section>
          ))}
        </div>
        <div className="mt-2 flex gap-2 bg-bg-secondary p-4">
          <div className="shrink-0 pt-1">
            <ColoredImage
              src="icons/exclamation-triangle.svg"
              color="#16191D"
              width="16px"
              height="16px"
              className="opacity-20"
            />
          </div>
          <div className="text-base font-light leading-6">
            <div>
              E-コンサルでは、診断・治療方針における疑問をMediiが審査した信頼できる専門医に
              <span className="font-semibold text-medii-blue-base">無料・匿名</span>で相談できます。
            </div>
            <ul className="ml-6 list-disc">
              <li className="relative">
                指定難病 99%<span className="relative top-[-3px] inline-block text-medii-sm">※</span>
                を含む、全診療科の相談に対応
              </li>
              <li>患者情報を取り扱い等、日本の医療機関が準拠するセキュリティ基準に対応した安全な仕組み</li>
            </ul>
            <div className="mt-4 text-medii-sm font-light leading-[18px] text-secondary">
              ※難病情報センター「令和３年度末現在　特定医療費（指定難病）受給者証所持者数」を元に、E-コンサルで相談可能な指定難病の患者数の割合を算出。
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          {isSending ? (
            <SpinnerBorder />
          ) : (
            <div className="flex">
              <div
                onClick={async () => {
                  await postEventLog({ name: 'click-answer-later' });
                }}
              >
                <Link href={'/top'}>
                  <SecondaryButton size="large" className="mr-10 px-4">
                    あとでアンケートに回答する
                  </SecondaryButton>
                </Link>
              </div>
              <PrimaryButton size="large" className="px-4">
                アンケートを送信する
              </PrimaryButton>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default OnBoardingQuestionaryPage;
