import PrimaryButton from '@/components/Button/PrimaryButton';
import { Radio } from '@/components/Parts/Form/Radio';
import TextArea from '@/components/TextArea/TextArea';
import TextField from '@/components/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { InviteMemberModal } from './InviteMemberModal';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { SearchGroupMember } from '@/hooks/api/group/useFetchSearchMember';
import { useFetchGroupMemberData } from '@/hooks/api/group/useFetchGroupMemberData';
import { useToken } from '@/hooks/authentication/useToken';
import { MedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/MedicalSpecialitySelectButton';
import { usePostCreateGroup } from '@/hooks/api/group/usePostCreateGroup';
import { useRouter } from 'next/router';

type EditGroupState = {
  group_id?: string;
  is_public: boolean;
  group_name: string;
  area: string;
  speciality: string;
  disease: string;
  explanation: string;
  member_ids: string[];
  notification_frequency: 'ALL' | 'HOURLY' | 'DAILY';
  assignable: boolean;
};

export const EditGroupDetail = () => {
  const router = useRouter();
  const [isOpenInviteMemberModal, setIsOpenInviteMemberModal] = useState(false);
  // const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const { accountId } = useToken();
  const { fetchGroupMemberData } = useFetchGroupMemberData();
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const [selectedMembers, setSelectedMembers] = useState<SearchGroupMember[]>([]);

  const [editState, setEditState] = useState<EditGroupState>({
    group_id: '',
    is_public: true,
    group_name: '',
    area: '',
    speciality: 'MDD',
    disease: '',
    explanation: '',
    member_ids: [],
    notification_frequency: 'ALL',
    assignable: true,
  });
  const { postCreateGroup } = usePostCreateGroup();

  useEffect(() => {
    if (accountId) {
      fetchGroupMemberData({ account_id: accountId }).then((res) => {
        setSelectedMembers((prev) => {
          if (
            ![...prev].some((member) => {
              return member.account_id === res.data.account_id;
            })
          ) {
            return [...prev, res.data];
          }
          return prev;
        });
      });
    }
  }, [accountId, fetchGroupMemberData]);

  useEffect(() => {
    if (selectedMembers.length > 0) {
      setEditState((prevState) => ({
        ...prevState,
        member_ids: selectedMembers.map((member) => member.account_id),
      }));
    }
  }, [selectedMembers]);

  return (
    <div>
      {isOpenInviteMemberModal && (
        <InviteMemberModal
          setIsOpenModal={setIsOpenInviteMemberModal}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      )}
      <div className="mb-2 mt-6 flex text-left">
        <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
        <label htmlFor="specialty" className="text-left font-bold">
          エリア・施設名
        </label>
      </div>
      <TextField
        required
        name="specialty"
        className="h-12 w-full"
        id="specialty"
        placeholder="例) 〇〇県、△△大学 などを入力"
        onChange={(e) => {
          setEditState({ ...editState, area: e.target.value });
        }}
      />
      <div className="mb-2 mt-4 flex text-left">
        <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
        <div className="text-left font-bold">グループの専門分野</div>
      </div>
      <p>※対処疾患または診療科目どちらかの入力は必須となります</p>
      <div className="text-left font-bold">診療科目</div>
      <MedicalSpecialitySelectButton
        isGroup
        specialityCode={editState.speciality}
        onChange={(specialityCode) => setEditState({ ...editState, speciality: specialityCode })}
      />
      <label htmlFor="targetDisease" className="text-left font-bold">
        対象疾患
      </label>
      <TextField
        required
        name="targetDisease"
        className="h-12 w-full"
        id="targetDisease"
        placeholder="例) 間質性肺炎"
        onChange={(e) => {
          setEditState({ ...editState, disease: e.target.value });
        }}
      />
      <div className="mb-2 mt-4 flex text-left">
        <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
        <label htmlFor="groupName" className="text-left font-bold">
          グループ名
        </label>
      </div>
      <TextField
        required
        name="groupName"
        className="h-12 w-full"
        id="groupName"
        placeholder="グループ名を入力"
        onChange={(e) => {
          setEditState({ ...editState, group_name: e.target.value });
        }}
      />
      <div className="mt-4 flex text-left">
        <div className="mr-1 rounded-md border border-primary px-1 py-0.5 text-xs font-bold text-primary">任意</div>
        <label htmlFor="groupDescription" className="text-left font-bold">
          グループ説明
        </label>
      </div>
      <TextArea
        name="groupDescription"
        className="min-h-[100px] w-full resize-none"
        id="groupDescription"
        placeholder="グループの説明や特料などを入力"
        onChange={(e) => {
          setEditState({ ...editState, explanation: e.target.value });
        }}
      />
      <div className="mt-2">
        <label className="text-left font-bold">コンサル受付</label>
        <label>
          <Radio
            name="assignable"
            value="true"
            label="あり"
            checked={editState.assignable}
            onChange={() => {
              setEditState({ ...editState, assignable: true });
            }}
          />
          <div className="text-[13px]">※ 他の医師からコンサルが来る場合があります。</div>
        </label>
        <label>
          <Radio
            name="assignable"
            value="false"
            label="なし"
            checked={!editState.assignable}
            onChange={() => {
              setEditState({ ...editState, assignable: false });
            }}
          />
          <div className="text-[13px]">※ グループチャットのみ利用できます。検索結果にも表示されません。</div>
        </label>
      </div>
      {editState.assignable && (
        <div className="mt-2">
          <label className="text-left font-bold">検索</label>
          <label>
            <Radio
              name="isPublic"
              value="true"
              label="公開"
              checked={editState.is_public}
              onChange={() => {
                setEditState({ ...editState, is_public: true });
              }}
            />
            <div className="text-[13px]">※ 検索結果に表示されます。</div>
          </label>
          <label>
            <Radio
              name="isPublic"
              value="false"
              label="非公開"
              checked={!editState.is_public}
              onChange={() => {
                setEditState({ ...editState, is_public: false });
              }}
            />
            <div className="text-[13px]">
              ※ 検索結果には表示されませんが、特定のURLからコンサルを受け付けることができます。
            </div>
          </label>
        </div>
      )}
      <div className="mt-2">
        <label className="text-left font-bold">グループメンバー</label>
        <div className="text-[13px]">
          メンバーを追加したい場合は
          <a
            target="_blank"
            className=" text-text-link underline"
            href="https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6/?_gl=1*1ub7pnq*_ga*MTMwODkzMzc5Ni4xNjg0ODE5NDIy*_ga_C9VCVTY692*MTY5OTkxMzI1MS4zNjMuMS4xNjk5OTE2MDg4LjYwLjAuMA.."
            rel="noreferrer"
          >
            Mediiコンシェルジュ
          </a>
          までお問い合わせください
        </div>
      </div>
      <div className="mb-2 mt-4 flex items-center gap-4">
        <PrimaryButton
          onClick={() => {
            setIsOpenInviteMemberModal(true);
          }}
        >
          +メンバー招待
        </PrimaryButton>
        <label className="text-left font-bold">メンバー数:{selectedMembers.length}名</label>
      </div>
      <div className="h-full w-full overflow-auto">
        <table
          className="box-border table w-auto min-w-full table-fixed overflow-visible
                        whitespace-nowrap text-sm"
        >
          {medicalSpecialities &&
            medicalSpecialities.map((medicalSpeciality) => {
              return (
                <>
                  {selectedMembers.some((member) => {
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
                            編集
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-row-group">
                        {selectedMembers
                          .filter((member) => {
                            return member.speciality_code === medicalSpeciality.speciality_code;
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
                                  {member.account_id === accountId ? (
                                    <p>―</p>
                                  ) : (
                                    <button
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
                  )}
                </>
              );
            })}
        </table>
      </div>

      <div className="mt-2 space-y-1">
        <label className="text-left font-bold">メッセージの通知頻度の設定</label>
        <div className="text-[13px]">
          ※このグループカンファレンス内の通知頻度の設定することで、通知回数を抑えることができます。
        </div>

        <Radio
          id="notification-frequency-all"
          name="notification-frequency"
          value="notification-frequency-all"
          label="毎回通知"
          checked={editState.notification_frequency === 'ALL'}
          onChange={() => {
            setEditState({ ...editState, notification_frequency: 'ALL' });
          }}
        />
        <Radio
          id="notification-frequency-hourly"
          name="notification-frequency"
          value="notification-frequency"
          label="1時間に1回通知"
          checked={editState.notification_frequency === 'HOURLY'}
          onChange={() => {
            setEditState({ ...editState, notification_frequency: 'HOURLY' });
          }}
        />
        <Radio
          id="notification-frequency-daily"
          name="notification-frequency"
          value="notification-frequency"
          label="24時間に1回通知"
          checked={editState.notification_frequency === 'DAILY'}
          onChange={() => {
            setEditState({ ...editState, notification_frequency: 'DAILY' });
          }}
        />
      </div>

      <PrimaryButton
        className="mx-auto mt-12 h-12 px-12"
        type="submit"
        onClick={async () => {
          await postCreateGroup({
            group_name: editState.group_name,
            area: editState.area,
            speciality: editState.speciality,
            disease: editState.disease,
            explanation: editState.explanation,
            member_ids: editState.member_ids,
            notification_frequency: editState.notification_frequency,
            assignable: editState.assignable,
            is_public: editState.assignable ? editState.is_public : false,
          }).then((res) => {
            const { group_room_id } = res.data;
            if (group_room_id) {
              router.push({ pathname: '/group', query: { group_room_id: group_room_id } });
            }
          });
        }}
      >
        グループを作成
      </PrimaryButton>
    </div>
  );
};
