import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useFetchUpcomingSeminar } from '@/hooks/api/seminar/useFetchUpcomingSeminar';
import { useProfile } from '@/hooks/useProfile';
import { useState } from 'react';
import { useSeminars } from './useSeminars';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { ticketCountEntity } from '@/types/entities/ticketCountEntity';

type UseSeminar = {
  seminars: SeminarEntityType[] | undefined;
  upcomingSeminars: SeminarEntityType[] | undefined;
  ticketCount: ticketCountEntity | undefined;
  profile: ProfileEntity | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSeminar = (): UseSeminar => {
  const { seminars, ticketCount } = useSeminars();
  const { seminars: upcomingSeminars } = useFetchUpcomingSeminar();
  const { profile } = useProfile();
  const [showModal, setShowModal] = useState(false);
  useEventLog({ name: '/seminar' });

  return {
    seminars,
    upcomingSeminars,
    ticketCount,
    profile,
    showModal,
    setShowModal,
  };
};
