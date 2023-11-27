import PrimaryButton from '@/components/Button/PrimaryButton';
import TextArea from '@/components/TextArea/TextArea';
import TextField from '@/components/TextField/TextField';
import React from 'react';
import { InviteMemberModal } from './InviteMemberModal';
import { MedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/MedicalSpecialitySelectButton';
import { ConfirmModal } from '@/components/Parts/Modal/ConfirmModal';
import { useEditGroupDetail } from './useEditGroupDetail';
import { EditGroupDetailMemberListTable } from './EditGroupDetailMemberListTable';
import { GroupEntity, NotificationFrequency } from '@/hooks/api/group/useFetchGetGroup';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { KeyedMutator } from 'swr';
import { FetchedGroupEntity } from '@/hooks/api/group/useFetchGroup';
import { DefaultRadio } from '@/components/Parts/Form/DefaultRadio';

export type EditGroupDetailProps = {
  isEdit?: boolean;
  setIsOpenEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLeaveGroupConfirmModal?: React.Dispatch<React.SetStateAction<boolean>>;
  originalGroupData?: GroupEntity;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
  mutateGroup?: KeyedMutator<FetchedGroupEntity>;
  isClickSubmitButtonFromModal?: boolean;
};

export const EditGroupDetail = (props: EditGroupDetailProps) => {
  const {
    isEdit,
    setIsOpenEditModal,
    setIsLeaveGroupConfirmModal,
    originalGroupData,
    mutateChatRoom,
    mutateChatRoomList,
    mutateGroup,
    isClickSubmitButtonFromModal,
  } = props;
  const {
    myAccountId,
    medicalSpecialities,
    selectedMembers,
    setSelectedMembers,
    editState,
    setEditState,
    submit,
    isDraftConfirming,
    isOpenInviteMemberModal,
    setIsOpenInviteMemberModal,
    applyDraft,
    dontUseDraft,
    update,
    saveLocalStorageDraft,
  } = useEditGroupDetail({
    isEdit: isEdit,
    setIsOpenEditModal: setIsOpenEditModal,
    originalGroupData: originalGroupData,
    mutateChatRoom: mutateChatRoom,
    mutateChatRoomList: mutateChatRoomList,
    mutateGroup: mutateGroup,
    isClickSubmitButtonFromModal: isClickSubmitButtonFromModal,
  });

  return (
    <div>
      {isDraftConfirming && (
        <ConfirmModal onOk={applyDraft} onCancel={dontUseDraft}>
          下書きに作成途中のグループがあります。作成途中のグループを続けて編集しますか？
        </ConfirmModal>
      )}
      {isOpenInviteMemberModal && (
        <InviteMemberModal
          setIsOpenModal={setIsOpenInviteMemberModal}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEdit) {
            update();
          } else {
            submit();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
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
          value={editState.area}
          onChange={(e) => {
            setEditState((prevState) => {
              const newState = {
                ...prevState,
                area: e.target.value,
              };
              saveLocalStorageDraft(newState);
              return newState;
            });
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
          onChange={(speciality) => {
            setEditState((prevState) => {
              const newState = {
                ...prevState,
                speciality: speciality,
              };
              saveLocalStorageDraft(newState);
              return newState;
            });
          }}
        />
        <label htmlFor="targetDisease" className="text-left font-bold">
          対象疾患
        </label>
        <TextField
          name="targetDisease"
          className="h-12 w-full"
          id="targetDisease"
          placeholder="例) 間質性肺炎"
          value={editState.disease}
          onChange={(e) => {
            setEditState((prevState) => {
              const newState = {
                ...prevState,
                disease: e.target.value,
              };
              saveLocalStorageDraft(newState);
              return newState;
            });
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
          value={editState.group_name}
          onChange={(e) => {
            setEditState((prevState) => {
              const newState = {
                ...prevState,
                group_name: e.target.value,
              };
              saveLocalStorageDraft(newState);
              return newState;
            });
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
          placeholder="グループの説明や特徴などを入力"
          value={editState.explanation}
          onChange={(e) => {
            setEditState((prevState) => {
              const newState = {
                ...prevState,
                explanation: e.target.value,
              };
              saveLocalStorageDraft(newState);
              return newState;
            });
          }}
        />
        <div className="mt-2">
          <div className="text-left font-bold">コンサル受付</div>
          <label>
            <DefaultRadio
              id="assignable-true"
              name="assignable"
              value="true"
              label="あり"
              checked={editState.assignable}
              onChange={() => {
                setEditState((prevState) => {
                  const newState = {
                    ...prevState,
                    assignable: true,
                  };
                  saveLocalStorageDraft(newState);
                  return newState;
                });
              }}
            />
            <div className="text-[13px]">※ 他の医師からコンサルが来る場合があります。</div>
          </label>
          <label>
            <DefaultRadio
              id="assignable-false"
              name="assignable"
              value="false"
              label="なし"
              checked={!editState.assignable}
              onChange={() => {
                setEditState((prevState) => {
                  const newState = {
                    ...prevState,
                    assignable: false,
                  };
                  saveLocalStorageDraft(newState);
                  return newState;
                });
              }}
            />
            <div className="text-[13px]">※ グループチャットのみ利用できます。検索結果にも表示されません。</div>
          </label>
        </div>
        {editState.assignable && (
          <div className="mt-2">
            <div className="text-left font-bold">検索</div>
            <label>
              <DefaultRadio
                id="isPublic-true"
                name="isPublic"
                value="true"
                label="公開"
                checked={editState.is_public}
                onChange={() => {
                  setEditState((prevState) => {
                    const newState = {
                      ...prevState,
                      is_public: true,
                    };
                    saveLocalStorageDraft(newState);
                    return newState;
                  });
                }}
              />
              <div className="text-[13px]">※ 検索結果に表示されます。</div>
            </label>
            <label>
              <DefaultRadio
                id="isPublic-false"
                name="isPublic"
                value="false"
                label="非公開"
                checked={!editState.is_public}
                onChange={() => {
                  setEditState((prevState) => {
                    const newState = {
                      ...prevState,
                      is_public: false,
                    };
                    saveLocalStorageDraft(newState);
                    return newState;
                  });
                }}
              />
              <div className="text-[13px]">
                ※ 検索結果には表示されませんが、特定のURLからコンサルを受け付けることができます。
              </div>
            </label>
          </div>
        )}

        <div className="mt-2 space-y-1">
          <label className="text-left font-bold">メッセージの通知頻度の設定</label>
          <div className="text-[13px]">
            ※このグループカンファレンス内の通知頻度を設定することで、通知回数を抑えることができます。
          </div>

          <DefaultRadio
            id="notification-frequency-all"
            name="notification-frequency"
            value="notification-frequency-all"
            label="毎回通知"
            checked={editState.notification_frequency === 'ALL'}
            onChange={() => {
              setEditState((prevState) => {
                const newState = {
                  ...prevState,
                  notification_frequency: 'ALL' as NotificationFrequency,
                };
                saveLocalStorageDraft(newState);
                return newState;
              });
            }}
          />
          <DefaultRadio
            id="notification-frequency-hourly"
            name="notification-frequency"
            value="notification-frequency"
            label="1時間に1回通知"
            checked={editState.notification_frequency === 'HOURLY'}
            onChange={() => {
              setEditState((prevState) => {
                const newState = {
                  ...prevState,
                  notification_frequency: 'HOURLY' as NotificationFrequency,
                };
                saveLocalStorageDraft(newState);
                return newState;
              });
            }}
          />
          <DefaultRadio
            id="notification-frequency-daily"
            name="notification-frequency"
            value="notification-frequency"
            label="24時間に1回通知"
            checked={editState.notification_frequency === 'DAILY'}
            onChange={() => {
              setEditState((prevState) => {
                const newState = {
                  ...prevState,
                  notification_frequency: 'DAILY' as NotificationFrequency,
                };
                saveLocalStorageDraft(newState);
                return newState;
              });
            }}
          />
        </div>
        <div className="mt-2">
          <label className="text-left font-bold">グループメンバー</label>
          {/* <div className="text-[13px]">
            メンバーを追加したい場合は
            <a target="_blank" className=" text-text-link underline" href={inquiryFormUrl} rel="noreferrer">
              Mediiコンシェルジュ
            </a>
            までお問い合わせください
          </div> */}
        </div>

        <div className="mt-2 flex items-center gap-4">
          <PrimaryButton
            type="button"
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
                      <EditGroupDetailMemberListTable
                        selectedMembers={selectedMembers}
                        setSelectedMembers={setSelectedMembers}
                        myAccountId={myAccountId ?? ''}
                        medicalSpeciality={medicalSpeciality}
                      />
                    )}
                  </>
                );
              })}
            {/* 専門家未指定の場合 */}
            {selectedMembers.some((member) => {
              return member.speciality_code === '';
            }) && (
              <EditGroupDetailMemberListTable
                selectedMembers={selectedMembers}
                setSelectedMembers={setSelectedMembers}
                myAccountId={myAccountId ?? ''}
              />
            )}
          </table>
        </div>

        {!isEdit && (
          <PrimaryButton className="mx-auto mt-12 h-12 px-12" type="submit">
            グループを作成
          </PrimaryButton>
        )}
        {isEdit && setIsOpenEditModal && setIsLeaveGroupConfirmModal && (
          <div className="mb-4 mt-8">
            <p
              className="text-[#999999} mt-4 cursor-pointer text-center text-base underline"
              onClick={() => {
                setIsOpenEditModal(false);
                setIsLeaveGroupConfirmModal(true);
              }}
            >
              このグループから退出する
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
