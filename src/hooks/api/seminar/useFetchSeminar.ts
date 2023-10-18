import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { KeyedMutator } from 'swr';

export type SeminarResponse = {
  image_url: string;
  seminar: SeminarEntityType;
  ticket_count: number;
};

export type UseFetchSeminarType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  seminar: SeminarEntityType | undefined;
  mutate: KeyedMutator<SeminarResponse>;
};

const endpoint = '/seminar/';

export const useFetchSeminar = (id: string): UseFetchSeminarType => {
  const { isLoading, error, data, mutate } =
    useAuthenticatedSWR<SeminarResponse>(endpoint + id);
  const seminar = data
    ? { ...data.seminar, image_url: data.image_url }
    : undefined;
  return {
    isLoading,
    error,
    seminar,
    mutate,
  };
};
