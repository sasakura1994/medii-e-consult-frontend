import React from 'react';
import { Modal, ModalPropsType } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { useDoctorSearchModal } from './useDoctorSearchModal';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { DoctorEntity } from '@/types/entities/doctorEntity';

export type DoctorSearchModalProps = Pick<ModalPropsType, 'setShowModal'> & {
  onChange: (doctor: DoctorEntity) => void;
};

export const DoctorSearchModal: React.FC<DoctorSearchModalProps> = (
  props: DoctorSearchModalProps
) => {
  const { onChange, setShowModal } = props;
  const {
    applySearchConditions,
    doctors,
    experienceYears,
    getMedicalSpecialityName,
    setSpecialityCode,
    setExperienceYears,
    specialityCode,
  } = useDoctorSearchModal();

  return (
    <Modal setShowModal={setShowModal} className="lg:w-[644px]">
      <div className="my-10 mx-6 lg:mx-20">
        <ModalTitleWithCloseButton
          title="E-コンサルする専門医を選択"
          onClose={() => setShowModal(false)}
        />
        <div className="mt-10 flex gap-4">
          <div className="shrink grow basis-0">
            <div>担当科</div>
          </div>
          <div className="shrink grow basis-0">
            <div>専門医経験年数</div>
            <SelectBox
              name="experience_years"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            >
              <option value="">専門医経験年数を選択</option>
              {[...Array(99)]
                .map((_, i) => i + 1)
                .map((year) => (
                  <option value={year} key={year}>
                    {year}年以上
                  </option>
                ))}
            </SelectBox>
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton
            type="button"
            size="lg"
            className="w-full max-w-[260px]"
            onClick={applySearchConditions}
          >
            検索
          </PrimaryButton>
        </div>
        {doctors !== undefined && (
          <div className="mt-2">
            <div className="text-center">検索結果 {doctors.length} 件</div>
            <div className="mt-6 flex border-y border-y-heading-line px-4 py-[10px] text-sm text-block-gray">
              <div className="shrink grow basis-0">氏名</div>
              <div className="shrink grow basis-0">専門科</div>
              <div className="shrink grow-[0.3] basis-0">経験年数</div>
            </div>
            {doctors.map((doctor) => (
              <a
                key={doctor.doctor_id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(doctor);
                }}
              >
                <div className="flex px-4 py-3 text-[15px] hover:bg-primary-light">
                  <div className="shrink grow basis-0">
                    {doctor.last_name} {doctor.first_name}
                  </div>
                  <div className="shrink grow basis-0">
                    {getMedicalSpecialityName(doctor.speciality_1)}
                  </div>
                  <div className="shrink grow-[0.3] basis-0">2 年目</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
