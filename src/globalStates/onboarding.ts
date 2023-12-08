import { atom } from 'jotai';

type OnboardingAnsweredState = {
  title: string;
  gender: 'man' | 'woman';
  age: number | null;
  targetSpecialities: string[];
};

export const onboardingAnsweredState = atom<OnboardingAnsweredState | null>(null);
