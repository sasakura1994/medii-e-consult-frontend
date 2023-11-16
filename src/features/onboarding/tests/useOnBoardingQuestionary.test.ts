import { renderHook, act } from '@testing-library/react';

import { useOnBoardingQuestionary } from '../useOnBoardingQuestionary';
import * as useFetchFlagModule from '@/hooks/api/account/useFetchFlags';
import { usePostQuestionaryItemsForOnboarding } from '@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/account/useFetchFlags');
jest.mock('@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding');

describe('useOnBoardingQuestionary', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });
    (usePostQuestionaryItemsForOnboarding as jest.Mock).mockReturnValue({
      postQuestionaryItemsForOnboarding: jest.fn().mockResolvedValue(true),
    });
  });

  test('メール・プッシュ通知両方受け取るを選択した場合に状態が変わること', async () => {
    const hooks = renderHook(() => useOnBoardingQuestionary(), {}).result;

    const mutateMock = jest.spyOn(useFetchFlagModule, 'mutateFetchFlag');

    await act(() => {
      hooks.current.submit();
    });

    expect(mutateMock).toHaveBeenCalledWith('OnboardingAnswered');
    expect(mutateMock).toHaveBeenCalledWith('FirstConsultCampaign');
  });
});
