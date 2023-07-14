import {
  useFetchBaseChatRoomForReConsult,
  FetchBaseChatRoomForReConsultResponseData,
} from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import { loadLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';
import 'cross-fetch/polyfill';
import { act, renderHook, waitFor } from '@testing-library/react';
import { newChatRoomFormDataKey, useNewChatRoom } from '../useNewChatRoom';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';

jest.mock('next/router');
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');
jest.mock('@/hooks/api/chat/useFetchBaseChatRoomForReConsult');
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

const baseChatRoomForReConsultData: FetchBaseChatRoomForReConsultResponseData =
  {
    chat_room: {
      chat_room_id: 'chatroomid',
      disease_name: 'disease',
      age: 20,
    } as ChatRoomEntity,
    first_message: 'first message',
    medical_specialities: [
      {
        speciality_code: 'ALLERGY',
        name: 'アレルギー内科',
      } as MedicalSpecialityEntity,
      {
        speciality_code: 'BYOURI',
        name: '病理科',
      } as MedicalSpecialityEntity,
      {
        speciality_code: 'GANKA',
        name: '眼科',
      } as MedicalSpecialityEntity,
    ],
    file_messages: [
      {
        file_id: 'file1',
      } as ChatMessageEntity,
      {
        file_id: 'file2',
      } as ChatMessageEntity,
    ],
  };
const useFetchBaseChatRoomForReConsultMock = jest.mocked(
  useFetchBaseChatRoomForReConsult
);
useFetchBaseChatRoomForReConsultMock.mockReturnValue({
  fetchBaseChatRoomForReConsult: jest
    .fn()
    .mockReturnValue(baseChatRoomForReConsultData),
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
    describe('下書き', () => {
      beforeEach(() => {
        const chatRoom = {
          disease_name: '風邪',
          target_specialities: [],
        } as unknown as NewChatRoomEntity;
        const loadLocalStorageMock = jest.mocked(loadLocalStorage);
        loadLocalStorageMock.mockReturnValueOnce(JSON.stringify(chatRoom));
      });

      afterEach(() => {
        (global.confirm as jest.Mock).mockClear();
      });

      test('下書きがある場合', () => {
        global.confirm = jest.fn().mockReturnValue(true);

        const { result } = renderHook(() => useNewChatRoom(), {
          wrapper: RecoilRoot,
        });

        expect(result.current.chatRoom.disease_name).toBe('風邪');
      });

      test('下書きがあるが復元しない場合', () => {
        global.confirm = jest.fn().mockReturnValue(false);

        const { result } = renderHook(() => useNewChatRoom(), {
          wrapper: RecoilRoot,
        });

        expect(result.current.chatRoom.disease_name).not.toBe('風邪');
      });
    });

    test('再コンサル', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { reconsult: 'chatroomid' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await waitFor(() => {
        expect(result.current.ageRange).toBe('20');
        expect(result.current.chatRoom.disease_name).toBe('disease');
        expect(result.current.chatRoom.first_message).toBe('first message');
        expect(result.current.chatRoom.target_specialities).toEqual([
          'ALLERGY',
          'BYOURI',
          'GANKA',
        ]);
        expect(result.current.reConsultFileMessages).toEqual(
          baseChatRoomForReConsultData.file_messages
        );
      });
    });
  });

  test('setChatRoomFields', () => {
    const saveLocalStorageMock = jest.mocked(saveLocalStorage);

    const { result } = renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    const data = { disease_name: 'disease2' };
    act(() => result.current.setChatRoomFields(data));

    waitFor(() => {
      expect(result.current.chatRoom.disease_name).toBe('disease2');
      expect(saveLocalStorageMock).toBeCalledWith(
        newChatRoomFormDataKey,
        JSON.stringify({
          ...result.current.chatRoom,
          age: 0,
          ...data,
        })
      );
    });
  });

  describe('setAgeRangeWrapper', () => {
    test('child', () => {
      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() => result.current.setAgeRangeWrapper('child'));

      waitFor(() => {
        expect(result.current.chatRoom.age).toBeUndefined();
        expect(result.current.ageRange).toBe('child');
        expect(result.current.childAge).toBe('');
      });
    });

    test('年代', () => {
      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() => result.current.setAgeRangeWrapper('20'));

      waitFor(() => {
        expect(result.current.chatRoom.age).toEqual(20);
        expect(result.current.ageRange).toBe('20');
      });
    });
  });

  test('setChildAgeWrapper', () => {
    const { result } = renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.setChildAgeWrapper('5'));

    waitFor(() => {
      expect(result.current.chatRoom.age).toEqual(5);
      expect(result.current.childAge).toBe('5');
    });
  });
});
