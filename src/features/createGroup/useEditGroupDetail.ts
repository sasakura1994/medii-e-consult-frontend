import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { GroupEntity, NotificationFrequency } from '@/hooks/api/group/useFetchGetGroup';
import { FetchedGroupEntity } from '@/hooks/api/group/useFetchGroup';
import { useFetchGroupMemberData } from '@/hooks/api/group/useFetchGroupMemberData';
import { SearchGroupMember } from '@/hooks/api/group/useFetchSearchMember';
import { usePostCreateGroup } from '@/hooks/api/group/usePostCreateGroup';
import { useUpdateGroup } from '@/hooks/api/group/useUpdateGroup';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useToken } from '@/hooks/authentication/useToken';
import { saveLocalStorage, loadLocalStorage, removeLocalStorage } from '@/libs/LocalStorageManager';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, FormEvent } from 'react';
import { KeyedMutator } from 'swr';

type EditGroupState = {
  group_id?: string;
  is_public: boolean;
  group_name: string;
  area: string;
  speciality: string;
  disease: string;
  explanation: string;
  member_ids: string[];
  notification_frequency: NotificationFrequency;
  assignable: boolean;
};

type QueryParams = {
  admin?: 'true';
};

const baseUrl = 'https://tayori.com/form/';
const formId = '62897c986d36f5b573fec1a04508f24b70b11fe6/';
const queryParamsPart1 = '?_gl=1*1ub7pnq*_ga*MTMwODkzMzc5Ni4xNjg0ODE5NDIy';
const queryParamsPart2 = '*_ga_C9VCVTY692*MTY5OTkxMzI1MS4zNjMuMS4xNjk5OTE2MDg4LjYwLjAuMA..';
const queryParams = queryParamsPart1 + queryParamsPart2;
const inquiryFormUrl = baseUrl + formId + queryParams;

const defaultEditGroupState = {
  group_id: '',
  is_public: true,
  group_name: '',
  area: '',
  speciality: 'MDD',
  disease: '',
  explanation: '',
  member_ids: [],
  notification_frequency: 'ALL' as NotificationFrequency,
  assignable: true,
};

type Props = {
  isEdit?: boolean;
  setIsOpenEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  originalGroupData?: GroupEntity;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
  mutateGroup?: KeyedMutator<FetchedGroupEntity>;
};

export const useEditGroupDetail = (props: Props) => {
  const { isEdit, setIsOpenEditModal, originalGroupData, mutateChatRoom, mutateChatRoomList, mutateGroup } = props;
  const router = useRouter();
  const { admin } = router.query as QueryParams;
  const [isOpenInviteMemberModal, setIsOpenInviteMemberModal] = useState(false);
  const [isDraftConfirming, setIsDraftConfirming] = useState(false);
  const [draft, setDraft] = useState<EditGroupState>();
  const [selectedMembers, setSelectedMembers] = useState<SearchGroupMember[]>([]);
  const [editState, setEditState] = useState<EditGroupState>(defaultEditGroupState);
  const { accountId: myAccountId } = useToken();
  const { fetchGroupMemberData } = useFetchGroupMemberData();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { postCreateGroup } = usePostCreateGroup();
  const { updateGroup } = useUpdateGroup();

  const applyDraft = useCallback(() => {
    if (!isEdit && draft) {
      // 下書きのメンバーのaccount_idの配列をfetchGroupMemberDataに渡しメンバーの情報を取得する
      draft.member_ids.forEach(async (memberId) => {
        await fetchGroupMemberData({ account_id: memberId }).then((res) => {
          // 既に情報取得されているメンバーを除いて追加する
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
      });
      // 下書きの情報をセットする
      setEditState(draft);
    }
    setIsDraftConfirming(false);
  }, [draft, fetchGroupMemberData, isEdit]);

  const dontUseDraft = () => {
    setIsDraftConfirming(false);
  };

  useEffect(() => {
    if (!isEdit && myAccountId) {
      fetchGroupMemberData({ account_id: myAccountId }).then((res) => {
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
  }, [myAccountId, fetchGroupMemberData, isEdit]);

  useEffect(() => {
    if (selectedMembers.length > 0) {
      setEditState((prevState) => {
        const newState = {
          ...prevState,
          member_ids: selectedMembers.map((member) => member.account_id),
        };
        const defaultEditGroupStateWithMyAccount = {
          ...defaultEditGroupState,
          member_ids: [myAccountId],
        };
        if (!isEdit) {
          // デフォルト値から変更があった場合のみローカルストレージに保存する
          if (!(JSON.stringify(defaultEditGroupStateWithMyAccount) === JSON.stringify(newState))) {
            saveLocalStorage('EditGroupDetail::groupData', JSON.stringify(newState));
          } else {
            removeLocalStorage('EditGroupDetail::groupData');
          }
        }

        return newState;
      });
    }
  }, [isEdit, myAccountId, selectedMembers]);

  // ローカルストレージから下書きを取得する
  useEffect(() => {
    if (!isEdit && loadLocalStorage('EditGroupDetail::groupData')) {
      setDraft(JSON.parse(loadLocalStorage('EditGroupDetail::groupData') || '{}'));
      setIsDraftConfirming(true);
    }
  }, [isEdit]);

  // editモードの場合
  useEffect(() => {
    if (isEdit && originalGroupData) {
      setEditState({
        group_id: originalGroupData.group_id,
        is_public: originalGroupData.is_public,
        group_name: originalGroupData.group_name,
        area: originalGroupData.area,
        speciality: originalGroupData.speciality,
        disease: originalGroupData.disease,
        explanation: originalGroupData.explanation,
        member_ids: originalGroupData.member_ids,
        notification_frequency: originalGroupData.notification_frequency,
        assignable: originalGroupData.assignable,
      });
      originalGroupData.member_ids.forEach(async (memberId) => {
        await fetchGroupMemberData({ account_id: memberId }).then((res) => {
          // 既に情報取得されているメンバーを除いて追加する
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
      });
    }
  }, [isEdit, originalGroupData, fetchGroupMemberData]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      postCreateGroup({
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
        if (res.status === 201 && group_room_id) {
          router.push({ pathname: '/group', query: { group_room_id: group_room_id } });
        }
      });
      removeLocalStorage('EditGroupDetail::groupData');
    },
    [editState, postCreateGroup, router]
  );

  const update = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await updateGroup({
        group_id: editState.group_id,
        group_name: editState.group_name,
        area: editState.area,
        speciality: editState.speciality,
        disease: editState.disease,
        explanation: editState.explanation,
        member_ids: editState.member_ids,
        notification_frequency: editState.notification_frequency,
        assignable: editState.assignable,
        is_public: editState.assignable ? editState.is_public : false,
      });
      await mutateGroup?.();
      await mutateChatRoom?.();
      await mutateChatRoomList?.();

      setIsOpenEditModal?.(false);
    },
    [editState, mutateChatRoom, mutateChatRoomList, mutateGroup, setIsOpenEditModal, updateGroup]
  );

  const saveLocalStorageDraft = useCallback(
    (newState: EditGroupState) => {
      if (!isEdit) {
        saveLocalStorage('EditGroupDetail::groupData', JSON.stringify(newState));
        return newState;
      }
      return newState;
    },
    [isEdit]
  );

  return {
    myAccountId,
    admin,
    editState,
    setEditState,
    setDraft,
    submit,
    selectedMembers,
    setSelectedMembers,
    medicalSpecialities,
    isOpenInviteMemberModal,
    setIsOpenInviteMemberModal,
    isDraftConfirming,
    applyDraft,
    dontUseDraft,
    inquiryFormUrl,
    update,
    saveLocalStorageDraft,
  };
};
