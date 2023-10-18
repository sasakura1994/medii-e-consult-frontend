import {
  useFetchBaseChatRoomForReConsult,
  FetchBaseChatRoomForReConsultResponseData,
} from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import 'cross-fetch/polyfill';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';
import { ChangeEvent, FormEvent } from 'react';
import { usePostChatRoom } from '@/hooks/api/chat/usePostChatRoom';
import * as usePostChatMessageFileModule from '@/hooks/api/chat/usePostChatMessageFile';
import * as usePostDraftImageModule from '@/hooks/api/chat/usePostDraftImage';
import * as useGetChatDraftImagesModule from '@/hooks/api/chat/useGetChatDraftImages';
import * as useDeleteChatDraftImageModule from '@/hooks/api/chat/useDeleteChatDraftImage';
import * as useFetchFlagModule from '@/hooks/api/account/useFetchFlags';
import { useGetCurrentChatRoomDraft } from '@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft';
import { usePostChatRoomDraft } from '@/hooks/api/chatRoomDraft/usePostChatRoomDraft';
import { useUpdateChatRoomDraft } from '@/hooks/api/chatRoomDraft/useUpdateChatRoomDraft';
import { useDeleteChatRoomDrafts } from '@/hooks/api/chatRoomDraft/useDeleteChatRoomDrafts';

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
jest.mock('@/hooks/api/chatRoomDraft/useDeleteChatRoomDrafts');

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
  (useDeleteChatRoomDrafts as jest.Mock).mockReturnValue({
    deleteChatRoomDrafts: jest.fn().mockResolvedValue({ data: {} }),
  });
});

describe('useNewChatRoom', () => {
  describe('chatRoom', () => {
    test('room_type:専門医指定方法のクエリが存在', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { room_type: 'BY_NAME' },
        isReady: true,
      });

      const { result } = await act(
        async () =>
          await renderHook(() => useNewChatRoom(), {
            wrapper: RecoilRoot,
          })
      );

      expect(result.current.chatRoom.room_type).toBe('BY_NAME');
    });

    test('target_account_id:医師を指定', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { target_account_id: 'accountid' },
        isReady: true,
      });

      const { result } = await act(
        async () =>
          await renderHook(() => useNewChatRoom(), {
            wrapper: RecoilRoot,
          })
      );

      expect(result.current.chatRoom.target_doctor).toBe('accountid');
      expect(result.current.chatRoom.room_type).toBe('BY_NAME');
    });

    test('target_group_id:グループを指定', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { target_group_id: 'group1' },
        isReady: true,
      });

      const { result } = await act(
        async () =>
          await renderHook(() => useNewChatRoom(), {
            wrapper: RecoilRoot,
          })
      );

      expect(result.current.chatRoom.group_id).toBe('group1');
      expect(result.current.chatRoom.room_type).toBe('GROUP');
    });
  });

  test('selectedMedicalSpecialities', async () => {
    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    await act(
      async () =>
        await result.current.setChatRoomFields({
          target_specialities: ['ALLERGY', 'BYOURI', 'GANKA'],
        })
    );

    expect(result.current.selectedMedicalSpecialities).toEqual(medicalSpecialitiesMock);
  });

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

      afterEach(() => {
        (global.confirm as jest.Mock).mockClear();
      });

      test('下書きがある場合', async () => {
        global.confirm = jest.fn().mockReturnValue(true);

        const { result } = await act(
          async () =>
            await renderHook(() => useNewChatRoom(), {
              wrapper: RecoilRoot,
            })
        );

        await waitFor(() => expect(result.current.chatRoom.disease_name).toBe('風邪'));
      });

      test('下書きがあるが復元しない場合', async () => {
        global.confirm = jest.fn().mockReturnValue(false);

        const deleteChatRoomDrafts = jest.fn();
        (useDeleteChatRoomDrafts as jest.Mock).mockReturnValue({
          deleteChatRoomDrafts,
        });

        const { result } = await act(
          async () =>
            await renderHook(() => useNewChatRoom(), {
              wrapper: RecoilRoot,
            })
        );

        await waitFor(() => {
          expect(deleteChatRoomDrafts).toBeCalled();
          // こちらだけだと関係なくても通ってしまうので必ず上と一緒にチェック
          expect(result.current.chatRoom.disease_name).not.toBe('風邪');
        });
      });
    });

    test('再コンサル', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { reconsult: 'chatroomid' },
        isReady: true,
      });

      const { result } = await act(
        async () =>
          await renderHook(() => useNewChatRoom(), {
            wrapper: RecoilRoot,
          })
      );

      await waitFor(() => {
        expect(result.current.ageRange).toBe('20');
        expect(result.current.chatRoom.disease_name).toBe('disease');
        expect(result.current.chatRoom.first_message).toBe('first message');
        expect(result.current.chatRoom.target_specialities).toEqual(['ALLERGY', 'BYOURI', 'GANKA']);
        expect(result.current.reConsultFileMessages).toEqual(baseChatRoomForReConsultData.file_messages);
      });
    });
  });

  test('setChatRoomFields', async () => {
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

    const data = { disease_name: 'disease2' };
    await act(async () => await result.current.setChatRoomFields(data));

    waitFor(() => {
      expect(result.current.chatRoom.disease_name).toBe('disease2');
      expect(postChatRoomDraft).toBeCalled();
    });
  });

  describe('setAgeRangeWrapper', () => {
    test('child', async () => {
      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await act(async () => await result.current.setAgeRangeWrapper('child'));

      waitFor(() => {
        expect(result.current.chatRoom.age).toBeUndefined();
        expect(result.current.ageRange).toBe('child');
        expect(result.current.childAge).toBe('');
      });
    });

    test('年代', async () => {
      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await act(async () => await result.current.setAgeRangeWrapper('20'));

      waitFor(() => {
        expect(result.current.chatRoom.age).toEqual(20);
        expect(result.current.ageRange).toBe('20');
      });
    });
  });

  test('setChildAgeWrapper', async () => {
    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    await act(async () => await result.current.setChildAgeWrapper('5'));

    waitFor(() => {
      expect(result.current.chatRoom.age).toEqual(5);
      expect(result.current.childAge).toBe('5');
    });
  });

  describe('selectConsultMessageTemplate', () => {
    afterEach(() => {
      (global.confirm as jest.Mock).mockClear();
    });

    test('入力欄が空の時', async () => {
      const confirmMock = jest.fn();
      global.confirm = confirmMock;

      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await act(async () => await result.current.selectConsultMessageTemplate('test'));

      waitFor(() => {
        expect(confirmMock).not.toBeCalled();
        expect(result.current.chatRoom.first_message).toBe('test');
      });
    });

    test('入力欄に値がありOKした時', async () => {
      const confirmMock = jest.fn();
      confirmMock.mockReturnValueOnce(true);
      global.confirm = confirmMock;

      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await act(async () => await result.current.setChatRoomFields({ first_message: 'first_message' }));
      await act(async () => await result.current.selectConsultMessageTemplate('test'));

      waitFor(() => {
        expect(confirmMock).toBeCalled();
        expect(result.current.chatRoom.first_message).toBe('test');
      });
    });

    test('入力欄に値がありOKしなかった時', async () => {
      const confirmMock = jest.fn();
      confirmMock.mockReturnValueOnce(false);
      global.confirm = confirmMock;

      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await act(async () => await result.current.setChatRoomFields({ first_message: 'first_message' }));
      await act(async () => await result.current.selectConsultMessageTemplate('test'));

      waitFor(() => {
        expect(confirmMock).toBeCalled();
        expect(result.current.chatRoom.first_message).toBe('first_message');
      });
    });
  });

  test('confirmInput', async () => {
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;

    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    act(() =>
      result.current.confirmInput({
        preventDefault: jest.fn(),
      } as unknown as FormEvent<HTMLFormElement>)
    );

    await waitFor(() => {
      expect(scrollToMock).toBeCalledWith(0, 0);
      expect(result.current.mode).toBe('confirm');
    });

    (global.scrollTo as jest.Mock).mockClear();
  });

  test('backToInput', async () => {
    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.backToInput());

    waitFor(() => {
      expect(result.current.mode).toBe('input');
    });
  });

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

      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

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

      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() => result.current.setFilesForReConsult([{ id: 1, file: new File([], ''), image: '' }]));
      await act(() => result.current.submit());

      expect(pushMock).toBeCalled();
      expect(createNewChatRoomMock).toBeCalled();
      expect(postChatMessageFileMock).toBeCalled();
    });
  });

  describe('onSelectImage', () => {
    test('画像の場合', async () => {
      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      const file = new File([], 'filename', { type: 'image/png' });

      await act(() =>
        result.current.onSelectImage({
          preventDefault: jest.fn(),
          target: {
            files: [file],
          },
        } as unknown as ChangeEvent<HTMLInputElement>)
      );

      waitFor(() => {
        expect(result.current.editingImage).toEqual(file);
      });
    });

    test('画像以外の場合', async () => {
      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      const file = new File([], 'filename', { type: 'text/plain' });

      const createDraftImageMock = jest.fn();
      const usePostDraftImageMock = jest.spyOn(usePostDraftImageModule, 'usePostDraftImage');
      usePostDraftImageMock.mockReturnValue({
        createDraftImage: jest.fn(),
      });

      const mutateMock = jest.fn();
      const useGetChatDraftImagesMock = jest.spyOn(useGetChatDraftImagesModule, 'useGetChatDraftImages');
      useGetChatDraftImagesMock.mockReturnValue({
        chatDraftImages: [],
        mutate: jest.fn(),
        isLoading: false,
        error: null,
      });

      await act(() =>
        result.current.onSelectImage({
          preventDefault: jest.fn(),
          target: {
            files: [file],
          },
        } as unknown as ChangeEvent<HTMLInputElement>)
      );

      waitFor(() => {
        expect(createDraftImageMock).toBeCalledWith(file);
        expect(mutateMock).toBeCalled();
        expect(result.current.isUseDraftImages).toBeTruthy();
      });
    });
  });

  describe('onImageEdited', () => {
    test('画像以外の場合', async () => {
      const { result } = await renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      const file = new File([], 'filename', { type: 'text/plain' });

      const createDraftImageMock = jest.fn();
      const usePostDraftImageMock = jest.spyOn(usePostDraftImageModule, 'usePostDraftImage');
      usePostDraftImageMock.mockReturnValue({
        createDraftImage: jest.fn(),
      });

      const mutateMock = jest.fn();
      const useGetChatDraftImagesMock = jest.spyOn(useGetChatDraftImagesModule, 'useGetChatDraftImages');
      useGetChatDraftImagesMock.mockReturnValue({
        chatDraftImages: [],
        mutate: jest.fn(),
        isLoading: false,
        error: null,
      });

      act(() => result.current.setEditingImage(file));
      await act(() => result.current.onImageEdited(file));

      waitFor(() => {
        expect(createDraftImageMock).toBeCalledWith(file);
        expect(mutateMock).toBeCalledWith(file);
        expect(result.current.isUseDraftImages).toBeTruthy();
        expect(result.current.editingImage).toBeUndefined();
      });
    });
  });

  test('deleteChatDraftImageById', async () => {
    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    deleteChatDraftImageMock.mockClear();

    const mutateMock = jest.fn();
    const useGetChatDraftImagesMock = jest.spyOn(useGetChatDraftImagesModule, 'useGetChatDraftImages');
    useGetChatDraftImagesMock.mockReturnValue({
      chatDraftImages: [],
      mutate: jest.fn(),
      isLoading: false,
      error: null,
    });

    await act(() => result.current.deleteChatDraftImageById('a'));

    waitFor(() => {
      expect(deleteChatDraftImageMock).toBeCalled();
      expect(mutateMock).toBeCalled();
    });
  });

  test('changeMedicalSpecialities', async () => {
    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.setIsMedicalSpecialitiesSelectDialogShown(true));

    await act(
      async () =>
        await result.current.changeMedicalSpecialities([
          { speciality_code: 'A' } as MedicalSpecialityEntity,
          { speciality_code: 'B' } as MedicalSpecialityEntity,
          { speciality_code: 'C' } as MedicalSpecialityEntity,
        ])
    );

    waitFor(() => {
      expect(result.current.chatRoom.target_specialities).toEqual(['A', 'B', 'C']);
      expect(result.current.isMedicalSpecialitiesSelectDialogShown).toBeFalsy();
    });
  });

  test('moveSelectedMedicalSpeciality', async () => {
    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    await act(async () => await result.current.setChatRoomFields({ target_specialities: ['A', 'B', 'C'] }));

    await act(() => result.current.moveSelectedMedicalSpeciality(1, 2));

    waitFor(() => {
      expect(result.current.chatRoom.target_specialities).toEqual(['A', 'C', 'B']);
    });
  });

  test('deleteReConsultFileMessage', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: { reconsult: 'chatroomid' },
      isReady: true,
    });

    const { result } = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.deleteReConsultFileMessage(1));

    waitFor(() => {
      expect(result.current.reConsultFileMessages).toEqual([baseChatRoomForReConsultData.file_messages[1]]);
    });
  });

  test('deleteFileForReConsult', async () => {
    const hooks = await renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    await act(() =>
      hooks.result.current.setFilesForReConsult([
        { id: 1, file: new File([], ''), image: '' },
        { id: 2, file: new File([], ''), image: '' },
        { id: 3, file: new File([], ''), image: '' },
      ])
    );
    act(() => hooks.result.current.deleteFileForReConsult(1));

    waitFor(() => {
      expect(hooks.result.current.filesForReConsult).toEqual([
        { id: 2, file: new File([], ''), image: '' },
        { id: 3, file: new File([], ''), image: '' },
      ]);
    });
  });
});
