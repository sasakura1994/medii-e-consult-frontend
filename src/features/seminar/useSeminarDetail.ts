import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { useFetchTicketCount } from '@/hooks/api/seminar/useFetchTicketCount';
import { useFetchSeminar } from '@/hooks/api/seminar/useFetchSeminar';
import { useFetchRandomSeminars } from '@/hooks/api/seminar/useRandomSeminars';

export type UseSeminarDetail = {
  randomSeminars: SeminarEntityType[] | undefined;
  seminar: SeminarEntityType | undefined;
  ticketCount: ticketCountEntity | undefined;
};

export const UseSeminarDetail = (id: string): UseSeminarDetail => {
  const { seminar } = useFetchSeminar( id );
  const { seminars: randomSeminars } = useFetchRandomSeminars( id );
  const { ticketCount } = useFetchTicketCount();
  return {
    seminar,
    randomSeminars,
    ticketCount,
  };
};
