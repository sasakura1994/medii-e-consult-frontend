import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { useFetchTicketCount } from '@/hooks/api/seminar/useFetchTicketCount';
import { useFetchLatestSeminar } from '@/hooks/api/seminar/useFetchLatestSeminar';
import { useFetchSeminars } from '@/hooks/api/seminar/useFetchSeminars';

export type UseSeminars = {
  seminars: SeminarEntityType[] | undefined;
  latestSeminar: SeminarEntityType | undefined;
  ticketCount: ticketCountEntity | undefined;
  maxPage: number | undefined;
  allItemsCount: number | undefined;
};

export const useSeminars = (currentPage?: number): UseSeminars => {
  const { seminars, maxPage, allItemsCount } = useFetchSeminars(currentPage);
  const { latestSeminar } = useFetchLatestSeminar();
  const { ticketCount } = useFetchTicketCount();
  return {
    seminars,
    latestSeminar,
    ticketCount,
    maxPage,
    allItemsCount,
  };
};
