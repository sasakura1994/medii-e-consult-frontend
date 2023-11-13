import {
  useFetchBaseChatRoomForReConsult,
  FetchBaseChatRoomForReConsultResponseData,
} from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import 'cross-fetch/polyfill';
import { act, renderHook } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';

import { useRouter } from 'next/router';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';
import { usePostChatRoom } from '@/hooks/api/chat/usePostChatRoom';
import * as usePostChatMessageFileModule from '@/hooks/api/chat/usePostChatMessageFile';
import * as usePostDraftImageModule from '@/hooks/api/chat/usePostDraftImage';
import * as useGetChatDraftImagesModule from '@/hooks/api/chat/useGetChatDraftImages';
import * as useDeleteChatDraftImageModule from '@/hooks/api/chat/useDeleteChatDraftImage';
import * as useFetchFlagModule from '@/hooks/api/account/useFetchFlags';
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
jest.mock('@/hooks/api/chat/useFetchBaseChatRoomForReConsult');
jest.mock('@/hooks/api/chat/usePostChatRoom');
jest.mock('@/hooks/api/chat/usePostChatMessageFile');
jest.mock('@/hooks/api/account/useFetchFlags');
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

const usePostChatRoomMock = jest.mocked(usePostChatRoom);
usePostChatRoomMock.mockReturnValue({
  createNewChatRoom: jest.fn(),
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
const useFetchBaseChatRoomForReConsultMock = jest.mocked(useFetchBaseChatRoomForReConsult);
useFetchBaseChatRoomForReConsultMock.mockReturnValue({
  fetchBaseChatRoomForReConsult: jest.fn().mockReturnValue(baseChatRoomForReConsultData),
});

const deleteChatDraftImageMock = jest.fn();
deleteChatDraftImageMock.mockResolvedValue(true);
const useDeleteChatDraftImageMock = jest.spyOn(useDeleteChatDraftImageModule, 'useDeleteChatDraftImage');
useDeleteChatDraftImageMock.mockReturnValue({
  deleteChatDraftImage: deleteChatDraftImageMock,
});

beforeEach(() => {
  const usePostChatMessageFileMock = jest.spyOn(usePostChatMessageFileModule, 'usePostChatMessageFile');
  usePostChatMessageFileMock.mockReturnValue({
    postChatMessageFile: jest.fn(),
  });

  const usePostDraftImageMock = jest.spyOn(usePostDraftImageModule, 'usePostDraftImage');
  usePostDraftImageMock.mockReturnValue({
    createDraftImage: jest.fn(),
  });

  const useGetChatDraftImagesMock = jest.spyOn(useGetChatDraftImagesModule, 'useGetChatDraftImages');
  useGetChatDraftImagesMock.mockReturnValue({
    chatDraftImages: [],
    mutate: jest.fn(),
    isLoading: false,
    error: null,
  });

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
  describe('submit', () => {
    test('通常', async () => {
      const createNewChatRoomMock = jest.fn();
      createNewChatRoomMock.mockResolvedValueOnce({
        data: {
          chat_room_id: 'chatroomid',
          code: 1,
        },
      });
      const usePostChatRoomMock = jest.mocked(usePostChatRoom);
      usePostChatRoomMock.mockReturnValue({
        createNewChatRoom: createNewChatRoomMock,
      });

      const pushMock = jest.fn();
      const useRouterMock = jest.mocked(useRouter);
      useRouterMock.mockReturnValue({
        query: {
          from: 'mail',
        },
        push: pushMock,
        isReady: true,
      } as unknown as ReturnType<typeof useRouter>);

      const mutateFetchFlagMock = jest.spyOn(useFetchFlagModule, 'mutateFetchFlag');

      const { result } = await renderHook(() => useNewChatRoom(), {});

      await act(() => result.current.submit());

      expect(pushMock).toBeCalled();
      expect(createNewChatRoomMock).toBeCalledWith({
        age: 0,
        chat_draft_image_ids: [],
        chat_room_id: expect.anything(),
        disease_name: '',
        first_message: '',
        create_source: { from: 'mail' },
        gender: 'man',
        group_id: undefined,
        publishment_accepted: true,
        room_type: 'FREE',
        target_doctor: undefined,
        target_specialities: [],
        from: 'mail',
      });
      expect(createNewChatRoomMock).toBeCalled();
      expect(mutateFetchFlagMock).toHaveBeenCalledWith('FirstConsultCampaign');
    });

    test('再コンサル時', async () => {
      const createNewChatRoomMock = jest.fn();
      createNewChatRoomMock.mockResolvedValueOnce({
        data: {
          chat_room_id: 'chatroomid',
          code: 1,
        },
      });
      const usePostChatRoomMock = jest.mocked(usePostChatRoom);
      usePostChatRoomMock.mockReturnValue({
        createNewChatRoom: createNewChatRoomMock,
      });

      const pushMock = jest.fn();
      const useRouterMock = jest.mocked(useRouter);
      useRouterMock.mockReturnValue({
        query: { reconsult: 'basechatroomid' },
        push: pushMock,
        isReady: true,
      } as unknown as ReturnType<typeof useRouter>);

      const postChatMessageFileMock = jest.fn();
      postChatMessageFileMock.mockResolvedValue(true);
      const usePostChatMessageFileMock = jest.spyOn(usePostChatMessageFileModule, 'usePostChatMessageFile');
      usePostChatMessageFileMock.mockReturnValue({
        postChatMessageFile: postChatMessageFileMock,
      });

      const { result } = await act(async () => await renderHook(() => useNewChatRoom(), {}));

      act(() => result.current.setFilesForReConsult([{ id: 1, file: new File([], ''), image: '' }]));
      await act(async () => await result.current.submit());

      expect(pushMock).toBeCalled();
      expect(createNewChatRoomMock).toBeCalled();
      expect(postChatMessageFileMock).toBeCalled();
    });
  });
});
