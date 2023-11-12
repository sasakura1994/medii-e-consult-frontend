import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useFetchUpcomingSeminar } from '@/hooks/api/seminar/useFetchUpcomingSeminar';
import { useState } from 'react';
import { useSeminars } from './useSeminars';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { ticketCountEntity } from '@/types/entities/ticketCountEntity';

export const getSeminarDateTime = (seminar: SeminarEntityType) => {
  if (!seminar) return '';
  console.log(seminar);
  const [year, month, day] = seminar.seminar_date.substring(0, 10).split(/-/) as string[];
  const seminarDate = new Date(seminar.seminar_date);
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][seminarDate.getDay() as number];
  return (
    `${Number(year)}年${Number(month)}月${Number(day)}日(${dayOfWeek}) ` +
    seminar.seminar_start_time.substring(0, 5) +
    '-' +
    seminar.seminar_end_time.substring(0, 5)
  );
};

type UseSeminar = {
  seminars: SeminarEntityType[] | undefined;
  upcomingSeminars: SeminarEntityType[] | undefined;
  ticketCount: ticketCountEntity | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSeminar = (): UseSeminar => {
  const { seminars, ticketCount } = useSeminars();
  const { seminars: upcomingSeminars } = useFetchUpcomingSeminar();
  const [showModal, setShowModal] = useState(false);
  useEventLog({ name: '/seminar' });

  return {
    seminars,
    upcomingSeminars,
    ticketCount,
    showModal,
    setShowModal,
  };
};
