import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

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
