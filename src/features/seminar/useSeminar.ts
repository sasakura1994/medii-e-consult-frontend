import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { useFetchTicketCount } from '@/hooks/api/seminar/useFetchTicketCount';
import { useFetchLatestSeminar } from '@/hooks/api/seminar/useFetchLatestSeminar';
import { useFetchSeminars } from '@/hooks/api/seminar/useFetchSeminars';

export type UseSeminar = {
  seminars: SeminarEntityType[] | undefined;
  latestSeminar: SeminarEntityType | undefined;
  ticketCount: ticketCountEntity | undefined;
};

export const useSeminar = (): UseSeminar => {
  const { seminars } = useFetchSeminars();
  const { latestSeminar } = useFetchLatestSeminar();
  const { ticketCount } = useFetchTicketCount();
  return {
    seminars,
    latestSeminar,
    ticketCount,
  };
};
