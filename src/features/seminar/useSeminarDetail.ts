import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { useFetchTicketCount } from '@/hooks/api/seminar/useFetchTicketCount';
import { useFetchSeminar } from '@/hooks/api/seminar/useFetchSeminar';
import { useFetchRandomSeminars } from '@/hooks/api/seminar/useRandomSeminars';
import { useUseTicket } from '@/hooks/api/seminar/useUseTicket';
import { AxiosResponse } from 'axios';

export type UseSeminarDetail = {
  randomSeminars: SeminarEntityType[] | undefined;
  seminar: SeminarEntityType | undefined;
  ticketCount: ticketCountEntity | undefined;
  useTicket: () => Promise<string>;
  isTicketConfirmDialogShown: boolean;
  setIsTicketConfirmDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
  isSendingUsingTicketRequest: boolean;
  setIsSendingUsingTicketRequest: React.Dispatch<React.SetStateAction<boolean>>;
  isTicketNotEnoughDialogShown: boolean;
  setIsTicketNotEnoughDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UseSeminarDetail = (id: string): UseSeminarDetail => {
  const { seminar } = useFetchSeminar( id );
  const { seminars: randomSeminars } = useFetchRandomSeminars( id );
  const {
    useTicket,
    isTicketConfirmDialogShown,
    isSendingUsingTicketRequest,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsSendingUsingTicketRequest,
    setIsTicketNotEnoughDialogShown,
  } = useUseTicket(id);
  const { ticketCount } = useFetchTicketCount();
  return {
    seminar,
    randomSeminars,
    ticketCount,
    useTicket,
    isTicketConfirmDialogShown,
    isSendingUsingTicketRequest,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsSendingUsingTicketRequest,
    setIsTicketNotEnoughDialogShown,
  };
};
