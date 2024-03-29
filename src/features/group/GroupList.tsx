import React from 'react';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { GroupRoomTitle } from './GroupRoomTitle';
import { isGroupSelectedState } from '@/globalStates/group';

type GroupListProps = {
  groupRoomList?: ChatRoomEntity[];
};

export const GroupList = (props: GroupListProps) => {
  const { groupRoomList } = props;
  const [isGroupSelected, setIsGroupSelected] = useAtom(isGroupSelectedState);
  const unreadCountListData = useFetchUnreadCounts();

  return (
    <div
      className={`h-[100dvh] w-full border border-[#d5d5d5] pb-20 lg:h-[calc(100vh-20px)]
      lg:w-[336px] lg:min-w-[336px] lg:pb-0 ${isGroupSelected ? 'hidden lg:block' : 'block'}`}
    >
      <div className="flex h-14 items-center bg-[#5caec0] pr-4">
        <img src="icons/group_list.svg" alt="" className="ml-2 h-7 w-8" />
        <p className="flex-grow text-md font-bold text-white">所属グループ</p>
        <Link
          href="creategroup"
          className="ml-3 rounded-full border border-white px-2 py-1 text-md font-bold text-white"
        >
          ＋新規グループ作成
        </Link>
      </div>

      <div className="h-full overflow-auto bg-white pb-36">
        {unreadCountListData &&
          groupRoomList &&
          groupRoomList.map((groupRoom) => {
            return (
              <Link
                key={groupRoom.chat_room_id}
                href={{
                  pathname: '/group',
                  query: { group_room_id: groupRoom.chat_room_id },
                }}
                onClick={() => {
                  setIsGroupSelected(true);
                }}
              >
                <GroupRoomTitle
                  isUnreadConsult={unreadCountListData.unread_consult.some(
                    (c) => c.chat_room_id === groupRoom.chat_room_id
                  )}
                  groupRoomId={groupRoom.chat_room_id}
                  title={groupRoom.title}
                  latestMessage={groupRoom.latest_message}
                  lastUpdatedDate={groupRoom.last_updated_date}
                  ownerAccountId={groupRoom.owner_account_id}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};
