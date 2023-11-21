import { act, renderHook, waitFor } from '@testing-library/react';
import { useEditGroupDetail } from '../useEditGroupDetail';
import { useFetchGroupMemberData } from '@/hooks/api/group/useFetchGroupMemberData';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { usePostCreateGroup } from '@/hooks/api/group/usePostCreateGroup';
import { useToken } from '@/hooks/authentication/useToken';
jest.mock('next/router', () => ({
  useRouter: () => ({}),
}));

jest.mock('@/hooks/api/group/useFetchGroupMemberData');
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');
jest.mock('@/hooks/api/group/usePostCreateGroup');
jest.mock('@/hooks/authentication/useToken');

const useFetchGroupMemberDataMock = useFetchGroupMemberData as jest.Mocked<typeof useFetchGroupMemberData>;
const mockData = {
  data: {
    account_id: '1',
    area_code: '1',
    area_txt: '東京',
    full_name: 'テスト 太郎',
    hospital_id: '1',
    hospital_name: '東京病院',
    speciality_code: '1',
  },
};
const fetchGroupMemberDataMock = jest.fn().mockResolvedValue(mockData);
(useFetchGroupMemberDataMock as jest.Mock).mockReturnValue({
  fetchGroupMemberData: fetchGroupMemberDataMock,
});

const usePostCreateGroupMock = usePostCreateGroup as jest.Mocked<typeof usePostCreateGroup>;
(usePostCreateGroupMock as jest.Mock).mockReturnValue({
  group_id: '1',
});

const useFetchMedicalSpecialitiesMock = useFetchMedicalSpecialities as jest.Mocked<typeof useFetchMedicalSpecialities>;
(useFetchMedicalSpecialitiesMock as jest.Mock).mockReturnValue({
  medicalSpecialities: [
    {
      speciality_code: '1',
      medical_speciality_category_id: '1',
      name: '内科',
      display_order: 1,
    },
  ],
});
const useTokenMock = useToken as jest.Mocked<typeof useToken>;
(useTokenMock as jest.Mock).mockReturnValue({
  accountId: '1',
});
describe('useEditGroupDetail', () => {
  test('useEditGroupDetailフックが初期化されたときにデフォルトの編集状態を持つ', async () => {
    let result: { current: ReturnType<typeof useEditGroupDetail> } | undefined;

    await act(async () => {
      result = renderHook(() => useEditGroupDetail({})).result;
    });
    expect(result?.current.editState).toEqual({
      group_id: '',
      is_public: true,
      group_name: '',
      area: '',
      speciality: 'MDD',
      disease: '',
      explanation: '',
      member_ids: ['1'],
      notification_frequency: 'ALL',
      assignable: true,
    });

    expect(result?.current.myAccountId).toBe('1');
  });

  test('下書きが適用されたときにuseEditGroupDetailフックが新しい編集状態を持つ', async () => {
    let result: { current: ReturnType<typeof useEditGroupDetail> } | undefined;

    await act(async () => {
      result = renderHook(() => useEditGroupDetail({})).result;
    });

    await act(async () => {
      result?.current.setDraft({
        group_id: 'draft',
        is_public: true,
        group_name: 'draft',
        area: 'draft',
        speciality: 'AAA',
        disease: 'draft',
        explanation: 'draft',
        member_ids: ['1', '2', '3'],
        notification_frequency: 'ALL',
        assignable: true,
      });
    });
    await act(async () => {
      result?.current.applyDraft();
    });

    await waitFor(() => {
      expect(result?.current.editState).toStrictEqual({
        group_id: 'draft',
        is_public: true,
        group_name: 'draft',
        area: 'draft',
        speciality: 'AAA',
        disease: 'draft',
        explanation: 'draft',
        member_ids: ['1', '2', '3'],
        notification_frequency: 'ALL',
        assignable: true,
      });
    });
  });
  test('下書きが破棄されたときにuseEditGroupDetailフックがデフォルトの編集状態に戻る', async () => {
    let result: { current: ReturnType<typeof useEditGroupDetail> } | undefined;

    await act(async () => {
      result = renderHook(() => useEditGroupDetail({})).result;
    });
    await act(async () => {
      result?.current.setDraft({
        group_id: 'draft',
        is_public: true,
        group_name: 'draft',
        area: 'draft',
        speciality: 'AAA',
        disease: 'draft',
        explanation: 'draft',
        member_ids: ['1', '2', '3'],
        notification_frequency: 'ALL',
        assignable: true,
      });
    });
    await act(async () => {
      result?.current.dontUseDraft();
    });
    await waitFor(() => {
      expect(result?.current.editState).toStrictEqual({
        group_id: '',
        is_public: true,
        group_name: '',
        area: '',
        speciality: 'MDD',
        disease: '',
        explanation: '',
        member_ids: ['1'],
        notification_frequency: 'ALL',
        assignable: true,
      });
    });
  });
});
