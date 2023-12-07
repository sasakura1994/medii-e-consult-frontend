import { renderHook, act } from '@testing-library/react';

import { useOnBoardingQuestionary } from '../useOnBoardingQuestionary';
import * as useFetchFlagModule from '@/hooks/api/account/useFetchFlags';
import { usePostQuestionaryItemsForOnboarding } from '@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding';
import { useRouter } from 'next/router';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/account/useFetchFlags');
jest.mock('@/hooks/api/questionary/usePostQuestionaryItemsForOnboarding');
jest.mock('@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories');
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract');

describe('useOnBoardingQuestionary', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });
    (usePostQuestionaryItemsForOnboarding as jest.Mock).mockReturnValue({
      postQuestionaryItemsForOnboarding: jest.fn().mockResolvedValue(true),
    });
    (useFetchMedicalSpecialityCategories as jest.Mock).mockReturnValue({
      medicalSpecialityCategories: [],
    });
    (useFetchMedicalSpecialitiesWithContract as jest.Mock).mockReturnValue({
      medicalSpecialities: [],
    });
  });

  test('メール・プッシュ通知両方受け取るを選択した場合に状態が変わること', async () => {
    const hooks = renderHook(() => useOnBoardingQuestionary(), {}).result;

    act(() => {
      hooks.current.setConsultAnswers({
        title: 'test',
        gender: 'man',
        age: 30,
        targetSpecialities: ['SOUGOUNAIKA'],
      });
    });

    const mutateMock = jest.spyOn(useFetchFlagModule, 'mutateFetchFlag');

    await act(() => {
      hooks.current.submit();
    });

    expect(mutateMock).toHaveBeenCalledWith('OnboardingAnswered');
    expect(mutateMock).toHaveBeenCalledWith('FirstConsultCampaign');
  });
});
