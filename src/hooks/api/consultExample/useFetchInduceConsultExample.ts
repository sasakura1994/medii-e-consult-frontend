import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';

type Args = {
  isFetch: boolean;
};

type Data = {
  example_id: string;
};

export const useFetchInduceConsultExampleId = ({
  isFetch,
}: Args): string | undefined => {
  const { data } = useAuthenticatedSWR<Data>(
    isFetch ? `/ConsultExample/induce` : null
  );
  return data?.example_id;
};
