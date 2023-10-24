import 'cross-fetch/polyfill';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { RecoilRoot } from 'recoil';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useGetCurrentChatRoomDraft } from '@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft';
import { usePostChatRoomDraft } from '@/hooks/api/chatRoomDraft/usePostChatRoomDraft';
import { useUpdateChatRoomDraft } from '@/hooks/api/chatRoomDraft/useUpdateChatRoomDraft';
import { useRouter } from 'next/router';
import {
  FetchBaseChatRoomForReConsultResponseData,
  useFetchBaseChatRoomForReConsult,
} from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';

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
jest.mock('@/hooks/api/chat/useFetchBaseChatRoomForReConsult');

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

    test('再コンサルの場合は下書き送信しない', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {
          reconsult: 'chatroomid',
        },
        isReady: true,
      });

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
        expect(postChatRoomDraft).not.toBeCalled();
      });
    });

    describe('テキスト入力のみ', () => {
      test('下書き送信しない＆別の更新でタイマーは解除', async () => {
        (useRouter as jest.Mock).mockReturnValue({
          query: {},
          isReady: true,
        });

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
          expect(result.current.draftSavingTimeoutId).not.toBeUndefined();
        });

        await act(async () => await result.current.updateDraft());

        await waitFor(() => {
          expect(result.current.draftSavingTimeoutId).toBeUndefined();
        });
      });
    });
  });
});
