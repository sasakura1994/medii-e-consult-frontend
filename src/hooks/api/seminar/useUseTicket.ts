import { useAxios } from '@/hooks/network/useAxios';
import React, { useState } from 'react';

export type UseUseTicketType = {
  useTicket: () => Promise<string>;
  isTicketConfirmDialogShown: boolean;
  setIsTicketConfirmDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
  isSendingUsingTicketRequest: boolean;
  setIsSendingUsingTicketRequest: React.Dispatch<React.SetStateAction<boolean>>;
  isTicketNotEnoughDialogShown: boolean;
  setIsTicketNotEnoughDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
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
        console.log( error );
        if (error.status === -20) {
          setIsTicketNotEnoughDialogShown(true);
        } else {
          alert(error.message || 'エラーが発生しました');
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

  return { useTicket, isTicketConfirmDialogShown, isSendingUsingTicketRequest, isTicketNotEnoughDialogShown, setIsTicketConfirmDialogShown, setIsSendingUsingTicketRequest, setIsTicketNotEnoughDialogShown};
};
