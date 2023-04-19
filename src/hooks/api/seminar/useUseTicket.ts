import { useAxios } from '@/hooks/network/useAxios';
import React, { useState } from 'react';

export type UseUseTicketType = {
  useTicket: () => Promise<string>;
};

const endpoint = (id: string ) =>`/seminar/${id}/use_ticket`;

export const useUseTicket= (id: string): UseUseTicketType => {
  const { axios } = useAxios();
  const [ isTicketConfirmDialogShown, setIsTicketConfirmDialogShown] = useState( false );
  const [ isSendingUsingTicketRequest, setIsSendingUsingTicketRequest ] = useState( false );  
  const [isTicketNotEnoughDialogShown, setIsTicketNotEnoughDialogShown] = useState( false );

  const useTicket = React.useCallback(
    async () => {
      const response = await axios.post<{movie_url: string}>(
        endpoint(id),
      ).catch( ( error ) =>
      {
        if (error.response.data.code === -20) {
          setIsTicketNotEnoughDialogShown(true);
        } else {
          alert(error.response.data.message || 'エラーが発生しました');
        }
      } );
      if ( response )
      {
        setIsTicketConfirmDialogShown(false);
        setIsSendingUsingTicketRequest( false );
        return response.data.movie_url;
      }
      return "";
    },
    [axios]
  );

  return { useTicket };
};
