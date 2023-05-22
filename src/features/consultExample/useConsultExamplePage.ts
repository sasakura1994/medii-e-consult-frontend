import { useFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';

export const useConsultExamplePage = (id: string) => {
  const { data: consultExample } = useFetchConsultExample(id);
  const { data: consultExampleMessages } = useFetchConsultExampleMessages(id);

  return { consultExample, consultExampleMessages };
};
