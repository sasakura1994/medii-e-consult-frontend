import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import React, { useState } from 'react';
import { SearchGroupModalLabelAndInput } from '../chat/newChatRoom/SearchGroupModalLabelAndInput';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { MedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/MedicalSpecialitySelectButton';
import TextField from '@/components/TextField/TextField';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useFetchSearchMember } from '@/hooks/api/group/useFetchSearchMember';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

type Props = {
  setIsOpenModal: (isOpenModal: boolean) => void;
};

export const InviteMemberModal = (props: Props) => {
  const { setIsOpenModal } = props;
  const { prefectures } = usePrefecture();
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [specialityCode, setSpecialityCode] = useState('');
  const [name, setName] = useState('');
  const { members: searchedMember } = useFetchSearchMember({
    specialityCode: specialityCode,
    area: selectedPrefecture,
    name: name,
  });
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  return (
    <Modal setShowModal={setIsOpenModal} pcWidth="600">
      <div className="mx-6 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="E-コンサルするグループを選択" onClose={() => setIsOpenModal(false)} />
        <div className="mt-3 flex items-center gap-2">
          <div className="w-full">
            <p className="mb-1 font-bold">都道府県</p>
            {prefectures && (
              <SelectBox
                name="prefecture_code"
                id="prefecture_code"
                value={selectedPrefecture}
                onChange={(e) => setSelectedPrefecture(e.target.value)}
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
            <SearchGroupModalLabelAndInput
              label="専門科
"
              className="flex-1"
            >
              <MedicalSpecialitySelectButton
                specialityCode={specialityCode}
                onChange={(specialityCode) => setSpecialityCode(specialityCode)}
              />
            </SearchGroupModalLabelAndInput>
          </div>
        </div>
        <div className="my-2">
          <p className="mb-1 font-bold">氏名</p>
          <TextField
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="h-12 w-full"
            placeholder="氏名から検索"
          />
        </div>
        <PrimaryButton className="mx-auto mt-6 h-12 px-12">検索</PrimaryButton>

        <p className="mt-3 text-center">招待済みメンバー数： 0名</p>
        {searchedMember && (
          <div className="mt-3">
            {medicalSpecialities &&
              medicalSpecialities.map((medicalSpeciality) => {
                return (
                  <>
                    <div className=" h-full w-full overflow-auto">
                      {searchedMember.some((member) => {
                        return member.speciality_code === medicalSpeciality.speciality_code;
                      }) && (
                        <>
                          <p className="mb-1 font-bold">{medicalSpeciality.name}</p>
                          <table
                            className="box-border table w-auto min-w-full table-fixed overflow-visible
                        whitespace-nowrap text-sm"
                          >
                            <thead
                              className="table-header-group border-y
                             border-y-heading-line text-left text-block-gray"
                            >
                              <tr className="table-row">
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
                                    <tr
                                      key={member.account_id}
                                      className="table-row cursor-pointer overflow-scroll hover:bg-primary-light"
                                      onClick={() => {}}
                                    >
                                      <td className="table-cell py-3">{member.area_txt}</td>
                                      <td className="table-cell py-3">{member.full_name}</td>
                                      <td className="table-cell py-3">{member.hospital_name}</td>
                                      <td
                                        className="sticky right-0 table-cell break-words
                                  bg-white py-3 text-center text-[15px]"
                                      >
                                        ―
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </div>
    </Modal>
  );
};
