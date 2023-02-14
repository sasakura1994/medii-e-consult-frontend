import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ja');
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault('Asia/Tokyo');

export const dayjsDate = (dateStr?: string): Date | undefined => {
  // 3桁以下は date への変換でエラーになる
  if (!dateStr || dateStr.length < 3) {
    return undefined;
  }

  return dayjs(dateStr).tz().toDate();
};

export const dateFormat = (
  dateStr: string | Date | null | undefined,
  formatStr: string
): string => {
  if (!dateStr) {
    return '';
  }

  return dayjs(dateStr).tz().format(formatStr);
};

export const timeFormat = (timeStr: string | null | undefined): string => {
  const TIME_FORMAT = 'HH:mm';

  if (!timeStr) {
    return '';
  }

  if (!validateDate(timeStr, TIME_FORMAT)) {
    return '';
  }

  return dayjs(timeStr, TIME_FORMAT).tz().format(TIME_FORMAT);
};

// ref https://github.com/iamkun/dayjs/issues/320#issuecomment-537885327
export const validateDate = (
  dateStr: string | Date,
  formatStr: string
): boolean => {
  return dayjs(dateStr, formatStr).tz().format(formatStr) === dateStr;
};
