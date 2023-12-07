import { useState, useEffect, useCallback } from 'react';
import { Question, useFetchQuestionaryItemsById } from '@/hooks/api/questionary/useFetchQuestionaryItemsById';
import {
  PostQuestionaryItemsForOnboardingAnswer,
  usePostQuestionaryItemsForOnboarding,
} from '@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding';
import { mutateFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { onboardingAnsweredState } from '@/globalStates/onboarding';
import { useSetAtom } from 'jotai';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';

type Answer = {
  questionId: string;
  value: number;
  values: number[];
  other: string;
};

type QuestionAndAnswer = {
  question: Question;
  answer: Answer;
};

type ConsultAnswers = {
  title: string;
  gender: 'man' | 'woman';
  age: number | null;
  targetSpecialities: string[];
};

export const useOnBoardingQuestionary = () => {
  const [isOpenConsultPointModal, setIsOpenConsultPointModal] = useState(false);
  const [isOpenSelectSpecialitiesModal, setIsOpenSelectSpecialitiesModal] = useState(false);
  const [questionAndAnswers, setQuestionAndAnswers] = useState<QuestionAndAnswer[]>([]);
  const [isSending, setIsSending] = useState(false);
  const setonboardingAnswered = useSetAtom(onboardingAnsweredState);
  const { questions } = useFetchQuestionaryItemsById('onboarding3');
  const { postQuestionaryItemsForOnboarding } = usePostQuestionaryItemsForOnboarding();
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const [consultAnswers, setConsultAnswers] = useState<ConsultAnswers>({
    title: '',
    gender: 'man',
    age: null,
    targetSpecialities: [],
  });

  // questionAndAnswersを初期化
  useEffect(() => {
    if (!questions || questionAndAnswers.length !== 0) {
      return;
    }

    setQuestionAndAnswers(
      questions.map((question) => ({
        question,
        answer: {
          questionId: question.id,
          value: 0,
          values: [],
          other: '',
        },
      }))
    );
  }, [questions, questionAndAnswers]);

  const toggleValues = useCallback((values: number[], value: number) => {
    if (values.includes(value)) {
      return values.filter((v) => v !== value);
    } else {
      return [...values, value];
    }
  }, []);

  const toggleAnswers = useCallback(
    (questionId: string, value: number) => {
      setQuestionAndAnswers((questionAndAnswers) =>
        questionAndAnswers.map(({ question, answer }) => ({
          question,
          answer: question.id === questionId ? { ...answer, values: toggleValues(answer.values, value) } : answer,
        }))
      );
    },
    [toggleValues]
  );

  const submit = useCallback(async () => {
    if (consultAnswers.targetSpecialities.length === 0) {
      alert('対象の診療科を選択してください（4つまで選択可）');
      return;
    }
    setIsSending(true);

    const answers: PostQuestionaryItemsForOnboardingAnswer[] = questionAndAnswers.map(({ question, answer }) => ({
      question_id: question.id,
      choice_ids: question.type === 'SingleChoice' ? [answer.value] : answer.values,
      other_text: answer.other,
    }));

    const response = await postQuestionaryItemsForOnboarding(answers).catch((error) => {
      console.error(error);
      return null;
    });

    setIsSending(false);

    if (!response) {
      alert('既に回答済みです');
      return;
    }

    // バナーの非表示のため
    mutateFetchFlag('OnboardingAnswered');
    // アンケート結果によって変わるため次のページで取得するためにmutateしておく
    mutateFetchFlag('FirstConsultCampaign');
    setonboardingAnswered(consultAnswers);

    setIsOpenConsultPointModal(true);
  }, [consultAnswers, postQuestionaryItemsForOnboarding, questionAndAnswers, setonboardingAnswered]);

  const checkIsCheckboxRequired = useCallback(
    (questionId: string) => {
      const questionAndAnswer = questionAndAnswers.find((qa) => qa.question.id === questionId);
      if (!questionAndAnswer) {
        return false;
      }

      if (!questionAndAnswer.question.required) {
        return false;
      }

      if (questionAndAnswer.answer.other) {
        return false;
      }

      return questionAndAnswer.answer.values.length === 0;
    },
    [questionAndAnswers]
  );

  return {
    checkIsCheckboxRequired,
    isSending,
    questionAndAnswers,
    submit,
    toggleAnswers,
    isOpenSelectSpecialitiesModal,
    setIsOpenSelectSpecialitiesModal,
    isOpenConsultPointModal,
    medicalSpecialityCategories,
    medicalSpecialities,
    consultAnswers,
    setConsultAnswers,
  };
};
