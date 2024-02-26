import React from 'react';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { useDoctor } from '@/hooks/useDoctor';
import { UseConsultDetail } from './useConsultDetail';
import PrimaryButton from '@/components/Button/PrimaryButton';

type Props = Pick<
  UseConsultDetail,
  'setIsOpenDoctorDetailModal' | 'setIsOpenGroupMemberModal' | 'setIsOpenChatFirstMessageEditModal'
> & {
  chatRoomData: FetchChatRoomResponseData;
  isMyRoom: boolean;
};

export const ChatRoomDisplayName = (props: Props) => {
  const {
    chatRoomData,
    isMyRoom,
    setIsOpenDoctorDetailModal,
    setIsOpenGroupMemberModal,
    setIsOpenChatFirstMessageEditModal,
  } = props;
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { calculateExperienceYear } = useDoctor();

  const owner = chatRoomData.members.find((member) => member.account_id === chatRoomData.chat_room.owner_account_id);
  if (!isMyRoom) {
    if (!owner?.speciality_1) {
      // プロフィール未入力ユーザー
      return <p className="text-md font-bold">質問医</p>;
    }
    if (chatRoomData.chat_room.is_real_name) {
      return (
        <>
          <p className="text-md font-bold">{owner?.last_name + ' ' + owner?.first_name + '先生'}</p>
          <p className="text-xs">
            ({getMedicalSpecialityName(owner?.speciality_1 ?? '')}・
            {calculateExperienceYear(owner?.qualified_year ?? 0)}
            年目)
          </p>
        </>
      );
    }
    return (
      <>
        <p className="text-md font-bold">質問医</p>
        {chatRoomData.members.length > 0 && (
          <p className="text-xs" data-testid="chat-room-display-name-speciality-and-year">
            ({getMedicalSpecialityName(owner?.speciality_1 ?? '')}・
            {calculateExperienceYear(owner?.qualified_year ?? 0)}
            年目)
          </p>
        )}
      </>
    );
  }
  if (chatRoomData.chat_room.status === 'CREATED') {
    return <p className="text-sm font-normal text-strong">回答してくださる専門医の先生を探しています</p>;
  }
  if (chatRoomData.chat_room.status === 'PENDING') {
    return (
      <div>
        <p className="text-sm font-normal text-strong">
          現在、コンサルの内容を確認しています。情報の追記などをお願いする場合がございます。
        </p>
        <div className="py-1">
          <PrimaryButton onClick={() => setIsOpenChatFirstMessageEditModal(true)}>コンサル文を編集する</PrimaryButton>
        </div>
      </div>
    );
  }
  if (chatRoomData.members.length === 0) {
    return <p className="text-sm font-bold">退会済みアカウント</p>;
  }

  // 実名グループの場合
  if (
    chatRoomData.chat_room &&
    !isMyRoom &&
    chatRoomData.chat_room.room_type === 'GROUP' &&
    chatRoomData.chat_room.is_real_name
  ) {
    const owner = chatRoomData.members.find((member) => member.account_id === chatRoomData.chat_room.owner_account_id);
    if (owner) {
      return (
        <>
          <p className="cursor-pointer text-md font-bold underline" onClick={() => setIsOpenDoctorDetailModal(true)}>
            {owner.last_name + ' ' + owner.first_name + '先生'}
          </p>
          <p className="text-xs">
            ({getMedicalSpecialityName(owner.speciality_1)}・{calculateExperienceYear(owner.qualified_year)}
            年目)
          </p>
        </>
      );
    }
  }

  if (chatRoomData.chat_room.room_type === 'GROUP') {
    return (
      <p className="cursor-pointer text-md font-bold underline" onClick={() => setIsOpenGroupMemberModal(true)}>
        {chatRoomData.members.length}人の専門医メンバー
      </p>
    );
  }

  return (
    <>
      <p className="cursor-pointer text-md font-bold underline" onClick={() => setIsOpenDoctorDetailModal(true)}>
        {chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + ' 先生'}
      </p>
      <p className="text-xs">
        ({getMedicalSpecialityName(chatRoomData.members[0].speciality_1)}・
        {calculateExperienceYear(chatRoomData.members[0].qualified_year)}年目)
      </p>
    </>
  );
};
