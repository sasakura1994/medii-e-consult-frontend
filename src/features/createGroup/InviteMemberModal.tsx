import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import React from 'react';
import { SearchGroupModalLabelAndInput } from '../chat/newChatRoom/SearchGroupModalLabelAndInput';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { MedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/MedicalSpecialitySelectButton';
import TextField from '@/components/TextField/TextField';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { SearchGroupMember } from '@/hooks/api/group/useFetchSearchMember';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { useInviteMemberModal } from './useInviteMemberModal';
import { InviteMemberModalMemberListTable } from './InviteMemberModalMemberListTable';

type Props = {
  setIsOpenModal: (isOpenModal: boolean) => void;
  selectedMembers: SearchGroupMember[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<SearchGroupMember[]>>;
};

export const InviteMemberModal = (props: Props) => {
  const { setIsOpenModal, selectedMembers, setSelectedMembers } = props;
  const {
    prefectures,
    selectedPrefectureRef,
    specialityCodeRef,
    nameRef,
    checkedMemberRef,
    setSearchedMemberState,
    searchedMember,
    medicalSpecialities,
  } = useInviteMemberModal();

  return (
    <Modal
      setShowModal={setIsOpenModal}
      pcWidth="600"
      isUseFooter
      closeButton={
        <>
          {searchedMember && (
            <TertiaryButton
              type="button"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              キャンセル
            </TertiaryButton>
          )}
        </>
      }
      submitButton={
        <>
          {searchedMember && (
            <PrimaryButton
              type="button"
              onClick={() => {
                setSelectedMembers([...selectedMembers, ...checkedMemberRef.current]);
                setIsOpenModal(false);
              }}
            >
              選択メンバーを招待
            </PrimaryButton>
          )}
        </>
      }
    >
      <div className="mx-4 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="グループメンバー招待" onClose={() => setIsOpenModal(false)} />
        <div className="mt-3 flex items-center gap-2">
          <div className="w-full">
            <p className="mb-1 font-bold">都道府県</p>
            {prefectures && (
              <SelectBox
                name="prefecture_code"
                id="prefecture_code"
                onChange={(e) => (selectedPrefectureRef.current = e.target.value)}
              >
                <option value="">指定なし</option>
                {prefectures.map((prefecture) => (
                  <option value={prefecture.code} key={prefecture.code}>
                    {prefecture.name}
                  </option>
                ))}
              </SelectBox>
            )}
          </div>
          <div className="w-full">
            <SearchGroupModalLabelAndInput label="専門科" className="flex-1">
              <MedicalSpecialitySelectButton
                specialityCode={specialityCodeRef.current}
                onChange={(specialityCode) => (specialityCodeRef.current = specialityCode)}
              />
            </SearchGroupModalLabelAndInput>
          </div>
        </div>
        <div className="my-2">
          <p className="mb-1 font-bold">氏名</p>
          <TextField
            name="name"
            id="name"
            onChange={(e) => {
              nameRef.current = e.target.value;
            }}
            className="h-12 w-full"
            placeholder="氏名から検索"
          />
        </div>
        <PrimaryButton
          type="button"
          className="mx-auto mt-6 h-12 px-12"
          onClick={() =>
            setSearchedMemberState({
              specialityCode: specialityCodeRef.current,
              area: selectedPrefectureRef.current,
              name: nameRef.current,
            })
          }
        >
          検索
        </PrimaryButton>

        <p className="mt-3 text-center">招待済みメンバー数： {selectedMembers.length - 1}名</p>
        <div className="mt-3 max-h-[300px] overflow-auto">
          {searchedMember && (
            <div className="mt-3">
              <div className="h-full w-full overflow-visible">
                <table
                  className="box-border table w-auto min-w-full table-fixed overflow-visible
                        whitespace-nowrap text-sm"
                >
                  {medicalSpecialities &&
                    medicalSpecialities.map((medicalSpeciality) => {
                      return (
                        <>
                          {searchedMember.some((member) => {
                            return member.speciality_code === medicalSpeciality.speciality_code;
                          }) && (
                            <InviteMemberModalMemberListTable
                              selectedMembers={selectedMembers}
                              medicalSpeciality={medicalSpeciality}
                              searchedMember={searchedMember}
                              checkedMemberRef={checkedMemberRef}
                            />
                          )}
                        </>
                      );
                    })}
                  {/* 専門家未指定の医師一覧 */}

                  {searchedMember.some((member) => {
                    return member.speciality_code === '';
                  }) && (
                    <InviteMemberModalMemberListTable
                      selectedMembers={selectedMembers}
                      searchedMember={searchedMember}
                      checkedMemberRef={checkedMemberRef}
                    />
                  )}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
