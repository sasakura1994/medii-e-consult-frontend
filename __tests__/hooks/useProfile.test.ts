import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useProfile } from '@/hooks/useProfile';
import { renderHook } from '@testing-library/react';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('useProfile', () => {
  describe('isOnboardingQuestionaryIsNotNeeded', () => {
    test('3年未満', () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          main_speciality: 'GANKA',
          qualified_year: new Date().getFullYear() - 2,
        },
      });

      const hooks = renderHook(() => useProfile(), {}).result;
      expect(hooks.current.isOnboardingQuestionaryIsNotNeeded).toBe(true);
    });

    test('3年以上', () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          main_speciality: 'GANKA',
          qualified_year: new Date().getFullYear() - 5,
        },
      });

      const hooks = renderHook(() => useProfile(), {}).result;
      expect(hooks.current.isOnboardingQuestionaryIsNotNeeded).toBe(false);
    });

    test('研修医', () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          main_speciality: 'KENSYU',
          qualified_year: new Date().getFullYear() - 5,
        },
      });

      const hooks = renderHook(() => useProfile(), {}).result;
      expect(hooks.current.isOnboardingQuestionaryIsNotNeeded).toBe(true);
    });
  });
});
