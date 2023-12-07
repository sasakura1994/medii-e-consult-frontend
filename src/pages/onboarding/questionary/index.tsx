/* eslint-disable no-irregular-whitespace */
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { ColoredImage } from '@/components/Image/ColoredImage';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Required } from '@/components/Parts/Form/Required';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import TextArea from '@/components/TextArea/TextArea';
import { OnboardingMedicalSpecialitiesSelectDialog } from '@/features/onboarding/OnboardingMedicalSpecialitiesSelectDialog';
import { QuestionaryItems } from '@/features/onboarding/QuestionaryItems';
import { useOnBoardingQuestionary } from '@/features/onboarding/useOnBoardingQuestionary';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import Link from 'next/link';
import React, { useState } from 'react';

const OnBoardingQuestionaryPage = () => {
  const { checkIsCheckboxRequired, isSending, questionAndAnswers, setOther, submit, toggleAnswers } =
    useOnBoardingQuestionary();
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const { postEventLog } = useEventLog();
  const [isOpenSelectSpecialitiesModal, setIsOpenSelectSpecialitiesModal] = useState(false);

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
          {questionAndAnswers[0] && questionAndAnswers[0].question.type === 'MultiChoice' && questionAndAnswers[0] && (
            <section>
              <div className="flex items-center">
                <p className="text-base font-bold text-text-primary">
                  現在、別の医師の意見を仰ぎたい症例はありますか？（複数選択可）
                </p>
                <Required className="">必須</Required>
              </div>

              <QuestionaryItems itemCount={questionAndAnswers[0].question.items.length - 1}>
                {questionAndAnswers[0].question.items.map((item) => {
                  if (item.id === 7) {
                    return <div key={item.id} className="sr-only"></div>;
                  }
                  return (
                    <CheckBox
                      key={item.id}
                      label={item.text}
                      name={`questionary_item${questionAndAnswers[0].question.id}_${item.id}`}
                      value={item.id.toString()}
                      onChange={() => toggleAnswers(questionAndAnswers[0].question.id, item.id)}
                      required={checkIsCheckboxRequired(questionAndAnswers[0].question.id)}
                    />
                  );
                })}
              </QuestionaryItems>
            </section>
          )}
          {questionAndAnswers[1] && questionAndAnswers[1].question.type === 'TextOnly' && (
            <div>
              <TextArea
                id={`questionary_item${questionAndAnswers[1].question.id}`}
                name={`other${questionAndAnswers[1].question.id}`}
                labelText="どのようなことを聞きたいですか？"
                labelBadge={<Required>必須</Required>}
                className="w-full resize-none"
                value={questionAndAnswers[1].answer.other}
                placeholder="他の医師の相談例を参考に、記入してください。"
                onChange={(e) => setOther(questionAndAnswers[1].question.id, e.target.value)}
                required={questionAndAnswers[1].question.required}
              />
              <div className="mt-2 hidden rounded-lg bg-bg-secondary p-4 lg:block">
                <div className="flex gap-4 text-base leading-6">
                  <p>相談例</p>
                  <ul className="list-disc pl-4">
                    <li>発熱を繰り返す男児の診断について</li>
                    <li>状態の安定した胸腺摘出後の抗AChR抗体陽性重症筋無力症患者のラブリズマブの終了の判断について</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <p className="text-base font-bold text-text-primary">
                相談したい症例についてもう少し詳しく教えてください。
              </p>
              <Required className="">必須</Required>
            </div>
            <div>
              <p className="text-base text-text-primary">性別</p>
              <div className="mt-2 flex max-w-[319px] gap-2">
                <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-medii-blue-base px-3">
                  <input type="radio" name="gender" defaultChecked />
                  <p className="text-medii-blue-base">男性</p>
                </label>
                <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-border-field px-3">
                  <input type="radio" name="gender" />
                  <p className="">女性</p>
                </label>
              </div>
            </div>
            <div>
              <p className="text-base text-text-primary">年齢</p>
              <div className="mt-2 max-w-[319px]">
                <SelectBox name="age_range" id="age-range" required>
                  <option value="" disabled={false}>
                    年代を入力して下さい
                  </option>
                  {[1, 2].map((age) => (
                    <option value={age} key={age}>
                      {age}
                    </option>
                  ))}
                </SelectBox>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <p className="text-base font-bold text-text-primary">
                どの診療科の医師に相談したいですか？（4つまで選択可）
              </p>
              <Required className="">必須</Required>
            </div>
            <div className="hidden lg:block">
              {medicalSpecialityCategories &&
                medicalSpecialityCategories.map((category) => (
                  <section key={category.id}>
                    <div className="mt-2 text-base font-bold text-text-primary">{category.name}</div>
                    <div className="mt-2 grid gap-y-2 lg:grid-cols-5">
                      {medicalSpecialities &&
                        medicalSpecialities
                          .filter(
                            (medicalSpecialities) => medicalSpecialities.medical_speciality_category_id === category.id
                          )
                          .map((medicalSpeciality) => (
                            <CheckBox
                              key={`${medicalSpeciality.speciality_code}`}
                              label={medicalSpeciality.name}
                              name={`medical_speciality${medicalSpeciality.medical_speciality_category_id}`}
                              value={medicalSpeciality.medical_speciality_category_id.toString()}
                            />
                          ))}
                    </div>
                  </section>
                ))}
            </div>
            <div
              className="flex h-10 w-full items-center justify-center rounded-md border border-border-field
            lg:hidden"
              onClick={() => setIsOpenSelectSpecialitiesModal(true)}
            >
              <p>診療科を選択</p>
            </div>
          </div>
        </div>
        {medicalSpecialities && isOpenSelectSpecialitiesModal && (
          <OnboardingMedicalSpecialitiesSelectDialog
            medicalSpecialities={medicalSpecialities}
            defaultSelectedMedicalSpecialities={[]}
            mainSpeciality={''}
            onChange={(medicalSpecialities) => {
              setIsOpenSelectSpecialitiesModal(false);
              console.log(medicalSpecialities);
            }}
            setShowModal={() => {
              setIsOpenSelectSpecialitiesModal(false);
            }}
            title="診療科を選択"
            maxSelectableSpecialities={4}
          />
        )}
        <div className="mt-2 flex gap-2 rounded-lg bg-bg-secondary p-4">
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
        <div className="mt-10 flex w-full justify-center">
          {isSending ? (
            <SpinnerBorder />
          ) : (
            <div className="flex flex-col-reverse gap-2 lg:flex-row lg:gap-10">
              <div
                onClick={async () => {
                  await postEventLog({ name: 'click-answer-later' });
                }}
              >
                <Link href={'/top'}>
                  <SecondaryButton size="large" className="w-full px-4 lg:w-auto">
                    あとでアンケートに回答する
                  </SecondaryButton>
                </Link>
              </div>
              <PrimaryButton size="large" className="w-full px-4 lg:w-auto">
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
