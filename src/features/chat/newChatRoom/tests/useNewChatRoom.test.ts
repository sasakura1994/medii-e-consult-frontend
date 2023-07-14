import {
  useFetchBaseChatRoomForReConsult,
  FetchBaseChatRoomForReConsultResponseData,
} from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import {
  loadLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
} from '@/libs/LocalStorageManager';
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
import { ChangeEvent, FormEvent } from 'react';
import { usePostChatRoom } from '@/hooks/api/chat/usePostChatRoom';
import * as usePostChatMessageFileModule from '@/hooks/api/chat/usePostChatMessageFile';
import * as usePostDraftImageModule from '@/hooks/api/chat/usePostDraftImage';
import * as useGetChatDraftImagesModule from '@/hooks/api/chat/useGetChatDraftImages';
import * as useDeleteChatDraftImageModule from '@/hooks/api/chat/useDeleteChatDraftImage';

jest.mock('next/router');
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');
jest.mock('@/hooks/api/chat/useFetchBaseChatRoomForReConsult');
jest.mock('@/hooks/api/chat/usePostChatRoom');
jest.mock('@/hooks/api/chat/usePostChatMessageFile');
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

const usePostChatRoomMock = jest.mocked(usePostChatRoom);
usePostChatRoomMock.mockReturnValue({
  createNewChatRoom: jest.fn(),
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

const deleteChatDraftImageMock = jest.fn();
deleteChatDraftImageMock.mockResolvedValue(true);
const useDeleteChatDraftImageMock = jest.spyOn(
  useDeleteChatDraftImageModule,
  'useDeleteChatDraftImage'
);
useDeleteChatDraftImageMock.mockReturnValue({
  deleteChatDraftImage: deleteChatDraftImageMock,
});

beforeEach(() => {
  const usePostChatMessageFileMock = jest.spyOn(
    usePostChatMessageFileModule,
    'usePostChatMessageFile'
  );
  usePostChatMessageFileMock.mockReturnValue({
    postChatMessageFile: jest.fn(),
  });

  const usePostDraftImageMock = jest.spyOn(
    usePostDraftImageModule,
    'usePostDraftImage'
  );
  usePostDraftImageMock.mockReturnValue({
    createDraftImage: jest.fn(),
  });

  const useGetChatDraftImagesMock = jest.spyOn(
    useGetChatDraftImagesModule,
    'useGetChatDraftImages'
  );
  useGetChatDraftImagesMock.mockReturnValue({
    chatDraftImages: [],
    mutate: jest.fn(),
    isLoading: false,
    error: null,
  });
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

  describe('selectConsultMessageTemplate', () => {
    afterEach(() => {
      (global.confirm as jest.Mock).mockClear();
    });

    test('入力欄が空の時', () => {
      const confirmMock = jest.fn();
      global.confirm = confirmMock;

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() => result.current.selectConsultMessageTemplate('test'));

      waitFor(() => {
        expect(confirmMock).not.toBeCalled();
        expect(result.current.chatRoom.first_message).toBe('test');
      });
    });

    test('入力欄に値がありOKした時', () => {
      const confirmMock = jest.fn();
      confirmMock.mockReturnValueOnce(true);
      global.confirm = confirmMock;

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() =>
        result.current.setChatRoomFields({ first_message: 'first_message' })
      );
      act(() => result.current.selectConsultMessageTemplate('test'));

      waitFor(() => {
        expect(confirmMock).toBeCalled();
        expect(result.current.chatRoom.first_message).toBe('test');
      });
    });

    test('入力欄に値がありOKしなかった時', () => {
      const confirmMock = jest.fn();
      confirmMock.mockReturnValueOnce(false);
      global.confirm = confirmMock;

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() =>
        result.current.setChatRoomFields({ first_message: 'first_message' })
      );
      act(() => result.current.selectConsultMessageTemplate('test'));

      waitFor(() => {
        expect(confirmMock).toBeCalled();
        expect(result.current.chatRoom.first_message).toBe('first_message');
      });
    });
  });

  test('confirmInput', async () => {
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;

    const { result } = renderHook(() => useNewChatRoom(), {
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

  test('backToInput', () => {
    const { result } = renderHook(() => useNewChatRoom(), {
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

      const removeLocalStorageMock = jest.mocked(removeLocalStorage);

      const pushMock = jest.fn();
      const useRouterMock = jest.mocked(useRouter);
      useRouterMock.mockReturnValue({
        query: {},
        push: pushMock,
      } as unknown as ReturnType<typeof useRouter>);

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      await act(() => result.current.submit());

      expect(removeLocalStorageMock).toBeCalled();
      expect(pushMock).toBeCalled();
      expect(createNewChatRoomMock).toBeCalled();
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

      const removeLocalStorageMock = jest.mocked(removeLocalStorage);

      const pushMock = jest.fn();
      const useRouterMock = jest.mocked(useRouter);
      useRouterMock.mockReturnValue({
        query: { reconsult: 'basechatroomid' },
        push: pushMock,
      } as unknown as ReturnType<typeof useRouter>);

      const postChatMessageFileMock = jest.fn();
      postChatMessageFileMock.mockResolvedValue(true);
      const usePostChatMessageFileMock = jest.spyOn(
        usePostChatMessageFileModule,
        'usePostChatMessageFile'
      );
      usePostChatMessageFileMock.mockReturnValue({
        postChatMessageFile: postChatMessageFileMock,
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      act(() =>
        result.current.setFilesForReConsult([
          { id: 1, file: new File([], ''), image: '' },
        ])
      );
      await act(() => result.current.submit());

      expect(removeLocalStorageMock).toBeCalled();
      expect(pushMock).toBeCalled();
      expect(createNewChatRoomMock).toBeCalled();
      expect(postChatMessageFileMock).toBeCalled();
    });
  });

  describe('onSelectImage', () => {
    test('画像の場合', async () => {
      const { result } = renderHook(() => useNewChatRoom(), {
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
      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      const file = new File([], 'filename', { type: 'text/plain' });

      const createDraftImageMock = jest.fn();
      const usePostDraftImageMock = jest.spyOn(
        usePostDraftImageModule,
        'usePostDraftImage'
      );
      usePostDraftImageMock.mockReturnValue({
        createDraftImage: jest.fn(),
      });

      const mutateMock = jest.fn();
      const useGetChatDraftImagesMock = jest.spyOn(
        useGetChatDraftImagesModule,
        'useGetChatDraftImages'
      );
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
      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      const file = new File([], 'filename', { type: 'text/plain' });

      const createDraftImageMock = jest.fn();
      const usePostDraftImageMock = jest.spyOn(
        usePostDraftImageModule,
        'usePostDraftImage'
      );
      usePostDraftImageMock.mockReturnValue({
        createDraftImage: jest.fn(),
      });

      const mutateMock = jest.fn();
      const useGetChatDraftImagesMock = jest.spyOn(
        useGetChatDraftImagesModule,
        'useGetChatDraftImages'
      );
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
    const { result } = renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });

    deleteChatDraftImageMock.mockClear();

    const mutateMock = jest.fn();
    const useGetChatDraftImagesMock = jest.spyOn(
      useGetChatDraftImagesModule,
      'useGetChatDraftImages'
    );
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
});
