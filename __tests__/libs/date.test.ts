import { dateFormat } from '@/libs/date';

describe('date', () => {
  test('should returned in `YYYY/M/D` format', () => {
    const result = dateFormat('2022-04-01 23:59:59', 'YYYY/M/D');
    expect(result).toBe('2022/4/1');
  });

  test('should return an empty string if passed an empty string', () => {
    const result = dateFormat('', 'YYYY/M/D');
    expect(result).toBe('');
  });
});
