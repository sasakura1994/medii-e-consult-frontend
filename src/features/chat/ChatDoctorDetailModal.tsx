import SecondaryButton from '@/components/Button/SecondaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import React, { Dispatch, SetStateAction } from 'react';

type ChatDoctorDetailModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  member: ChatMemberEntity;
};

export const ChatDoctorDetailModal = (props: ChatDoctorDetailModalProps) => {
  const { setIsOpen, member } = props;
  const { getMedicalSpecialityName } = useMedicalSpeciality();

  return (
    <Modal setShowModal={setIsOpen} isCenter className="w-full overflow-y-auto px-3 py-6 lg:w-[644px]">
      <p className="text-center text-2xl font-bold">{member.last_name + member.first_name + ' 先生'}</p>
      <div className="mt-9 grid grid-cols-2">
        <div>
          <p className="text-[#999999]">名前</p>
          <p>{member.last_name + ' ' + member.first_name}</p>
        </div>
        <div>
          <p className="text-[#999999]">よみ</p>
          <p>{member.last_name_hira + ' ' + member.first_name_hira}</p>
        </div>
      </div>
      {member.hospital_name && (
        <>
          <p className="mt-4 text-[#999999]">所属病院</p>
          <p>{member.hospital_name}</p>
        </>
      )}

      <div className="mt-4 grid grid-cols-2">
        <div>
          <p className="text-[#999999]">専門科</p>
          <p>{getMedicalSpecialityName(member.speciality_1)}</p>
        </div>
        <div>
          <p className="text-[#999999]">対応可能な科</p>
          <p>{getMedicalSpecialityName(member.speciality_2)}</p>
          <p>{getMedicalSpecialityName(member.speciality_3)}</p>
          <p>{getMedicalSpecialityName(member.speciality_4)}</p>
        </div>
      </div>
      <p className="mt-4 text-[#999999]">医師資格取得年</p>
      <p>{member.qualified_year + ' 年'}</p>
      {member.graduated_university && (
        <>
          <p className="mt-4 text-[#999999]">卒業大学</p>
          <p>{member.graduated_university}</p>
        </>
      )}
      <p className="mt-4 text-[#999999]">特によく診てきた疾患や領域</p>
      <p>{member.expertise}</p>
      <p className="mt-4 text-[#999999]">専門医資格</p>
      <p>{member.qualification}</p>
      <SecondaryButton className="mx-auto mt-6" onClick={() => setIsOpen(false)}>
        閉じる
      </SecondaryButton>
    </Modal>
  );
};
