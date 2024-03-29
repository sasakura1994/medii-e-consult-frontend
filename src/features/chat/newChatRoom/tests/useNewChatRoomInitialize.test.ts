import {
  useFetchBaseChatRoomForReConsult,
  FetchBaseChatRoomForReConsultResponseData,
} from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import 'cross-fetch/polyfill';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { useRouter } from 'next/router';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';
import * as useDeleteChatDraftImageModule from '@/hooks/api/chat/useDeleteChatDraftImage';
import { useGetCurrentChatRoomDraft } from '@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    isReady: true,
  }),
}));
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');
jest.mock('@/hooks/api/chat/useFetchBaseChatRoomForReConsult');
jest.mock('@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft');

const medicalSpecialitiesMock: MedicalSpecialityEntity[] = [
  { speciality_code: 'ALLERGY' } as MedicalSpecialityEntity,
  { speciality_code: 'BYOURI' } as MedicalSpecialityEntity,
  { speciality_code: 'GANKA' } as MedicalSpecialityEntity,
];

const useFetchMedicalSpecialitiesMock = jest.mocked(useFetchMedicalSpecialities);
useFetchMedicalSpecialitiesMock.mockReturnValue({
  medicalSpecialities: medicalSpecialitiesMock,
  isLoading: false,
  error: undefined,
});

const baseChatRoomForReConsultData: FetchBaseChatRoomForReConsultResponseData = {
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
      uid: 1,
      file_id: 'file1',
    } as ChatMessageEntity,
    {
      uid: 2,
      file_id: 'file2',
    } as ChatMessageEntity,
  ],
};
const fetchBaseChatRoomForReConsult = jest.fn();
fetchBaseChatRoomForReConsult.mockResolvedValue(baseChatRoomForReConsultData);
(useFetchBaseChatRoomForReConsult as jest.Mock).mockReturnValue({
  fetchBaseChatRoomForReConsult,
});

const deleteChatDraftImageMock = jest.fn();
deleteChatDraftImageMock.mockResolvedValue(true);
const useDeleteChatDraftImageMock = jest.spyOn(useDeleteChatDraftImageModule, 'useDeleteChatDraftImage');
useDeleteChatDraftImageMock.mockReturnValue({
  deleteChatDraftImage: deleteChatDraftImageMock,
});

beforeEach(() => {
  (useGetCurrentChatRoomDraft as jest.Mock).mockReturnValue({
    getCurrentChatRoomDraft: jest.fn().mockResolvedValue(undefined),
  });
});

describe('useNewChatRoom', () => {
  describe('initialize', () => {
    describe('下書き', () => {
      beforeEach(() => {
        const getCurrentChatRoomDraft = jest.fn();
        getCurrentChatRoomDraft.mockResolvedValue({
          data: {
            data: {
              disease_name: '風邪',
              target_specialities: [],
            },
          },
        });
        (useGetCurrentChatRoomDraft as jest.Mock).mockReturnValue({
          getCurrentChatRoomDraft,
        });
      });

      test('下書きがある場合', async () => {
        const { result } = await act(async () => await renderHook(() => useNewChatRoom(), {}));

        await act(async () => await result.current.applyDraft());

        await waitFor(() => expect(result.current.chatRoom.disease_name).toBe('風邪'));
      });

      test('下書きがあるが復元しない場合', async () => {
        const { result } = await act(async () => await renderHook(() => useNewChatRoom(), {}));

        await act(async () => await result.current.dontUseDraft());

        await waitFor(() => {
          expect(result.current.isDraftConfirming).toBeFalsy();
          // こちらだけだと関係なくても通ってしまうので必ず上と一緒にチェック
          expect(result.current.chatRoom.disease_name).not.toBe('風邪');
        });
      });
    });

    test('再コンサル', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      const getCurrentChatRoomDraft = jest.fn();
      (useGetCurrentChatRoomDraft as jest.Mock).mockReturnValue({
        getCurrentChatRoomDraft,
      });

      (useRouterMock as jest.Mock).mockReturnValue({
        query: { reconsult: 'chatroomid' },
        isReady: true,
      });

      const { result } = await act(async () => await renderHook(() => useNewChatRoom(), {}));

      await waitFor(() => {
        expect(result.current.ageRange).toBe('20');
        expect(result.current.chatRoom.disease_name).toBe('disease');
        expect(result.current.chatRoom.first_message).toBe('first message');
        expect(result.current.chatRoom.target_specialities).toEqual(['ALLERGY', 'BYOURI', 'GANKA']);
        expect(result.current.reConsultFileMessages).toEqual(baseChatRoomForReConsultData.file_messages);
        expect(getCurrentChatRoomDraft).not.toBeCalled();
      });
    });
  });
});
