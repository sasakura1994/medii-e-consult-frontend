import React, { useEffect, useState } from 'react';
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
import { chatState } from '@/globalStates/chat';
import Link from 'next/link';
import { useAtomValue } from 'jotai';

type WebsocketResponseMessage = {
  type: 'subscribe_response' | 'pong' | 'mes';
  param: string;
  data: string;
};

type Query = {
  chat_room_id?: string;
};

export const Chat = () => {
  const router = useRouter();
  const { socket } = useWebSocket();
  const { token, accountId } = useToken();
  const { chat_room_id } = router.query as Query;
  const chatRoomIdStr = chat_room_id;

  const chatGlobalState = useAtomValue(chatState);
  const { data: chatRoomList, mutate: mutateChatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const { data: publishmentStatusData, mutate: mutatePublishmentStatusData } = useGetPublishmentStatus(chatRoomIdStr);
  const { data: chatRoomData, mutate: mutateChatRoom } = useFetchChatRoom(chatRoomIdStr);
  const [selectedTab, setSelectedTab] = useState<'open' | 'close'>(
    chatRoomData?.chat_room.status === 'RESOLVED' || chatRoomData?.chat_room.status === 'CLOSED' ? 'close' : 'open'
  );
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { data: chatListData, mutate: mutateChatList, fetchNewChatList } = useFetchChatList(chatRoomIdStr);

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
        setTimeout(async () => {
          await mutateChatRoom();
          await mutateChatList();
          await mutateChatRoomList();
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
    <div className="flex h-full bg-white">
      <ConsultList chatRoomList={chatRoomList} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {chat_room_id && chatGlobalState.isSelected ? (
        <ConsultDetail
          publishmentStatusData={publishmentStatusData}
          chatRoomData={chatRoomData}
          medicalSpecialities={medicalSpecialities}
          chatListData={chatListData}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
          mutatePublishmentStatusData={mutatePublishmentStatusData}
          mutateChatList={mutateChatList}
          setSelectedTab={setSelectedTab}
          fetchNewChatList={fetchNewChatList}
        />
      ) : (
        <div className="hidden h-screen flex-grow flex-col border border-[#d5d5d5] bg-bg lg:flex" />
      )}
      <div
        className="hidden h-[calc(100dvh-62px)] w-[316px] flex-shrink-0 flex-grow-0 flex-col justify-between
      lg:flex"
      >
        <div className="block" />
        <div className="mb-2 ml-2 flex flex-col">
          <Link href="privacyPolicy" className="text-sm text-[#999999] underline">
            プライバシーポリシー
          </Link>
          <a
            href="https://e-consult.medii.jp/doc/terms_of_usage.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#999999] underline"
          >
            利用規約
          </a>
        </div>
      </div>
    </div>
  );
};
