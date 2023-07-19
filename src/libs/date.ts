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

export const getTimeIntervalText = (
  timeStr: string | null | undefined
): string => {
  if (!timeStr) {
    return '';
  }

  const diff = dayjs().diff(dayjs(timeStr), 'minute');
  console.log(timeStr);

  if (diff < 60) {
    return `${diff}分前`;
  }

  const hours = Math.floor(diff / 60);
  if (hours < 24) {
    return `${hours}時間前`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}日前`;
  }

  return dateFormat(timeStr, 'YYYY/MM/DD');
};
