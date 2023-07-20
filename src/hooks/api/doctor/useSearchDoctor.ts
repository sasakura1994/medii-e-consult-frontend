import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { DoctorEntity } from '@/types/entities/doctorEntity';

export type SearchDoctorConditions = {
  experienceYears: string;
  speciality: string;
  reConsultChatRoomId?: string;
};

export type UseSearchDoctorType = {
  isLoading: boolean;
  error?: Error;
  doctors?: DoctorEntity[];
};

export const useSearchDoctor = (
  conditions?: SearchDoctorConditions
): UseSearchDoctorType => {
  const endpoint = conditions
    ? `/doctor/search_doctor` +
      `?speciality=${conditions.speciality}` +
      `&experiance_years=${conditions.experienceYears}` +
      (conditions.reConsultChatRoomId
        ? `&re_consult_chat_room_id=${conditions.reConsultChatRoomId}`
        : '')
    : undefined;

  const {
    isLoading,
    error,
    data: doctors,
  } = useAuthenticatedSWR<DoctorEntity[]>(endpoint);

  return {
    isLoading,
    error,
    doctors,
  };
};
