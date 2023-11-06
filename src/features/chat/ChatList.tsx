import React, { useEffect, useRef, useState } from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { ChatData, FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { KeyedMutator } from 'swr';
import { useRouter } from 'next/router';

type ChatListProps = {
  chatListData: (ChatData & { displayName: string })[];
  currentUserAccountId: string;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatList?: KeyedMutator<FetchChatListResponseData>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
};

const NewBorder = () => {
  return (
    <div className="mx-3 flex">
      <div className="mt-3 w-auto flex-grow border-spacing-6 border-t-[0.5px] border-strong" />
      <p className="text-strong">NEW</p>
    </div>
  );
};

export const ChatList = (props: ChatListProps) => {
  const { chatListData, chatRoomData, currentUserAccountId, mutateChatList, setSelectedImage } = props;
  const router = useRouter();
  const readUntilRef = useRef(chatRoomData.me?.read_until);
  const [firstRender, setFirstRender] = useState(true);
  // 最後に読んだメッセージのインデックスを特定する
  const lastReadMessageIndex = chatListData.findIndex((c) => c.uid === readUntilRef.current);

  useEffect(() => {
    if (!firstRender && chatListData) {
      readUntilRef.current = chatListData[chatListData.length - 1].uid;
    }
  }, [chatListData, firstRender]);

  useEffect(() => {
    // routerのクエリを使ってレンダリング状態をリセット
    setFirstRender(true);
  }, [router.query]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  return (
    <div>
      {chatListData &&
        chatRoomData &&
        chatListData.map((c, index) => {
          const isMyChat = c.account_id === currentUserAccountId;
          // 新しいメッセージが未読の場合、NewBorder を表示する
          const showNewBorder = index > 0 && index === lastReadMessageIndex + 1 && !isMyChat;

          return (
            <div key={c.uid}>
              {index > 0 && showNewBorder && <NewBorder />}
              {isMyChat ? (
                <MyChat
                  chatData={c}
                  chatRoomData={chatRoomData}
                  mutateChatList={mutateChatList}
                  setSelectedImage={setSelectedImage}
                />
              ) : (
                <OtherChat chatData={c} chatRoomData={chatRoomData} setSelectedImage={setSelectedImage} />
              )}
            </div>
          );
        })}
    </div>
  );
};
