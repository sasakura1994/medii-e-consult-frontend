import { GrayButton } from '@/components/Parts/Button/GrayButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import React from 'react';
import { GroupDetailModalLabelAndValue } from './GroupDetailModalLabelAndValue';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { SearchedGroupEntity } from '@/hooks/api/group/useSearchGroup';

type Props = {
  group: SearchedGroupEntity;
  setShowModal: (isShow: boolean) => void;
  onSubmit: () => void;
};

export const GroupDetailModal: React.FC<Props> = ({ group, onSubmit, setShowModal }: Props) => {
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  return (
    <Modal setShowModal={setShowModal} className="lg:w-[644px]">
      <div className="mx-6 my-10 lg:mx-20">
        <div className="text-center text-2xl font-bold">グループ情報</div>
        <div className="mt-10">
          {group.is_real_name && (
            <div className="mb-6 flex gap-2 bg-[#FEEDEB] p-4" data-testid="real-name-note">
              <img className="m-2 block" src="icons/exclamation-triangle.svg" width="16" height="16" alt="" />
              <div className="text-md">
                回答医側から意向により、グループへのコンサルは匿名ではなく実名で投稿されます。
              </div>
            </div>
          )}
          <GroupDetailModalLabelAndValue label="グループ名">{group.group_name}</GroupDetailModalLabelAndValue>
          <GroupDetailModalLabelAndValue label="エリア・施設名" className="mt-4">
            {group.area}
          </GroupDetailModalLabelAndValue>
          <GroupDetailModalLabelAndValue label="対象疾患" className="mt-4">
            {group.disease}
          </GroupDetailModalLabelAndValue>
          <GroupDetailModalLabelAndValue label="グループメンバー数" className="mt-4">
            {group.member_ids.length} 名
          </GroupDetailModalLabelAndValue>
          <GroupDetailModalLabelAndValue label="グループメンバーの診療科目" className="mt-4">
            {Object.keys(group.speciality_counts).map((specialityCode) => (
              <div key={specialityCode} className="flex justify-between border-b border-b-heading-line">
                <div>
                  {
                    medicalSpecialities?.find(
                      (medicalSpeciality) => medicalSpeciality.speciality_code === specialityCode
                    )?.name
                  }
                </div>
                <div>{group.speciality_counts[specialityCode]}名</div>
              </div>
            ))}
          </GroupDetailModalLabelAndValue>
          <GroupDetailModalLabelAndValue label="グループ紹介" className="mt-4">
            {group.explanation}
          </GroupDetailModalLabelAndValue>
        </div>
        <div className="mt-10 flex flex-col gap-6 lg:flex-row-reverse lg:gap-4">
          <PrimaryButton type="button" className="w-full flex-1" onClick={onSubmit}>
            グループ選択
          </PrimaryButton>
          <GrayButton type="button" className="w-full flex-1" onClick={() => setShowModal(false)}>
            キャンセル
          </GrayButton>
        </div>
      </div>
    </Modal>
  );
};
