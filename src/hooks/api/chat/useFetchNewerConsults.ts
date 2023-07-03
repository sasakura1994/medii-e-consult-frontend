import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export type NewerConsult = {
  date: string;
  speciality_code: string;
  consult_name: string;
};

export type FetchNewerConsultsResponseData = NewerConsult[];

export const useFetchNewerConsults = () => {
  return useAuthenticatedSWR<FetchNewerConsultsResponseData>(
    `/chat_room/newer_consult?count=5`
  );
};
