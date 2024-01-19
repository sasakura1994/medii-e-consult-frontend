import { useDoctor } from '@/hooks/useDoctor';
import { renderHook } from '@testing-library/react';

describe('useDoctor', () => {
  jest.useFakeTimers();

  describe('calculateExperienceYear', () => {
    test('～3月', () => {
      jest.setSystemTime(new Date(2024, 2, 1));

      const hooks = renderHook(() => useDoctor(), {}).result;
      const year = hooks.current.calculateExperienceYear(2000);

      expect(year).toBe(24);
    });

    test('4月～', () => {
      jest.setSystemTime(new Date(2024, 3, 1));

      const hooks = renderHook(() => useDoctor(), {}).result;
      const year = hooks.current.calculateExperienceYear(2000);

      expect(year).toBe(25);
    });
  });
});
