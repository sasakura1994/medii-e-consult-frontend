import { loadLocalStorage } from '@/libs/LocalStorageManager';
import 'cross-fetch/polyfill';
import { act, renderHook } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';

jest.mock('next/router');
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');
jest.mock('@/libs/LocalStorageManager');

const medicalSpecialitiesMock: MedicalSpecialityEntity[] = [
  { speciality_code: 'ALLERGY' } as MedicalSpecialityEntity,
  { speciality_code: 'BYOURI' } as MedicalSpecialityEntity,
  { speciality_code: 'GANKA' } as MedicalSpecialityEntity,
];

const useFetchMedicalSpecialitiesMock = jest.mocked(
  useFetchMedicalSpecialities
);
useFetchMedicalSpecialitiesMock.mockReturnValue({
  medicalSpecialities: medicalSpecialitiesMock,
  isLoading: false,
  error: undefined,
});

describe('useNewChatROom', () => {
  describe('chatRoom', () => {
    test('room_type:専門医指定方法のクエリが存在', () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { room_type: 'BY_NAME' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.room_type).toBe('BY_NAME');
    });

    test('target_account_id:医師を指定', () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { target_account_id: 'accountid' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.target_doctor).toBe('accountid');
      expect(result.current.chatRoom.room_type).toBe('BY_NAME');
    });

    test('target_group_id:グループを指定', () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { target_group_id: 'group1' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.group_id).toBe('group1');
      expect(result.current.chatRoom.room_type).toBe('GROUP');
    });
  });

  test('selectedMedicalSpecialities', () => {
    const { result } = renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    act(() =>
      result.current.setChatRoomFields({
        target_specialities: ['ALLERGY', 'BYOURI', 'GANKA'],
      })
    );

    expect(result.current.selectedMedicalSpecialities).toEqual(
      medicalSpecialitiesMock
    );
  });

  describe('initialize', () => {
    test('下書きがある場合', () => {
      const chatRoom = {
        disease_name: '風邪',
        target_specialities: [],
      } as unknown as NewChatRoomEntity;
      const loadLocalStorageMock = jest.mocked(loadLocalStorage);
      loadLocalStorageMock.mockReturnValue(JSON.stringify(chatRoom));

      global.confirm = jest.fn().mockReturnValue(true);

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.disease_name).toBe('風邪');

      (global.confirm as jest.Mock).mockClear();
    });

    test('下書きがあるが復元しない場合', () => {
      const chatRoom = {
        disease_name: '風邪',
        target_specialities: [],
      } as unknown as NewChatRoomEntity;
      const loadLocalStorageMock = jest.mocked(loadLocalStorage);
      loadLocalStorageMock.mockReturnValue(JSON.stringify(chatRoom));

      global.confirm = jest.fn().mockReturnValue(false);

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.disease_name).not.toBe('風邪');

      (global.confirm as jest.Mock).mockClear();
    });
  });
});
