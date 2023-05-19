import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useConsultExample } from './useConsultExample';

describe('useConsultExample', () => {
  test('getAgeText', async () => {
    let hookResult:
      | { current: ReturnType<typeof useConsultExample> }
      | undefined;

    await act(() => {
      hookResult = renderHook(() => useConsultExample()).result;
    });

    expect(hookResult?.current.getAgeText(20)).toBe('20代');
    expect(hookResult?.current.getAgeText(10)).toBe('10代');
    expect(hookResult?.current.getAgeText(9)).toBe('小児(9歳)');
  });

  test('getGenderText', async () => {
    let hookResult:
      | { current: ReturnType<typeof useConsultExample> }
      | undefined;

    await act(() => {
      hookResult = renderHook(() => useConsultExample()).result;
    });

    expect(hookResult?.current.getGenderText('man', 9)).toBe('男児');
    expect(hookResult?.current.getGenderText('woman', 9)).toBe('女児');
    expect(hookResult?.current.getGenderText('man', 10)).toBe('男性');
    expect(hookResult?.current.getGenderText('woman', 10)).toBe('女性');
  });
});
