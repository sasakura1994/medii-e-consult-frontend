import { useState, useEffect, useCallback } from 'react';
import {
  Question,
  useFetchQuestionaryItemsForOnboarding,
} from '@/hooks/api/questionary/useFetchQuestionaryItemsForOnboarding';
import {
  PostQuestionaryItemsForOnboardingAnswer,
  usePostQuestionaryItemsForOnboarding,
} from '@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding';
import { useRouter } from 'next/router';
import { mutateFetchFlag } from '@/hooks/api/account/useFetchFlags';

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
  const [otherOpenedQuestionIds, setOtherOpenedQuestionIds] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { questions } = useFetchQuestionaryItemsForOnboarding();
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
      return;
    }

    // バナーの非表示のため
    mutateFetchFlag('OnboardingAnswered');
    // アンケート結果によって変わるため次のページで取得するためにmutateしておく
    mutateFetchFlag('FirstConsultCampaign');

    router.push('/onboarding/questionary/completed');
  }, [postQuestionaryItemsForOnboarding, questionAndAnswers, router]);

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

  const toggleOther = useCallback((questionId: string) => {
    setOtherOpenedQuestionIds((otherOpenedQuestionIds) => {
      if (otherOpenedQuestionIds.includes(questionId)) {
        return otherOpenedQuestionIds.filter((qid) => qid !== questionId);
      } else {
        return [...otherOpenedQuestionIds, questionId];
      }
    });
  }, []);

  return {
    checkIsCheckboxRequired,
    isSending,
    otherOpenedQuestionIds,
    questionAndAnswers,
    setAnswer,
    setOther,
    submit,
    toggleAnswers,
    toggleOther,
  };
};
