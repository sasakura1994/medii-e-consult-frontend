import React, { useState } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import { Dispatch, SetStateAction } from 'react';
import { ChatDoctorDetailModal } from './ChatDoctorDetailModal';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { useDoctor } from '@/hooks/useDoctor';

type ChatGroupMemberModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  members: ChatMemberEntity[];
};

export const ChatGroupMemberModal = (props: ChatGroupMemberModalProps) => {
  const { setIsOpen, members } = props;
  const [isOpenDoctorDetailModal, setIsOpenDoctorDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ChatMemberEntity | null>(null);
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { calculateExperienceYear } = useDoctor();

  const displayName = (member: ChatMemberEntity) => {
    if (member.speciality_1 === 'STUDENT') {
      return '(医学生)';
    }
    return (
      '(' +
      getMedicalSpecialityName(member.speciality_1) +
      ' ' +
      calculateExperienceYear(member.qualified_year) +
      '年目)'
    );
  };

  return (
    <Modal setShowModal={setIsOpen} isCenter className="overflow-y-auto py-4 lg:min-w-[500px]">
      {isOpenDoctorDetailModal && selectedMember && (
        <ChatDoctorDetailModal setIsOpen={setIsOpenDoctorDetailModal} member={selectedMember} />
      )}
      <div className="flex items-center px-4">
        <p className="flex-grow text-center text-2xl">専門医メンバー</p>
        <img src="icons/close_primary.svg" alt="" className="cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>
      <div className="mt-4 w-full border-t" />
      <div className="my-6 px-2 lg:px-16">
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
              <p className="flex-grow text-sm text-[#999999]">{displayName(member)}</p>
              <img src="icons/arrow_right.svg" alt="" />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
