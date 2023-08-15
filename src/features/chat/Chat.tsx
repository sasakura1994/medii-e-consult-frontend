import React, { useEffect } from 'react';
import { ConsultList } from './ConsultList';
import { ConsultDetail } from './ConsultDetail';
import { useRouter } from 'next/router';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToken } from '@/hooks/authentication/useToken';

type WebsocketResponseMessage = {
  type: 'subscribe_response' | 'pong';
  param: string;
  data: {
    code: number;
    message: string;
  };
};

export const Chat = () => {
  const router = useRouter();
  const { socket } = useWebSocket();
  const { token, accountId } = useToken();
  const { chat_room_id } = router.query;

  useEffect(() => {
    if (!socket.current) {
      return;
    }
    if (!socket.current && !token && !accountId) {
      return;
    }
    const webSocket = socket.current;

    const onOpen = () => {
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(
          JSON.stringify({
            type: 'subscribe',
            token: token,
            param: 'mes:' + accountId,
          })
        );
        webSocket.send(
          JSON.stringify({
            type: 'subscribe',
            token: token,
            param: 'cha:' + accountId,
          })
        );
        webSocket.send(
          JSON.stringify({
            type: 'subscribe',
            token: token,
            param: 'vcs:' + accountId,
          })
        );
      }
    };

    const onMessage = (event: MessageEvent) => {
      const data: WebsocketResponseMessage = JSON.parse(event.data);
      if (data.type === 'subscribe_response' && data.param === 'vcs:' + accountId) {
        webSocket.send(
          JSON.stringify({
            type: 'ping',
            token: token,
          })
        );
      } else if (data.type === 'pong') {
        // 10秒待機してpingを送信
        setTimeout(() => {
          webSocket.send(
            JSON.stringify({
              type: 'ping',
              token: token,
            })
          );
        }, 10000);
      }
    };

    webSocket.addEventListener('open', onOpen);
    webSocket.addEventListener('message', onMessage);

    return () => {
      webSocket.removeEventListener('open', onOpen);
      webSocket.removeEventListener('message', onMessage);
    };
  }, [accountId, socket, token]);

  return (
    <div className="flex bg-white">
      <ConsultList />
      {chat_room_id ? (
        <ConsultDetail />
      ) : (
        <div className="flex h-screen w-[787px] flex-col border border-[#d5d5d5] bg-bg" />
      )}
    </div>
  );
};
