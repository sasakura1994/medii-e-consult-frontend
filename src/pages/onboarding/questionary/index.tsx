import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { ColoredImage } from '@/components/Image/ColoredImage';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Optional } from '@/components/Parts/Form/Optional';
import { Radio } from '@/components/Parts/Form/Radio';
import { Required } from '@/components/Parts/Form/Required';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import TextArea from '@/components/TextArea/TextArea';
import { ages } from '@/data/age';
import { OnboardingConsultPointModal } from '@/features/onboarding/OnboardingConsultPointModal';
import { OnboardingMedicalSpecialitiesSelectDialog } from '@/features/onboarding/OnboardingMedicalSpecialitiesSelectDialog';
import { QuestionaryItems } from '@/features/onboarding/QuestionaryItems';
import { useOnBoardingQuestionary } from '@/features/onboarding/useOnBoardingQuestionary';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';
import React from 'react';

const OnBoardingQuestionaryPage = () => {
  const {
    checkIsCheckboxRequired,
    isSending,
    questionAndAnswers,
    submit,
    toggleAnswers,
    setAnswer,
    setOther,
    isOpenSelectSpecialitiesModal,
    setIsOpenSelectSpecialitiesModal,
    isOpenConsultPointModal,
    medicalSpecialityCategories,
    medicalSpecialities,
    consultAnswers,
    setConsultAnswers,
    setOnboardingAnswered,
  } = useOnBoardingQuestionary();
  const { postEventLog } = useEventLog();

  useEventLog({ name: 'view-onboarding-questionary' });

  return (
    <>
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
                  <TextArea
                    id={`other${question.id}`}
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

            <div>
              <TextArea
                id={`questionary_item-what-listen`}
                name={`questionary_item-what-listen`}
                value={consultAnswers.title}
                onChange={(e) => {
                  setConsultAnswers((prev) => ({ ...prev, title: e.target.value }));
                }}
                labelText="どのようなことを聞きたいですか？"
                labelBadge={<Required>必須</Required>}
                className="w-full resize-none"
                placeholder="他の医師の相談例を参考に、記入してください。"
                required={true}
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
                  <label
                    htmlFor="man"
                    className={`flex h-10 w-full items-center gap-2 rounded-lg border ${
                      consultAnswers.gender === 'man' ? 'border-medii-blue-base' : 'border-border-field'
                    }  px-3`}
                  >
                    <input
                      id="man"
                      type="radio"
                      className="peer/man"
                      name="gender"
                      defaultChecked
                      onClick={() => setConsultAnswers((prev) => ({ ...prev, gender: 'man' }))}
                    />
                    <p className={consultAnswers.gender === 'man' ? 'text-medii-blue-base' : ''}>男性</p>
                  </label>
                  <label
                    htmlFor="woman"
                    className={`flex h-10 w-full items-center gap-2 rounded-lg border ${
                      consultAnswers.gender === 'woman' ? 'border-medii-blue-base' : 'border-border-field'
                    }  px-3`}
                  >
                    <input
                      id="woman"
                      type="radio"
                      name="gender"
                      onClick={() => setConsultAnswers((prev) => ({ ...prev, gender: 'woman' }))}
                    />
                    <p className={consultAnswers.gender === 'woman' ? 'text-medii-blue-base' : ''}>女性</p>
                  </label>
                </div>
              </div>
              <div>
                <p className="text-base text-text-primary">年齢</p>
                <div className="mt-2 max-w-[319px]">
                  <SelectBox
                    name="age_range"
                    required
                    onChange={(e) => {
                      setConsultAnswers((prev) => ({ ...prev, age: Number(e.target.value) }));
                    }}
                  >
                    <option value="">年代を入力して下さい</option>
                    <option value={1}>小児</option>
                    {ages.map((age) => (
                      <option value={age.age} key={age.age}>
                        {age.label}
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
                              (medicalSpecialities) =>
                                medicalSpecialities.medical_speciality_category_id === category.id
                            )
                            .map((medicalSpeciality) => (
                              <CheckBox
                                onChange={() => {
                                  setConsultAnswers((prev) => {
                                    if (prev.targetSpecialities.includes(medicalSpeciality.speciality_code)) {
                                      // 既に存在する場合は配列から削除
                                      return {
                                        ...prev,
                                        targetSpecialities: prev.targetSpecialities.filter(
                                          (code) => code !== medicalSpeciality.speciality_code
                                        ),
                                      };
                                    } else if (prev.targetSpecialities.length < 4) {
                                      // 存在しない場合で、既に4つ選択されていなければ配列に追加
                                      return {
                                        ...prev,
                                        targetSpecialities: [
                                          ...prev.targetSpecialities,
                                          medicalSpeciality.speciality_code,
                                        ],
                                      };
                                    }
                                    // 既に4つ選択されている場合は何もしない
                                    return prev;
                                  });
                                }}
                                key={medicalSpeciality.speciality_code}
                                label={medicalSpeciality.name}
                                name={`medical_speciality${medicalSpeciality.medical_speciality_category_id}`}
                                value={medicalSpeciality.medical_speciality_category_id.toString()}
                                checked={consultAnswers.targetSpecialities.includes(medicalSpeciality.speciality_code)}
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
              defaultSelectedMedicalSpecialities={medicalSpecialities.filter((m) =>
                consultAnswers.targetSpecialities.includes(m.speciality_code)
              )}
              mainSpeciality={''}
              onChange={(medicalSpecialities) => {
                setIsOpenSelectSpecialitiesModal(false);
                setConsultAnswers((prev) => ({
                  ...prev,
                  targetSpecialities: medicalSpecialities.map((m) => m.speciality_code),
                }));
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
              <p className="mt-4 text-medii-sm font-light leading-[18px] text-secondary">
                ※難病情報センター「令和３年度末現在
                特定医療費（指定難病）受給者証所持者数」を元に、E-コンサルで相談可能な指定難病の患者数の割合を算出。
              </p>
            </div>
          </div>
          <div className="mt-10 flex w-full justify-center">
            {isSending ? (
              <SpinnerBorder />
            ) : (
              <div className="flex flex-col-reverse gap-2 lg:flex-row lg:gap-10">
                <div
                  onClick={async () => {
                    setOnboardingAnswered(null);
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
      {isOpenConsultPointModal && <OnboardingConsultPointModal />}
    </>
  );
};

export default OnBoardingQuestionaryPage;
