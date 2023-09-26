import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { MedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/MedicalSpecialitySelectButton';
import { SearchGroupModalLabelAndInput } from './SearchGroupModalLabelAndInput';
import { TextField } from '@/components/Parts/Form/TextField';
import { useSearchGroupModal } from './useSearchGroupModal';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { GroupDetailModal } from './GroupDetailModal';
import { SearchedGroupEntity } from '@/hooks/api/group/useSearchGroup';

export type SearchGroupModalProps = {
  onChange: (group: SearchedGroupEntity) => void;
  setShowModal: (isShow: boolean) => void;
};

export const SearchGroupModal: React.FC<SearchGroupModalProps> = (props: SearchGroupModalProps) => {
  const { onChange, setShowModal } = props;
  const {
    getMedicalSpecialityNames,
    group,
    groups,
    isLoadingGroups,
    search,
    searchConditions,
    setGroup,
    setSearchConditions,
  } = useSearchGroupModal();

  return (
    <>
      <Modal setShowModal={setShowModal} className="lg:w-[644px]">
        <div className="mx-6 my-10 lg:mx-20">
          <ModalTitleWithCloseButton title="E-コンサルするグループを選択" onClose={() => setShowModal(false)} />
          <div className="mt-10 flex gap-4">
            <SearchGroupModalLabelAndInput label="対象疾患" className="flex-1">
              <TextField
                name="disease"
                value={searchConditions.disease}
                onChange={(e) =>
                  setSearchConditions({
                    ...searchConditions,
                    disease: e.target.value,
                  })
                }
                placeholder="対象疾患"
              />
            </SearchGroupModalLabelAndInput>
            <SearchGroupModalLabelAndInput label="診療科目" className="flex-1">
              <MedicalSpecialitySelectButton
                specialityCode={searchConditions.specialityCode}
                onChange={(specialityCode) => setSearchConditions({ ...searchConditions, specialityCode })}
              />
            </SearchGroupModalLabelAndInput>
          </div>
          <SearchGroupModalLabelAndInput label="エリア・施設名" className="mt-3">
            <TextField
              name="area"
              value={searchConditions.area}
              onChange={(e) =>
                setSearchConditions({
                  ...searchConditions,
                  area: e.target.value,
                })
              }
              placeholder="例）◯◯◯県、△△△大学 など"
            />
          </SearchGroupModalLabelAndInput>
          <SearchGroupModalLabelAndInput label="グループ名" className="mt-4">
            <TextField
              name="group_name"
              value={searchConditions.groupName}
              onChange={(e) =>
                setSearchConditions({
                  ...searchConditions,
                  groupName: e.target.value,
                })
              }
              placeholder="例）チーム◯◯◯ILD など"
            />
          </SearchGroupModalLabelAndInput>
          <div className="mt-6">
            <PrimaryButton type="button" size="lg" className="mx-auto w-full max-w-[260px]" onClick={search}>
              絞り込み検索
            </PrimaryButton>
          </div>
          <div className="mt-3 text-center">
            {isLoadingGroups ? (
              <>
                <div>検索中...</div>
                <div className="mt-6 flex justify-center">
                  <SpinnerBorder />
                </div>
              </>
            ) : (
              <>検索結果 {groups?.length} 件</>
            )}
          </div>
          {!isLoadingGroups && groups && (
            <div className="mt-6 h-[200px] overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="border-y border-y-heading-line text-left text-block-gray">
                  <tr>
                    <th className="py-3 font-normal">エリア・施設名</th>
                    <th className="py-3 font-normal">対象疾患</th>
                    <th className="py-3 font-normal">診療科目</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group) => (
                    <tr key={group.group_id} className="hover:bg-primary-light" onClick={() => setGroup(group)}>
                      <td className="whitespace-nowrap py-3">{group.area}</td>
                      <td className="whitespace-nowrap py-3">{group.disease}</td>
                      <td className="whitespace-pre-wrap break-words py-3">{getMedicalSpecialityNames(group)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>
      {group && (
        <GroupDetailModal group={group} onSubmit={() => onChange(group)} setShowModal={() => setGroup(undefined)} />
      )}
    </>
  );
};
