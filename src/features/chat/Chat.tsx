import React, { useEffect, useRef, useState } from 'react';
import { ConsultList } from './ConsultList';
import { ConsultDetail } from './ConsultDetail';
import { useRouter } from 'next/router';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToken } from '@/hooks/authentication/useToken';
import { useFetchChatList } from '@/hooks/api/chat/useFetchChatList';
import { useFetchChatRoom } from '@/hooks/api/chat/useFetchChatRoom';
import { useGetPublishmentStatus } from '@/hooks/api/chat/useGetPublishmentStatus';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { mutateFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';

type WebsocketResponseMessage = {
  type: 'subscribe_response' | 'pong' | 'mes';
  param: string;
  data: string;
};

export const Chat = () => {
  const router = useRouter();
  const { socket } = useWebSocket();
  const { token, accountId } = useToken();
  const { chat_room_id } = router.query;
  const chatRoomIdStr = chat_room_id as string;

  const [selectedTab, setSelectedTab] = useState<'open' | 'close'>('open');
  const firstUnreadCount = useRef(0);
  const { data: chatRoomList, mutate: mutateChatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const { data: publishmentStatusData } = useGetPublishmentStatus(chatRoomIdStr);
  const { data: chatRoomData, mutate: mutateChatRoom } = useFetchChatRoom(chatRoomIdStr);
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { data: chatListData, mutate: mutateChatList } = useFetchChatList(chatRoomIdStr);

  useEffect(() => {
    if (chatRoomIdStr) {
      mutateFetchUnreadCounts();
    }
  }, [chatRoomIdStr]);

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
      // メッセージには改行などの制御文字が含まれているため、削除する
      // eslint-disable-next-line no-control-regex
      const jsonText = event.data.replace(/[\u0000-\u0019]+/g, '');
      const data: WebsocketResponseMessage = JSON.parse(jsonText);
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
      } else if (data.type === 'mes') {
        // TODO: なぜか500ms待機してチャット情報を更新するとチャットの送信が安定する
        setTimeout(() => {
          mutateChatList();
          mutateChatRoom();
          mutateChatRoomList();
          mutateFetchUnreadCounts();
        }, 500);
      }
    };

    webSocket.addEventListener('open', onOpen);
    webSocket.addEventListener('message', onMessage);

    return () => {
      webSocket.removeEventListener('open', onOpen);
      webSocket.removeEventListener('message', onMessage);
    };
  }, [accountId, mutateChatList, mutateChatRoom, mutateChatRoomList, socket, token]);

  return (
    <div className="flex bg-white">
      <ConsultList chatRoomList={chatRoomList} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {chat_room_id ? (
        <ConsultDetail
          publishmentStatusData={publishmentStatusData}
          chatRoomData={chatRoomData}
          medicalSpecialities={medicalSpecialities}
          chatListData={chatListData}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
          mutateChatList={mutateChatList}
          setSelectedTab={setSelectedTab}
          firstUnreadCount={firstUnreadCount.current}
        />
      ) : (
        <div className="flex h-screen w-[787px] flex-col border border-[#d5d5d5] bg-bg" />
      )}
    </div>
  );
};
