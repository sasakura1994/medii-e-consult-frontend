import { useState, useEffect, useCallback } from 'react';
import { Question, useFetchQuestionaryItemsById } from '@/hooks/api/questionary/useFetchQuestionaryItemsById';
import {
  PostQuestionaryItemsForOnboardingAnswer,
  usePostQuestionaryItemsForOnboarding,
} from '@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding';
import { useRouter } from 'next/router';
import { mutateFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

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

export const useOnBoardingQuestionary = () => {
  const router = useRouter();
  const [questionAndAnswers, setQuestionAndAnswers] = useState<QuestionAndAnswer[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { questions } = useFetchQuestionaryItemsById('onboarding2');
  const { postQuestionaryItemsForOnboarding } = usePostQuestionaryItemsForOnboarding();

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

  const setAnswer = useCallback((questionId: string, value: number) => {
    setQuestionAndAnswers((questionAndAnswers) =>
      questionAndAnswers.map(({ question, answer }) => ({
        question,
        answer: question.id === questionId ? { ...answer, value } : answer,
      }))
    );
  }, []);

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

  const setOther = useCallback((questionId: string, other: string) => {
    setQuestionAndAnswers((questionAndAnswers) =>
      questionAndAnswers.map(({ question, answer }) => ({
        question,
        answer: question.id === questionId ? { ...answer, other } : answer,
      }))
    );
  }, []);

  const { postEventLog } = useEventLog();

  const submit = useCallback(async () => {
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

    await postEventLog({ name: 'onboarding-questionary-complete' })
    router.push('/onboarding/questionary/completed');
  }, [postEventLog, postQuestionaryItemsForOnboarding, questionAndAnswers, router]);

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
    setAnswer,
    setOther,
    submit,
    toggleAnswers,
  };
};
