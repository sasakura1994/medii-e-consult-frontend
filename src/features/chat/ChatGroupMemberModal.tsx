import React, { useCallback, useState } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import { Dispatch, SetStateAction } from 'react';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { ChatDoctorDetailModal } from './ChatDoctorDetailModal';

type ChatGroupMemberModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  members: ChatMemberEntity[];
};

export const ChatGroupMemberModal = (props: ChatGroupMemberModalProps) => {
  const { setIsOpen, members } = props;
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const [isOpenDoctorDetailModal, setIsOpenDoctorDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ChatMemberEntity | null>(null);

  const getMedicalSpecialityName = useCallback(
    (specialityCode: string) =>
      medicalSpecialities?.find((medicalSpeciality) => medicalSpeciality.speciality_code === specialityCode)?.name ||
      '',
    [medicalSpecialities]
  );

  const calculateExperienceYear = useCallback((qualifiedYear: number) => {
    const experienceYear = Math.max(1, new Date().getFullYear() - qualifiedYear + 1);

    const month = new Date().getMonth() + 1;
    if (month < 4) {
      return experienceYear - 1;
    }

    return experienceYear;
  }, []);
  return (
    <Modal setShowModal={setIsOpen} isCenter className="min-w-[500px] overflow-auto py-4">
      {isOpenDoctorDetailModal && selectedMember && (
        <ChatDoctorDetailModal setIsOpen={setIsOpenDoctorDetailModal} member={selectedMember} />
      )}
      <div className="flex items-center px-4">
        <p className="flex-grow text-center text-2xl">専門医メンバー</p>
        <img src="icons/close_primary.svg" alt="" className="cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>
      <div className="mt-4 w-full border-t" />
      <div className="my-6 px-16">
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
      </div>
    </Modal>
  );
};
