import Label from '@/components/Parts/Label/Label';
import { useFetchUpcomingSeminar } from '@/hooks/api/seminar/useFetchUpcomingSeminar';
import { dateFormat, getWeekDay } from '@/libs/date';
import Link from 'next/link';
import React from 'react';
import { StyledHiddenScrollBar } from './styled';

export const TopUpcomingSeminars = () => {
  const { seminars } = useFetchUpcomingSeminar();

  if (!seminars || seminars.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xxl font-semibold">開催予定のE-カンファ</h3>
        <Link href="/seminar" className="hidden text-monotone-600 lg:block">
          開催予定のすべてのE-カンファ
        </Link>
      </div>
      <div className="mt-6">
        <StyledHiddenScrollBar className="flex gap-8 overflow-x-auto">
          <>
            {seminars.map((seminar) => (
              <Link href="/seminar" key={seminar.seminar_id} className="min-w-[320px] lg:min-w-0 lg:flex-1">
                <img
                  src={seminar.image_url}
                  alt=""
                  width="320"
                  height="168"
                  className="h-[168px] w-[320px] object-cover"
                />
                <div className="mt-4 flex gap-2">
                  <div className="flex items-center text-md">
                    {dateFormat(seminar.seminar_date, 'YYYY/MM/DD')}（{getWeekDay(seminar.seminar_date)}）
                    {seminar.seminar_start_time.substring(0, 5)}-{seminar.seminar_end_time.substring(0, 5)}
                  </div>
                  <Label className="shrink-0" size="sm">
                    参加無料
                  </Label>
                </div>
                <div className="mt-2 line-clamp-2 text-l font-semibold">{seminar.subject}</div>
              </Link>
            ))}
            {seminars.length < 3 &&
              [...Array(3 - seminars.length)].map((i) => <div key={i} className="hidden flex-1 lg:block"></div>)}
          </>
        </StyledHiddenScrollBar>
      </div>
    </>
  );
};
