import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Radio } from '@/components/Parts/Form/Radio';
import TextField from '@/components/TextField/TextField';
import { QuestionaryItems } from '@/features/onboarding/QuestionaryItems';
import { useOnBoardingQuestionary } from '@/features/onboarding/useOnBoardingQuestionary';
import React from 'react';

const OnBoardingQuestionaryPage = () => {
  const { checkIsCheckboxRequired, questionAndAnswers, setAnswer, setOther, submit, toggleAnswers } =
    useOnBoardingQuestionary();

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
              <h3 className="text-md font-bold">{question.text}</h3>
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
                      required
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
                <TextField
                  className="mt-1"
                  value={answer.other}
                  onChange={(e) => setOther(question.id, e.target.value)}
                />
              )}
            </section>
          ))}
        </div>
        <div className="mt-10">
          <PrimaryButton size="large" className="mx-auto px-4">
            アンケートを送信する
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default OnBoardingQuestionaryPage;
