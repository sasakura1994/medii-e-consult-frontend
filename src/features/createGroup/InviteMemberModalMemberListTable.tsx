import { SearchGroupMember } from '@/hooks/api/group/useFetchSearchMember';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';

type Props = {
  selectedMembers: SearchGroupMember[];
  medicalSpeciality?: MedicalSpecialityEntity;
  searchedMember: SearchGroupMember[];
  checkedMemberRef: React.MutableRefObject<SearchGroupMember[]>;
};

export const InviteMemberModalMemberListTable = (props: Props) => {
  const { selectedMembers, medicalSpeciality, searchedMember, checkedMemberRef } = props;
  return (
    <>
      <thead className="table-header-group text-left">
        <tr className="my-2 text-lg font-bold">{medicalSpeciality?.name ?? '専門家未指定'}</tr>
        <tr className="table-row border-y border-y-heading-line text-block-gray">
          <th className="table-cell whitespace-nowrap py-3 font-normal">都道府県</th>
          <th className="table-cell whitespace-nowrap py-3 font-normal">氏名</th>
          <th className="table-cell whitespace-nowrap py-3 font-normal">勤務先病院</th>
          <th className="sticky right-0 table-cell whitespace-nowrap bg-white py-3 font-normal">招待</th>
        </tr>
      </thead>
      <tbody className="table-row-group">
        {searchedMember
          .filter((member) => {
            return member.speciality_code === (medicalSpeciality ? medicalSpeciality.speciality_code : '');
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
                        if (
                          e.target.checked &&
                          !checkedMemberRef.current.some((m) => m.account_id === member.account_id)
                        ) {
                          checkedMemberRef.current.push(member);
                          return;
                        }
                        checkedMemberRef.current = checkedMemberRef.current.filter(
                          (m) => m.account_id !== member.account_id
                        );
                      }}
                    />
                  )}
                </td>
              </label>
            );
          })}
      </tbody>
    </>
  );
};
