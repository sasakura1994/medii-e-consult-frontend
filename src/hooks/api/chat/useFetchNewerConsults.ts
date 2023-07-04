import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export type NewerConsult = {
  date: string;
  speciality_code: string;
  consult_name: string;
};

export type FetchNewerConsultsResponseData = {
  consults: NewerConsult[];
};

export const useFetchNewerConsults = (): NewerConsult[] | undefined => {
  const { data } = useAuthenticatedSWR<FetchNewerConsultsResponseData>(
    `/chat_room/newer_consult?count=5`
  );

  return data?.consults;
};
