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
      <div className="mx-6 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="E-コンサルするグループを選択" onClose={() => setIsOpenModal(false)} />
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
              <div className="h-full w-full overflow-auto">
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
                            <>
                              <thead className="table-header-group text-left">
                                <tr className="my-2 text-lg font-bold">{medicalSpeciality.name}</tr>
                                <tr className="table-row border-y border-y-heading-line text-block-gray">
                                  <th className="table-cell whitespace-nowrap py-3 font-normal">エリア・施設名</th>
                                  <th className="table-cell whitespace-nowrap py-3 font-normal">氏名</th>
                                  <th className="table-cell whitespace-nowrap py-3 font-normal">勤務先病院</th>
                                  <th className="sticky right-0 table-cell whitespace-nowrap bg-white py-3 font-normal">
                                    招待
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="table-row-group">
                                {searchedMember
                                  .filter((member) => {
                                    return member.speciality_code === medicalSpeciality.speciality_code;
                                  })
                                  .map((member) => {
                                    return (
                                      <label
                                        htmlFor={'invite' + member.account_id}
                                        key={member.account_id}
                                        className="table-row cursor-pointer overflow-scroll hover:bg-primary-light"
                                        onClick={() => {}}
                                      >
                                        <td className="table-cell py-3">{member.area_txt}</td>
                                        <td className="table-cell py-3">{member.full_name}</td>
                                        <td className="table-cell py-3">{member.hospital_name}</td>
                                        <td className="sticky right-0 table-cell cursor-pointer bg-white px-2 py-3">
                                          {selectedMembers.some((m) => m.account_id === member.account_id) ? (
                                            <p className="text-sm text-[#808080]">招待済み</p>
                                          ) : (
                                            <input
                                              type="checkbox"
                                              className="bg-medii-blue-base"
                                              name={'invite' + member.account_id}
                                              id={'invite' + member.account_id}
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  checkedMemberRef.current.push(member);
                                                }
                                              }}
                                            />
                                          )}
                                        </td>
                                      </label>
                                    );
                                  })}
                              </tbody>
                            </>
                          )}
                        </>
                      );
                    })}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
