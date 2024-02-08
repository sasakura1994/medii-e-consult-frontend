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

  describe('isStudentCanToBeDoctor', () => {
    jest.useFakeTimers();

    describe('期間チェック', () => {
      beforeEach(() => {
        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: {
            main_speciality: 'STUDENT',
            graduation_year: 2024,
            status: 'VERIFIED',
          },
        });
      });

      test('医師に転向可能（同年）', () => {
        jest.setSystemTime(new Date(2024, 3, 1));

        const hooks = renderHook(() => useProfile(), {}).result;
        expect(hooks.current.isStudentCanToBeDoctor).toBe(true);
      });

      test('医師に転向可能（昨年以前）', () => {
        jest.setSystemTime(new Date(2025, 3, 1));

        const hooks = renderHook(() => useProfile(), {}).result;
        expect(hooks.current.isStudentCanToBeDoctor).toBe(true);
      });

      test('3月以前は不可能', () => {
        jest.setSystemTime(new Date(2024, 2, 31));

        const hooks = renderHook(() => useProfile(), {}).result;
        expect(hooks.current.isStudentCanToBeDoctor).toBe(false);
      });
    });

    describe('false', () => {
      beforeEach(() => {
        jest.setSystemTime(new Date(2024, 3, 1));
      });

      test('医学生でない', () => {
        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: {
            main_speciality: 'NAIKA',
            graduation_year: 2024,
            status: 'VERIFIED',
          },
        });

        const hooks = renderHook(() => useProfile(), {}).result;
        expect(hooks.current.isStudentCanToBeDoctor).toBe(false);
      });

      test('VERIFIEDでない', () => {
        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: {
            main_speciality: 'NAIKA',
            graduation_year: 2024,
            status: 'PROFILE',
          },
        });

        const hooks = renderHook(() => useProfile(), {}).result;
        expect(hooks.current.isStudentCanToBeDoctor).toBe(false);
      });
    });
  });
});
