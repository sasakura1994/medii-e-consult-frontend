import { dateFormat, getTimeIntervalText } from '@/libs/date';
import dayjs from 'dayjs';

describe('date', () => {
  describe('dateFormat', () => {
    test('should returned in `YYYY/M/D` format', () => {
      const result = dateFormat('2022-04-01 23:59:59', 'YYYY/M/D');
      expect(result).toBe('2022/4/1');
    });

    test('should return an empty string if passed an empty string', () => {
      const result = dateFormat('', 'YYYY/M/D');
      expect(result).toBe('');
    });
  });

  describe('getTimeIntervalText', () => {
    test('分', () => {
      const result = getTimeIntervalText(
        dayjs().add(-5, 'minute').toISOString()
      );
      expect(result).toBe('5分前');
    });

    test('時間', () => {
      const result = getTimeIntervalText(dayjs().add(-5, 'hour').toISOString());
      expect(result).toBe('5時間前');
    });

    test('日', () => {
      const result = getTimeIntervalText(dayjs().add(-5, 'day').toISOString());
      expect(result).toBe('5日前');
    });
  });
});
