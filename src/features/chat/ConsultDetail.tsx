import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatList } from './ChatList';
import { ChatTextInput } from './ChatTextInput';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { useToken } from '@/hooks/authentication/useToken';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

type ConsultDetailProps = {
  publishmentStatusData?: {
    publishment_accepted: number;
  };
  chatRoomData?: FetchChatRoomResponseData;
  medicalSpecialities?: MedicalSpecialityEntity[];
  chatListData?: FetchChatListResponseData;
};

export const ConsultDetail = (props: ConsultDetailProps) => {
  const { publishmentStatusData, chatRoomData, medicalSpecialities, chatListData } = props;
  const { accountId } = useToken();
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const getSpecialityName = useCallback(
    (specialityCode: string) => {
      if (chatRoomData && medicalSpecialities) {
        const speciality = medicalSpecialities.find((m) => m.speciality_code === specialityCode);
        return speciality ? speciality.name : '';
      }
    },
    [chatRoomData, medicalSpecialities]
  );

  const getExperienceYear = useCallback((year: number) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const passedYear = currentYear - year;

    return passedYear + 1;
  }, []);

  const chatListDataWithDisplayName = useMemo(() => {
    // TODO: 一旦first_nameがある場合は名前を表示し、ない場合はspecialityとexperienceYearを表示する
    if (chatListData && chatRoomData) {
      return chatListData.map((c) => {
        if (chatRoomData.me?.account_id === c.account_id) {
          if (chatRoomData.me.first_name) {
            return { ...c, displayName: chatRoomData.me.last_name + ' ' + chatRoomData.me.first_name + '先生' };
          } else if (chatRoomData.me.speciality_1) {
            return {
              ...c,
              displayName:
                getSpecialityName(chatRoomData.me.speciality_1) +
                ' ' +
                getExperienceYear(chatRoomData.me.qualified_year) +
                '年目',
            };
          }
          return { ...c, displayName: '' };
        } else if (chatRoomData.members[0].account_id === c.account_id) {
          if (chatRoomData.members[0].first_name) {
            return {
              ...c,
              displayName: chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + '先生',
            };
          } else if (chatRoomData.members[0].speciality_1) {
            return {
              ...c,
              displayName:
                getSpecialityName(chatRoomData.members[0].speciality_1) +
                ' ' +
                getExperienceYear(chatRoomData.members[0].qualified_year) +
                '年目',
            };
          }
          return { ...c, displayName: '' };
        } else if (c.account_id === 'CHATBOT') {
          return {
            ...c,
            displayName: 'システム通知',
          };
        }
        return { ...c, displayName: '' };
      });
    }
  }, [chatListData, chatRoomData, getExperienceYear, getSpecialityName]);

  const isCloseRoom = useMemo(() => {
    if (chatRoomData) {
      return chatRoomData.chat_room.status === 'RESOLVED' || chatRoomData.chat_room.status === 'CLOSED';
    }
  }, [chatRoomData]);

  const isChatRoomOwner = useMemo(() => {
    if (chatRoomData) {
      return chatRoomData.chat_room.owner_account_id === accountId;
    }
  }, [chatRoomData, accountId]);

  // チャットリストが更新される度にスクロールを一番下にする
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatListData, chatRoomData]);

  return (
    <>
      {chatRoomData && publishmentStatusData && accountId && chatListDataWithDisplayName && (
        <div className="flex h-[calc(100vh-62px)] w-[787px] flex-col border border-[#d5d5d5]">
          <div className="flex-shrink-0 flex-grow-0">
            <div className="mr-2 flex h-14 items-center space-x-1">
              {isCloseRoom ? (
                <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-[#64abc4]">
                  <p className="py-0.5 text-xs text-white">解決済</p>
                </div>
              ) : (
                <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-strong">
                  <p className="py-0.5 text-xs text-white">未解決</p>
                </div>
              )}
              <p className="ml-2 flex-grow font-bold">{chatRoomData.chat_room.title}</p>
              {!isCloseRoom ? (
                <>
                  <button className="h-9 w-[78px] rounded-full bg-primary">
                    <p className="text-xs text-white">返答依頼</p>
                  </button>
                  <button className="h-9 w-[126px] rounded-full bg-primary">
                    <p className="text-xs text-white">コンサル終了依頼</p>
                  </button>
                  <button className="h-9 w-[78px] rounded-full bg-strong">
                    <p className="text-xs text-white">回答パス</p>
                  </button>
                </>
              ) : isChatRoomOwner && chatRoomData.chat_room.room_type !== 'GROUP' ? (
                <button className="h-9 w-[138px] rounded-full bg-primary">
                  <p className="text-xs text-white">他の医師に相談する</p>
                </button>
              ) : (
                <></>
              )}
              <img src="/icons/btn_menu.svg" alt="" className="h-9 w-9 cursor-pointer" />
            </div>
            <div className="flex h-5 items-center space-x-1 border">
              {chatRoomData.members[0] && <p className="text-xxs">E-コンサル</p>}
              <p className="text-md font-bold">
                {chatRoomData.chat_room.room_type === 'GROUP' ? (
                  chatRoomData.members.length + '人の専門医メンバー'
                ) : chatRoomData.members[0] ? (
                  chatRoomData.members[0].first_name ? (
                    chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + ' 先生'
                  ) : (
                    '質問医'
                  )
                ) : (
                  <p className="font-normal text-strong">回答してくださる専門医の先生を探しています</p>
                )}
              </p>
              {chatRoomData.chat_room.room_type !== 'GROUP' && chatRoomData.members[0] && (
                <p className="text-xs">
                  ({getSpecialityName(chatRoomData.chat_room.target_speciality)}・
                  {getExperienceYear(chatRoomData.members[0].qualified_year)}年目)
                </p>
              )}
            </div>
          </div>
          <div className="relative flex overflow-hidden">
            <div className="-mb-3 flex-1 overflow-scroll bg-bg" ref={chatListRef}>
              <ChatList chatListData={chatListDataWithDisplayName} currentUserAccountId={accountId} />
            </div>
            {isCloseRoom && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black bg-opacity-20" />
            )}
          </div>
          <div className="flex-shrink-0 flex-grow-0">
            <ChatTextInput chatRoomId={chatRoomData.chat_room.chat_room_id} />
          </div>
        </div>
      )}
    </>
  );
};
