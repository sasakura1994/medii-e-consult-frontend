import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { ColoredImage } from '@/components/Image/ColoredImage';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Optional } from '@/components/Parts/Form/Optional';
import { Radio } from '@/components/Parts/Form/Radio';
import { Required } from '@/components/Parts/Form/Required';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import TextField from '@/components/TextField/TextField';
import { QuestionaryItems } from '@/features/onboarding/QuestionaryItems';
import { useOnBoardingQuestionary } from '@/features/onboarding/useOnBoardingQuestionary';
import React from 'react';

const OnBoardingQuestionaryPage = () => {
  const {
    checkIsCheckboxRequired,
    isSending,
    otherOpenedQuestionIds,
    questionAndAnswers,
    setAnswer,
    setOther,
    submit,
    toggleAnswers,
    toggleOther,
  } = useOnBoardingQuestionary();

  return (
    <div className="mx-6 mb-10 mt-5 max-w-[1024px] lg:mx-auto lg:mt-10">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbItem>アンケート</BreadcrumbItem>
      </Breadcrumb>
      <h2 className="mt-2 text-xxl font-semibold">日常診療についてのアンケート</h2>
      <div className="mt-2 text-md">
        アンケート回答のお礼として100ポイントをプレゼントします。ポイント付与はおひとりさま１回のみです。
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
                <h3 className="text-md font-bold">{question.text}</h3>
                {question.required ? <Required>必須</Required> : <Optional>任意</Optional>}
              </div>
              {question.type === 'SingleChoice' ? (
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
              ) : (
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
              {question.other_enable && (
                <>
                  <div className="mt-1">
                    <CheckBox
                      label="その他"
                      name={`questionary_item${question.id}_other`}
                      checked={otherOpenedQuestionIds.includes(question.id)}
                      onChange={() => toggleOther(question.id)}
                    />
                  </div>
                  {otherOpenedQuestionIds.includes(question.id) && (
                    <TextField
                      className="mt-1 w-[350px]"
                      value={answer.other}
                      placeholder="その他を選んだ方は具体的に教えてください。"
                      onChange={(e) => setOther(question.id, e.target.value)}
                      required
                    />
                  )}
                </>
              )}
            </section>
          ))}
        </div>
        <div className="mt-2 flex gap-2 bg-bg-secondary p-4">
          <div className="pt-1">
            <ColoredImage
              src="icons/exclamation-triangle.svg"
              color="#16191D"
              width="16"
              height="16"
              className="opacity-20"
            />
          </div>
          <div className="text-base font-light leading-6">
            <div>
              E-コンサルでは、診断・治療方針における疑問をMediiが審査した信頼できる専門医に
              <span className="font-semibold text-medii-blue-base">無料・匿名</span>で相談できます。
            </div>
            <ul className="ml-6 list-disc">
              <li>指定難病 99%※を含む、全診療科の相談に対応</li>
              <li>患者情報を取り扱い等、日本の医療機関が準拠するセキュリティ基準に対応した安全な仕組み</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          {isSending ? (
            <SpinnerBorder />
          ) : (
            <PrimaryButton size="large" className="px-4">
              アンケートを送信する
            </PrimaryButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default OnBoardingQuestionaryPage;
