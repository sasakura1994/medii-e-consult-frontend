import { renderHook } from '@testing-library/react';
import { useEraConverter } from '../useEraConverter';
describe('useEraConverter', () => {
  test('初期化テスト', () => {
    const { result } = renderHook(() => useEraConverter());
    expect(result.current.inputYear).toBe('');
    expect(result.current.era).toBe('year');
    expect(result.current.validation).toEqual({
      min: 1,
      max: 9999,
    });
  });

  test('正しくconvertがされていること', () => {
    const { result } = renderHook(() => useEraConverter());

    const seirekiToShowa = result.current.convertYear('1926', 'year', 'showa');
    expect(seirekiToShowa).toBe('1');

    const showaToHeisei = result.current.convertYear('64', 'showa', 'heisei');
    expect(showaToHeisei).toBe('1');

    const showaToSeireki = result.current.convertYear('64', 'showa', 'year');
    expect(showaToSeireki).toBe('1989');

    const seirekiToHeisei = result.current.convertYear(
      '1989',
      'year',
      'heisei'
    );
    expect(seirekiToHeisei).toBe('1');

    const heiseiToReiwa = result.current.convertYear('31', 'heisei', 'reiwa');
    expect(heiseiToReiwa).toBe('1');

    const reiwaToSeireki = result.current.convertYear('1', 'reiwa', 'year');
    expect(reiwaToSeireki).toBe('2019');
  });
});
