import { SearchGroupMember } from '@/hooks/api/group/useFetchSearchMember';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';

type Props = {
  selectedMembers: SearchGroupMember[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<SearchGroupMember[]>>;
  myAccountId: string;
  medicalSpeciality?: MedicalSpecialityEntity;
};

export const EditGroupDetailMemberListTable = (props: Props) => {
  const { selectedMembers, setSelectedMembers, myAccountId, medicalSpeciality } = props;
  return (
    <>
      <thead className="table-header-group text-left">
        <tr className="my-2 text-lg font-bold">{medicalSpeciality?.name ?? '専門家未指定'}</tr>
        <tr className="table-row border-y border-y-heading-line text-block-gray">
          <th className="table-cell whitespace-nowrap py-3 font-normal">エリア・施設名</th>
          <th className="table-cell whitespace-nowrap py-3 font-normal">氏名</th>
          <th className="table-cell whitespace-nowrap py-3 font-normal">勤務先病院</th>
          <th className="sticky right-0 table-cell whitespace-nowrap bg-white py-3 font-normal">編集</th>
        </tr>
      </thead>
      <tbody className="table-row-group">
        {selectedMembers
          .filter((member) => {
            return member.speciality_code === (medicalSpeciality ? medicalSpeciality.speciality_code : '');
          })
          .map((member) => {
            return (
              <tr
                key={member.account_id}
                className="table-row overflow-scroll hover:bg-primary-light"
                onClick={() => {}}
              >
                <td className="table-cell py-3">{member.area_txt}</td>
                <td className="table-cell py-3">{member.full_name}</td>
                <td className="table-cell py-3">{member.hospital_name}</td>
                <td
                  className="sticky right-0 table-cell break-words bg-white py-3
                  text-[15px]"
                >
                  {member.account_id === myAccountId ? (
                    <p>―</p>
                  ) : (
                    <button
                      type="button"
                      className="cursor-pointer rounded-full bg-strong
                      px-1.5 py-0.5 text-xs font-bold text-white"
                      onClick={() => {
                        setSelectedMembers((prev) => {
                          return prev.filter((prevMember) => {
                            return prevMember.account_id !== member.account_id;
                          });
                        });
                      }}
                    >
                      削除
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};
