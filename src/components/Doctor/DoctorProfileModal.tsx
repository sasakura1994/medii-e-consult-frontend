import React from 'react';
import { Modal, ModalPropsType } from '../Parts/Modal/Modal';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { DoctorProfileModalLabelAndValue } from './DoctorProfileModalLabelAndValue';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

type Props = Pick<ModalPropsType, 'setShowModal'> & {
  children?: React.ReactNode;
  doctor: DoctorEntity;
};

export const DoctorProfileModal: React.FC<Props> = ({
  children,
  doctor,
  setShowModal,
}: Props) => {
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { hospital } = useFetchHospital(
    doctor.hospital_id && doctor.hospital_id !== ''
      ? doctor.hospital_id
      : undefined
  );
  const getMedicalSpecialityName = React.useCallback(
    (specialityCode: string) =>
      medicalSpecialities?.find(
        (medicalSpeciality) =>
          medicalSpeciality.speciality_code === specialityCode
      )?.name || '',
    [medicalSpecialities]
  );

  return (
    <Modal setShowModal={setShowModal} className="lg:w-[644px]">
      <div className="px-6 py-6 lg:px-20">
        <h2 className="text-center text-2xl">医師情報</h2>
        <div className="mt-10">
          <div className="flex">
            <DoctorProfileModalLabelAndValue label="名前" className="flex-1">
              {doctor.last_name} {doctor.first_name}
            </DoctorProfileModalLabelAndValue>
            <DoctorProfileModalLabelAndValue label="よみ" className="flex-1">
              {doctor.last_name_hira} {doctor.first_name_hira}
            </DoctorProfileModalLabelAndValue>
          </div>
          {!['STUDENT', 'SHIKAKOUKUGEKA'].includes(doctor.speciality_1) &&
            hospital && (
              <div className="mt-6">
                <DoctorProfileModalLabelAndValue label="所属病院">
                  {hospital.hospital_name || doctor.hospital_name}
                </DoctorProfileModalLabelAndValue>
              </div>
            )}
          <div className="mt-6 flex">
            <DoctorProfileModalLabelAndValue label="専門科" className="flex-1">
              {getMedicalSpecialityName(doctor.speciality_1)}
            </DoctorProfileModalLabelAndValue>
            <DoctorProfileModalLabelAndValue
              label="対応可能な科"
              className="flex-1"
            >
              {doctor.speciality_2 &&
                getMedicalSpecialityName(doctor.speciality_2) && (
                  <div>{getMedicalSpecialityName(doctor.speciality_2)}</div>
                )}
              {doctor.speciality_3 &&
                getMedicalSpecialityName(doctor.speciality_3) && (
                  <div>{getMedicalSpecialityName(doctor.speciality_3)}</div>
                )}
              {doctor.speciality_4 &&
                getMedicalSpecialityName(doctor.speciality_4) && (
                  <div>{getMedicalSpecialityName(doctor.speciality_4)}</div>
                )}
            </DoctorProfileModalLabelAndValue>
          </div>
          <DoctorProfileModalLabelAndValue
            label="医師資格取得年"
            className="mt-6"
          >
            {doctor.qualified_year} 年
          </DoctorProfileModalLabelAndValue>
          {doctor.graduated_university && (
            <DoctorProfileModalLabelAndValue label="卒業大学" className="mt-6">
              {doctor.graduated_university}
            </DoctorProfileModalLabelAndValue>
          )}
          <DoctorProfileModalLabelAndValue
            label="特によく診てきた疾患や領域"
            className="mt-6"
          >
            {doctor.expertise}
          </DoctorProfileModalLabelAndValue>
          <DoctorProfileModalLabelAndValue label="専門医資格" className="mt-6">
            {doctor.qualification}
          </DoctorProfileModalLabelAndValue>
        </div>
        {children}
      </div>
    </Modal>
  );
};
