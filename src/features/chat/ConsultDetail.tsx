import React, { useMemo } from 'react';
import { ChatList } from './ChatList';
import { ChatTextInput } from './ChatTextInput';
import { useRouter } from 'next/router';
import { useFetchChatRoom } from '@/hooks/api/chat/useFetchChatRoom';
import { useGetPublishmentStatus } from '@/hooks/api/chat/useGetPublishmentStatus';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

export const ConsultDetail = () => {
  const router = useRouter();
  const { chat_room_id } = router.query;
  const chatRoomIdStr = chat_room_id as string;
  const { data: publishmentStatusData } =
    useGetPublishmentStatus(chatRoomIdStr);
  const { data: chatRoomData } = useFetchChatRoom(chatRoomIdStr);
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const targetSpeciality = useMemo(() => {
    if (chatRoomData && medicalSpecialities) {
      const speciality = medicalSpecialities.find(
        (m) => m.speciality_code === chatRoomData.chat_room.target_speciality
      );
      return speciality;
    }
  }, [chatRoomData, medicalSpecialities]);

  const experienceYear = useMemo(() => {
    if (chatRoomData && chatRoomData.members[0]) {
      const date = new Date();
      const currentYear = date.getFullYear();
      const passedYear = currentYear - chatRoomData.members[0].qualified_year;

      return passedYear + 1;
    }
  }, [chatRoomData]);

  return (
    <>
      {chatRoomData && publishmentStatusData && (
        <div className="flex h-[calc(100vh-110px)] w-[787px] flex-col border border-[#d5d5d5]">
          <div className="flex-none">
            <div className="mr-2 flex h-14 items-center space-x-1">
              <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-strong">
                <p className="py-0.5 text-xs text-white">未解決</p>
              </div>
              <p className="ml-2 flex-grow font-bold">
                {chatRoomData.chat_room.title}
              </p>
              <button className="h-9 w-[78px] rounded-full bg-primary">
                <p className="text-xs text-white">返答依頼</p>
              </button>
              <button className="h-9 w-[126px] rounded-full bg-primary">
                <p className="text-xs text-white">コンサル終了依頼</p>
              </button>
              <button className="h-9 w-[78px] rounded-full bg-strong">
                <p className="text-xs text-white">回答パス</p>
              </button>
              <img
                src="/icons/btn_menu.svg"
                alt=""
                className="h-9 w-9 cursor-pointer"
              />
            </div>
            <div className="flex h-5 items-center space-x-1 border">
              {chatRoomData.members[0] && (
                <p className="text-xxs">E-コンサル</p>
              )}
              <p className="text-md font-bold">
                {chatRoomData.chat_room.room_type === 'GROUP' ? (
                  chatRoomData.members.length + '人の専門医メンバー'
                ) : chatRoomData.members[0] ? (
                  publishmentStatusData.publishment_accepted ? (
                    chatRoomData.members[0].last_name +
                    ' ' +
                    chatRoomData.members[0].first_name +
                    ' 先生'
                  ) : (
                    '質問医'
                  )
                ) : (
                  <p className="text-strong">
                    回答してくださる専門医の先生を探しています
                  </p>
                )}
              </p>
              {chatRoomData.chat_room.room_type !== 'GROUP' &&
                chatRoomData.members[0] && (
                  <p className="text-xs">
                    ({targetSpeciality?.name}・{experienceYear}年目)
                  </p>
                )}
            </div>
          </div>
          <div className="flex-grow overflow-auto bg-bg pb-2">
            <ChatList />
          </div>
          <div className="relative top-10 flex-none">
            <ChatTextInput />
          </div>
        </div>
      )}
    </>
  );
};
