import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { useFetchTicketCount } from '@/hooks/api/seminar/useFetchTicketCount';
import { useFetchSeminar } from '@/hooks/api/seminar/useFetchSeminar';
import { useFetchRandomSeminars } from '@/hooks/api/seminar/useRandomSeminars';
import { useUseTicket } from '@/hooks/api/seminar/useUseTicket';
import { AxiosResponse } from 'axios';
import React from 'react';

export type UseSeminarDetail = {
  randomSeminars: SeminarEntityType[] | undefined;
  seminar: SeminarEntityType | undefined;
  ticketCount: ticketCountEntity | undefined;
  useTicket: () => Promise<void>;
  isTicketConfirmDialogShown: boolean;
  setIsTicketConfirmDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
  isTicketNotEnoughDialogShown: boolean;
  setIsTicketNotEnoughDialogShown: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export const UseSeminarDetail = (id: string): UseSeminarDetail => {
  const { seminar, mutate } = useFetchSeminar(id);
  const { seminars: randomSeminars } = useFetchRandomSeminars(id);
  const {
    useTicket,
    isTicketConfirmDialogShown,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsTicketNotEnoughDialogShown,
  } = useUseTicket(id, mutate);
  const { ticketCount } = useFetchTicketCount();

  return {
    seminar,
    randomSeminars,
    ticketCount,
    useTicket,
    isTicketConfirmDialogShown,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsTicketNotEnoughDialogShown,
  };
};
