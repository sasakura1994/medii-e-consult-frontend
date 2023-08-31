import { useState, useEffect, useCallback } from 'react';
import {
  Question,
  useFetchQuestionaryItemsForOnboarding,
} from '@/hooks/api/questionary/useFetchQuestionaryItemsForOnboarding';

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
  const [questionAndAnswers, setQuestionAndAnswers] = useState<QuestionAndAnswer[]>([]);
  const { questions } = useFetchQuestionaryItemsForOnboarding();

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

  const submit = useCallback(() => {
    const data = {
      answers: questionAndAnswers.map(({ question, answer }) => ({
        question_id: question.id,
        choice_ids: question.type === 'SingleChoice' ? [answer.value] : answer.values,
        other_text: answer.other,
      })),
    };
  }, [questionAndAnswers]);

  const checkIsCheckboxRequired = useCallback(
    (questionId: string) => {
      const questionAndAnswer = questionAndAnswers.find((qa) => qa.question.id === questionId);
      if (!questionAndAnswer) {
        return false;
      }

      return questionAndAnswer.answer.values.length === 0;
    },
    [questionAndAnswers]
  );

  return { checkIsCheckboxRequired, questionAndAnswers, setAnswer, setOther, submit, toggleAnswers };
};
