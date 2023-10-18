import 'cross-fetch/polyfill';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { RecoilRoot } from 'recoil';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useGetCurrentChatRoomDraft } from '@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft';
import { usePostChatRoomDraft } from '@/hooks/api/chatRoomDraft/usePostChatRoomDraft';
import { useUpdateChatRoomDraft } from '@/hooks/api/chatRoomDraft/useUpdateChatRoomDraft';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    isReady: true,
  }),
}));
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');
jest.mock('@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft');
jest.mock('@/hooks/api/chatRoomDraft/usePostChatRoomDraft');
jest.mock('@/hooks/api/chatRoomDraft/useUpdateChatRoomDraft');

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

beforeEach(() => {
  (useGetCurrentChatRoomDraft as jest.Mock).mockReturnValue({
    getCurrentChatRoomDraft: jest.fn().mockResolvedValue(undefined),
  });
  (usePostChatRoomDraft as jest.Mock).mockReturnValue({
    postChatRoomDraft: jest.fn().mockResolvedValue({ data: { chat_room_draft_id: 'draftid' } }),
  });
  (useUpdateChatRoomDraft as jest.Mock).mockReturnValue({
    updateChatRoomDraft: jest.fn().mockResolvedValue({ data: {} }),
  });
});

describe('useNewChatRoom', () => {
  describe('setChatRoomFields', () => {
    test('値を保存しテキスト入力以外は下書きに送信', async () => {
      const postChatRoomDraft = jest.fn();
      postChatRoomDraft.mockResolvedValue({
        data: {
          chat_room_draft_id: 'draftid',
        },
      });
      (usePostChatRoomDraft as jest.Mock).mockReturnValue({
        postChatRoomDraft,
      });

      const { result } = await act(
        async () =>
          await renderHook(() => useNewChatRoom(), {
            wrapper: RecoilRoot,
          })
      );

      const data = { disease_name: 'disease2', age: 30 };
      await act(async () => await result.current.setChatRoomFields(data));

      await waitFor(() => {
        expect(result.current.chatRoom.disease_name).toBe('disease2');
        expect(result.current.chatRoom.age).toBe(30);
        expect(postChatRoomDraft).toBeCalled();
      });
    });

    test('テキスト入力のみは下書き送信しない', async () => {
      const postChatRoomDraft = jest.fn();
      postChatRoomDraft.mockResolvedValue({
        data: {
          chat_room_draft_id: 'draftid',
        },
      });
      (usePostChatRoomDraft as jest.Mock).mockReturnValue({
        postChatRoomDraft,
      });

      const { result } = await act(
        async () =>
          await renderHook(() => useNewChatRoom(), {
            wrapper: RecoilRoot,
          })
      );

      const data = { disease_name: 'disease2', first_message: 'first message' };
      await act(async () => await result.current.setChatRoomFields(data));

      await waitFor(() => {
        expect(result.current.chatRoom.disease_name).toBe('disease2');
        expect(result.current.chatRoom.first_message).toBe('first message');
        expect(postChatRoomDraft).not.toBeCalled();
      });
    });
  });
});
