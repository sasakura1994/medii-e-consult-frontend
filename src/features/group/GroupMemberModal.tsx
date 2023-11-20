import React, { useCallback, useState } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import { Dispatch, SetStateAction } from 'react';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { GroupMemberDetailModal } from './GroupMemberDetailModal';
import { UrlPublish } from '../mypages/editProfile/UrlPublish';
import { GroupEntity } from '@/hooks/api/group/useFetchGetGroup';
import PrimaryButton from '@/components/Button/PrimaryButton';

type GroupMemberModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpenGroupEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  members: ChatMemberEntity[];
  group: GroupEntity;
};

export const GroupMemberModal = (props: GroupMemberModalProps) => {
  const { setIsOpen, setIsOpenGroupEditModal, members, group } = props;
  const [isOpenDoctorDetailModal, setIsOpenDoctorDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ChatMemberEntity | null>(null);
  const { getMedicalSpecialityName } = useMedicalSpeciality();

  const calculateExperienceYear = useCallback((qualifiedYear: number) => {
    const experienceYear = Math.max(1, new Date().getFullYear() - qualifiedYear + 1);

    const month = new Date().getMonth() + 1;
    if (month < 4) {
      return experienceYear - 1;
    }

    return experienceYear;
  }, []);
  return (
    <Modal setShowModal={setIsOpen} isCenter className="overflow-y-auto py-4 lg:min-w-[500px]">
      {isOpenDoctorDetailModal && selectedMember && (
        <GroupMemberDetailModal setIsOpen={setIsOpenDoctorDetailModal} member={selectedMember} />
      )}
      <div className="flex items-center px-4">
        <p className="flex-grow text-center text-2xl font-bold">グループメンバー</p>
        <img src="icons/close_primary.svg" alt="" className="cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>

      <div className="my-6 px-2 lg:px-16">
        {group.is_public && (
          <UrlPublish url={`${process.env.WEB_SERVER_URL}/NewChatRoom?target_group_id=${group.group_id}`} />
        )}
        {members.map((member) => {
          return (
            <div
              className="mx-auto mt-2 flex cursor-pointer items-center rounded-md border p-4 shadow-sm"
              key={member.account_id}
              onClick={() => {
                setSelectedMember(member);
                setIsOpenDoctorDetailModal(true);
              }}
            >
              <img src="icons/mypage.svg" alt="" />
              <p className="ml-2 text-sm">{member.last_name + member.first_name + ' 先生'}</p>
              <p className="flex-grow text-sm text-[#999999]">
                {'(' +
                  getMedicalSpecialityName(member.speciality_1) +
                  ' ' +
                  calculateExperienceYear(member.qualified_year) +
                  '年目)'}
              </p>
              <img src="icons/arrow_right.svg" alt="" />
            </div>
          );
        })}
        <PrimaryButton
          className="mt-6 w-full"
          onClick={() => {
            setIsOpenGroupEditModal(true);
            setIsOpen(false);
          }}
        >
          グループ情報の編集
        </PrimaryButton>
      </div>
    </Modal>
  );
};
