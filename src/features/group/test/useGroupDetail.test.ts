import { renderHook, act } from '@testing-library/react';
import { UseGroupDetailProps, useGroupDetail } from '../useGroupDetail';
import { useFetchGetGroup } from '@/hooks/api/group/useFetchGetGroup';
import { useToken } from '@/hooks/authentication/useToken';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { useSetAtom } from 'jotai';
import { ChatRoomGender, ChatRoomStatus, ChatRoomType } from '@/types/entities/chat/ChatRoomEntity';

jest.mock('@/hooks/api/group/useFetchGetGroup', () => ({
  useFetchGetGroup: jest.fn(),
}));

jest.mock('@/hooks/authentication/useToken', () => ({
  useToken: jest.fn(),
}));

jest.mock('@/hooks/medicalSpeciality/useMedicalSpeciality', () => ({
  useMedicalSpeciality: jest.fn(),
}));

jest.mock('@/globalStates/group', () => ({
  isGroupSelectedState: jest.fn(),
}));

jest.mock('jotai', () => ({
  useSetAtom: jest.fn(),
}));

const member1 = {
  account_id: '1',
  doctor_id: '1',
  last_name: 'テスト',
  first_name: 'テスト',
  last_name_hira: 'テスト',
  first_name_hira: 'テスト',
  hospital_prefecture_name: 'テスト',
  hospital_bed_count: 1,
  hospital_name: 'テスト',
  is_hospital_doctor: true,
  qualified_year: 2022,
  speciality_1: 'テスト',
  speciality_2: 'テスト',
  speciality_3: 'テスト',
  speciality_4: 'テスト',
  expertise: 'テスト',
  qualification: 'テスト',
  graduated_university: 'テスト',
  read_until: 1,
  last_read_date: '2022-01-01',
};

const member2 = {
  account_id: '2',
  doctor_id: '2',
  last_name: 'テスト2',
  first_name: 'テスト2',
  last_name_hira: 'テスト2',
  first_name_hira: 'テスト2',
  hospital_prefecture_name: 'テスト2',
  hospital_bed_count: 2,
  hospital_name: 'テスト2',
  is_hospital_doctor: true,
  qualified_year: 2022,
  speciality_1: 'テスト2',
  speciality_2: 'テスト2',
  speciality_3: 'テスト2',
  speciality_4: 'テスト2',
  expertise: 'テスト2',
  qualification: 'テスト2',
  graduated_university: 'テスト2',
  read_until: 2,
  last_read_date: '2022-01-02',
};

const commonChatRoomData = {
  chat_room: {
    chat_room_id: '1',
    owner_account_id: '1',
    status: 'CREATED' as ChatRoomStatus,
    title: 'title',
    content: 'content',
    latest_message_uid: 0,
    read_until: 0,
    latest_message: 'latest_message',
    room_type: 'FREE' as ChatRoomType,
    target_speciality: 'target_speciality',
    disease_name: 'disease_name',
    gender: 'man' as ChatRoomGender,
    gender_text: 'gender_text',
    short_title: 'short_title',
    age: null,
    member_name: 'member_name',
    resolve_requested_date: 'resolve_requested_date',
    last_updated_date: 'last_updated_date',
    dont_close: 0,
    group_id: '1',
    is_real_name: false,
  },
  members: [],
  me: member1,
  assigned_to_me: false,
  images: [],
};

describe('useGroupDetail', () => {
  beforeEach(() => {
    (useFetchGetGroup as jest.Mock).mockReturnValue({
      group: {},
    });
    (useToken as jest.Mock).mockReturnValue({
      accountId: '1',
    });
    (useMedicalSpeciality as jest.Mock).mockReturnValue({
      getMedicalSpecialityName: jest.fn(),
    });
    (useSetAtom as jest.Mock).mockReturnValue(jest.fn());
  });

  test('正しい初期値を返す', () => {
    const props: UseGroupDetailProps = {
      chatRoomData: commonChatRoomData,
      fetchNewChatList: jest.fn(),
    };

    const { result } = renderHook(() => useGroupDetail(props));

    expect(result.current.group).toEqual({});
    expect(result.current.accountId).toBe('1');
    expect(result.current.isOpenGroupMemberModal).toBe(false);
    expect(result.current.isShowNotificationFrequencySettingModal).toBe(true);
    expect(result.current.isOpenGroupEditModal).toBe(false);
    expect(result.current.isLeaveGroupConfirmModal).toBe(false);
    if (props && props.chatRoomData) {
      expect(result.current.groupMember).toEqual([props.chatRoomData.me]);
    }
  });

  test('モーダルの開閉を制御する', () => {
    const props: UseGroupDetailProps = {
      chatRoomData: commonChatRoomData,
      fetchNewChatList: jest.fn(),
    };

    const { result } = renderHook(() => useGroupDetail(props));

    act(() => {
      result.current.setIsOpenGroupMemberModal(true);
    });

    expect(result.current.isOpenGroupMemberModal).toBe(true);

    act(() => {
      result.current.setIsOpenGroupMemberModal(false);
    });

    expect(result.current.isOpenGroupMemberModal).toBe(false);
  });

  test('一致するメンバーがいない場合のみgroupMemberが更新される', () => {
    const props: UseGroupDetailProps = {
      chatRoomData: {
        ...commonChatRoomData,
        members: [member2],
      },
      fetchNewChatList: jest.fn(),
    };

    const { result } = renderHook(() => useGroupDetail(props));

    if (props.chatRoomData) {
      expect(result.current.groupMember).toEqual([member2, member1]);
    }
  });

  test('一致するメンバーがいる場合はgroupMemberが更新されない', () => {
    const props: UseGroupDetailProps = {
      chatRoomData: {
        ...commonChatRoomData,
        members: [member1],
      },
      fetchNewChatList: jest.fn(),
    };

    const { result } = renderHook(() => useGroupDetail(props));

    if (props.chatRoomData) {
      expect(result.current.groupMember).toEqual([member1]);
    }
  });
});
