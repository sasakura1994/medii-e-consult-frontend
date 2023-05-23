import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

type LikeRequestData = {
  example_id: string;
  example_message_id?: string;
};

export const useConsultExampleActions = () => {
  const { axios } = useAxios();

  const like = useCallback(
    (id: string) => {
      const data: LikeRequestData = {
        example_id: id,
      };
      return axios.post('/ConsultExampleLike/like', data);
    },
    [axios]
  );

  const unlike = useCallback(
    (id: string) => {
      return axios.delete(`/ConsultExampleLike/unlike?example_id=${id}`);
    },
    [axios]
  );

  return { like, unlike };
};
