import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { OnboardingQuestionaryModal } from '../OnboardingQuestionaryModal';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
describe('OnboardingQuestionaryModal', () => {
  describe('表示', () => {
    test('クエリパラメータによって表示', () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {
          fromwelcome: '1',
        },
      });

      act(() => {
        render(
          <RecoilRoot>
            <OnboardingQuestionaryModal />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('onboarding-questionary-modal')).toBeInTheDocument();
    });

    test('表示しない', () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
      });

      act(() => {
        render(
          <RecoilRoot>
            <OnboardingQuestionaryModal />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('onboarding-questionary-modal')).not.toBeInTheDocument();
    });
  });
});
