import { useDeleteChatDraftImage } from '@/hooks/api/chat/useDeleteChatDraftImage';
import { useFetchBaseChatRoomForReConsult } from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import { useGetChatDraftImages } from '@/hooks/api/chat/useGetChatDraftImages';
import { usePostChatMessageFile } from '@/hooks/api/chat/usePostChatMessageFile';
import { PostChatRoomRequestData, usePostChatRoom } from '@/hooks/api/chat/usePostChatRoom';
import { usePostDraftImage } from '@/hooks/api/chat/usePostDraftImage';
import { useFetchDoctorProfile } from '@/hooks/api/doctor/useFetchDoctorProfile';
import { FetchedGroupEntity, useFetchGroup } from '@/hooks/api/group/useFetchGroup';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { loadLocalStorage, removeLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';
import { moveItem } from '@/libs/dnd';
import { ChatDraftImageEntity } from '@/types/entities/chat/ChatDraftImageEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';
import { ChatRoomType } from '@/types/entities/chat/ChatRoomEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';

export const newChatRoomFormDataKey = 'NewChatRoom::chatRoom';

type AgeRange = string | 'child';
type Mode = 'input' | 'confirm';

type FileForReConsult = {
  id: number;
  file: File;
  image: string | ArrayBuffer;
};

type NewChatRoomQuery = {
  target_account_id?: string;
  target_group_id?: string;
  reconsult?: string;
  room_type?: ChatRoomType;
};

const getDefaultRoomType = (query: NewChatRoomQuery): ChatRoomType => {
  if (query.room_type) {
    return query.room_type;
  }

  if (query.target_account_id) {
    return 'BY_NAME';
  }

  if (query.target_group_id) {
    return 'GROUP';
  }

  return 'FREE';
};

export type UseNewChatRoom = {
  ageRange: string;
  backToInput: () => void;
  childAge: string;
  changeMedicalSpecialities: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  chatDraftImages?: ChatDraftImageEntity[];
  confirmInput: (e: FormEvent<HTMLFormElement>) => void;
  deleteChatDraftImageById: (chatDraftImageId: string) => Promise<void>;
  deleteFileForReConsult: (id: number) => void;
  deleteReConsultFileMessage: (chatMessageId: number) => void;
  doctor?: DoctorEntity;
  editingImage?: File;
  errorMessage: string;
  chatRoom: NewChatRoomEntity;
  filesForReConsult: FileForReConsult[];
  group?: FetchedGroupEntity;
  imageInput: RefObject<HTMLInputElement>;
  isDoctorSearchModalShown: boolean;
  isMedicalSpecialitiesSelectDialogShown: boolean;
  isSearchGroupModalShown: boolean;
  isSending: boolean;
  isUseDraftImages: boolean;
  medicalSpecialities?: MedicalSpecialityEntity[];
  medicalSpecialityCategories?: MedicalSpecialityCategoryEntity[];
  mode: Mode;
  moveSelectedMedicalSpeciality: (dragIndex: number, hoverIndex: number) => void;
  onImageEdited: (file: File) => void;
  onSelectImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  query: NewChatRoomQuery;
  reConsultFileMessages: ChatMessageEntity[];
  resetImageInput: () => void;
  selectConsultMessageTemplate: (firstMessage: string) => void;
  selectedMedicalSpecialities: MedicalSpecialityEntity[];
  setAgeRangeWrapper: (age: AgeRange) => void;
  setChildAgeWrapper: (age: string) => void;
  setEditingImage: Dispatch<SetStateAction<File | undefined>>;
  setChatRoomFields: (data: Partial<NewChatRoomEntity>) => void;
  setFilesForReConsult: Dispatch<SetStateAction<FileForReConsult[]>>;
  setIsDoctorSearchModalShown: Dispatch<SetStateAction<boolean>>;
  setIsMedicalSpecialitiesSelectDialogShown: Dispatch<SetStateAction<boolean>>;
  setIsSearchGroupModalShown: Dispatch<SetStateAction<boolean>>;
  submit: () => Promise<void>;
};

export const useNewChatRoom = (): UseNewChatRoom => {
  const router = useRouter();
  const query = router.query as NewChatRoomQuery;

  const [mode, setMode] = useState<Mode>('input');
  const [chatRoom, setChatRoom] = useState<NewChatRoomEntity>({
    chat_room_id: '',
    room_type: getDefaultRoomType(query),
    target_doctor: query.target_account_id,
    group_id: query.target_group_id,
    gender: 'man',
    disease_name: '',
    first_message: '',
    publishment_accepted: true,
    target_specialities: [],
  });
  const [ageRange, setAgeRange] = useState<AgeRange>('');
  const [childAge, setChildAge] = useState<string>('');
  const [editingImage, setEditingImage] = useState<File>();
  const [reConsultFileMessages, setReConsultFileMessages] = useState<ChatMessageEntity[]>([]);
  const [filesForReConsult, setFilesForReConsult] = useState<FileForReConsult[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMedicalSpecialitiesSelectDialogShown, setIsMedicalSpecialitiesSelectDialogShown] = useState(false);
  const [isDoctorSearchModalShown, setIsDoctorSearchModalShown] = useState(false);
  const [isSearchGroupModalShown, setIsSearchGroupModalShown] = useState(false);
  const [isUseDraftImages, setIsUseDraftImages] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { createNewChatRoom } = usePostChatRoom();
  const { createDraftImage } = usePostDraftImage();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { chatDraftImages, mutate: mutateGetChatDraftImages } = useGetChatDraftImages({ isNeed: isUseDraftImages });
  const { deleteChatDraftImage } = useDeleteChatDraftImage();
  const { group } = useFetchGroup(chatRoom.group_id);
  const { doctor } = useFetchDoctorProfile(chatRoom.target_doctor);
  const { fetchBaseChatRoomForReConsult } = useFetchBaseChatRoomForReConsult();
  const { postChatMessageFile } = usePostChatMessageFile();

  const imageInput = useRef<HTMLInputElement>(null);

  const selectedMedicalSpecialities = useMemo((): MedicalSpecialityEntity[] => {
    if (!medicalSpecialities) {
      return [];
    }

    const results: MedicalSpecialityEntity[] = [];
    for (const specialityCode of chatRoom.target_specialities) {
      const medicalSpeciality = medicalSpecialities.find(
        (medicalSpeciality) => medicalSpeciality.speciality_code === specialityCode
      );
      if (medicalSpeciality) {
        results.push(medicalSpeciality);
      }
    }
    return results;
  }, [chatRoom.target_specialities, medicalSpecialities]);

  const formData = useMemo(
    (): NewChatRoomEntity => ({
      ...chatRoom,
      age: Number(ageRange === 'child' ? childAge : ageRange),
    }),
    [ageRange, chatRoom, childAge]
  );

  const initializeAge = useCallback((age?: number | null) => {
    if (!age) {
      return;
    }

    if (age < 10) {
      setChildAge(age.toString());
      setAgeRange('child');
    } else {
      setAgeRange(age.toString());
    }
  }, []);

  const initialize = useCallback(async () => {
    if (!medicalSpecialities) {
      return;
    }

    if (query.reconsult) {
      const baseChatRoomData = await fetchBaseChatRoomForReConsult(query.reconsult);
      if (!baseChatRoomData) {
        return;
      }

      setChatRoom((chatRoom) => ({
        ...chatRoom,
        age: baseChatRoomData.chat_room.age ?? undefined,
        disease_name: baseChatRoomData.chat_room.disease_name,
        first_message: baseChatRoomData.first_message,
        target_specialities: baseChatRoomData.medical_specialities.map(
          (medicalSpeciality) => medicalSpeciality.speciality_code
        ),
      }));
      setReConsultFileMessages(baseChatRoomData.file_messages);
      initializeAge(baseChatRoomData.chat_room.age);
      setIsInitialized(true);
      return;
    }

    const draft = loadLocalStorage(newChatRoomFormDataKey);
    if (!draft) {
      return;
    }
    if (!confirm('下書きに作成途中のコンサルがあります。作成途中のコンサルを続けて編集しますか？')) {
      setIsInitialized(true);
      return;
    }

    const data = JSON.parse(draft) as NewChatRoomEntity;

    setChatRoom(data);
    initializeAge(data.age);
    setIsUseDraftImages(true);
    setIsInitialized(true);
  }, [fetchBaseChatRoomForReConsult, initializeAge, medicalSpecialities, query.reconsult]);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    initialize();
  }, [initialize, isInitialized]);

  const setChatRoomFields = useCallback(
    (data: Partial<NewChatRoomEntity>) => {
      const newData = { ...formData, ...data };
      saveLocalStorage(newChatRoomFormDataKey, JSON.stringify(newData));
      setChatRoom(newData);
    },
    [formData]
  );

  const setAgeRangeWrapper = useCallback(
    (age: AgeRange) => {
      setAgeRange(age);

      if (age === 'child') {
        setChildAge('');
        setChatRoomFields({ age: undefined });
      } else {
        setChatRoomFields({ age: Number(age) });
      }
    },
    [setChatRoomFields]
  );

  const setChildAgeWrapper = useCallback(
    (age: string) => {
      setChildAge(age);
      setChatRoomFields({ age: Number(age) });
    },
    [setChatRoomFields]
  );

  const selectConsultMessageTemplate = useCallback(
    (firstMessage: string) => {
      if (
        chatRoom.first_message.trim() !== '' &&
        !confirm('コンサル文にテンプレートを反映します。現在書かれている内容は消えてしまいますがよろしいですか？')
      ) {
        return;
      }

      setChatRoomFields({ first_message: firstMessage });
    },
    [chatRoom.first_message, setChatRoomFields]
  );

  const setModeAndScrollToTop = useCallback((mode: Mode) => {
    setMode(mode);
    window.scrollTo(0, 0);
  }, []);

  const confirmInput = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setModeAndScrollToTop('confirm');
    },
    [setModeAndScrollToTop]
  );

  const backToInput = useCallback(() => {
    setModeAndScrollToTop('input');
  }, [setModeAndScrollToTop]);

  const submit = useCallback(async () => {
    setIsSending(true);
    setErrorMessage('');

    const chatRoomId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    const data: PostChatRoomRequestData = {
      ...formData,
      chat_room_id: chatRoomId,
      chat_draft_image_ids: chatDraftImages?.map((chatDraftImage) => chatDraftImage.chat_draft_image_id) ?? [],
    };

    if (query.reconsult) {
      data.re_consult_chat_room_id = query.reconsult;
      data.re_consult_file_chat_message_ids = reConsultFileMessages.map((chatMessage) => chatMessage.uid);
    }

    const response = await createNewChatRoom(data).catch((error) => {
      console.error(error);

      setErrorMessage(error.response?.data?.message || 'エラーが発生しました');
      return null;
    });

    if (!response) {
      setIsSending(false);
      setModeAndScrollToTop('input');
      return;
    }

    if (!response.data.chat_room_id) {
      setIsSending(false);
      setErrorMessage(response.data.message);
      setModeAndScrollToTop('input');
      return;
    }

    if (query.reconsult) {
      const errorMessages: string[] = [];
      for (const file of filesForReConsult) {
        await postChatMessageFile(chatRoomId, file.file).catch((error) => {
          console.error(error);
          errorMessages.push(`${file.file.name}:` + (error.response?.data?.message || 'エラーが発生しました。'));
          return null;
        });
      }

      if (errorMessages.length > 0) {
        alert(errorMessages.join('\n'));
      }
    }

    setIsSending(false);
    removeLocalStorage(newChatRoomFormDataKey);
    router.push(`/chat?chat_room_id=${response.data.chat_room_id}`);
  }, [
    chatDraftImages,
    createNewChatRoom,
    filesForReConsult,
    formData,
    postChatMessageFile,
    query.reconsult,
    reConsultFileMessages,
    router,
    setModeAndScrollToTop,
  ]);

  const resetImageInput = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [imageInput]);

  const addFile = useCallback(
    async (file: File) => {
      if (query.reconsult) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const image = fileReader.result;
          if (image) {
            setFilesForReConsult((filesForReConsult) => [
              ...filesForReConsult,
              { id: new Date().getTime(), file, image },
            ]);
          }
        };
        fileReader.readAsDataURL(file);
        return;
      }

      await createDraftImage(file);
      setIsUseDraftImages(true);
      mutateGetChatDraftImages();
    },
    [createDraftImage, mutateGetChatDraftImages, query.reconsult]
  );

  const onSelectImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const files = e.target.files;

      if (files[0].type.match(/^image\//)) {
        setEditingImage(files[0]);
        return;
      }

      await addFile(files[0]);
    },
    [addFile]
  );

  const onImageEdited = useCallback(
    (file: File) => {
      setEditingImage(undefined);
      addFile(file);
    },
    [addFile]
  );

  const deleteChatDraftImageById = useCallback(
    async (chatDraftImageId: string) => {
      const response = await deleteChatDraftImage(chatDraftImageId).catch((error) => {
        console.error(error);
        return null;
      });
      if (!response) {
        alert('エラーが発生しました。');
        return;
      }
      mutateGetChatDraftImages();
    },
    [deleteChatDraftImage, mutateGetChatDraftImages]
  );

  const changeMedicalSpecialities = useCallback(
    (medicalSpecialities: MedicalSpecialityEntity[]) => {
      setChatRoomFields({
        target_specialities: medicalSpecialities.map((medicalSpeciality) => medicalSpeciality.speciality_code),
      });
      setIsMedicalSpecialitiesSelectDialogShown(false);
    },
    [setChatRoomFields]
  );

  const moveSelectedMedicalSpeciality = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setChatRoomFields({
        target_specialities: moveItem(chatRoom.target_specialities, dragIndex, hoverIndex),
      });
    },
    [chatRoom.target_specialities, setChatRoomFields]
  );

  const deleteReConsultFileMessage = useCallback((chatMessageId: number) => {
    setReConsultFileMessages((reConsultFileMessages) =>
      reConsultFileMessages.filter((chatMessage) => chatMessage.uid !== chatMessageId)
    );
  }, []);

  const deleteFileForReConsult = useCallback((id: number) => {
    setFilesForReConsult((filesForReConsult) => filesForReConsult.filter((file) => file.id !== id));
  }, []);

  return {
    ageRange,
    backToInput,
    childAge,
    changeMedicalSpecialities,
    chatDraftImages,
    confirmInput,
    deleteChatDraftImageById,
    deleteFileForReConsult,
    deleteReConsultFileMessage,
    doctor,
    editingImage,
    errorMessage,
    chatRoom,
    filesForReConsult,
    group,
    imageInput,
    isDoctorSearchModalShown,
    isMedicalSpecialitiesSelectDialogShown,
    isSearchGroupModalShown,
    isSending,
    isUseDraftImages,
    medicalSpecialities,
    medicalSpecialityCategories,
    mode,
    moveSelectedMedicalSpeciality,
    onImageEdited,
    onSelectImage,
    query,
    reConsultFileMessages,
    resetImageInput,
    selectConsultMessageTemplate,
    selectedMedicalSpecialities,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setEditingImage,
    setChatRoomFields,
    setFilesForReConsult,
    setIsDoctorSearchModalShown,
    setIsMedicalSpecialitiesSelectDialogShown,
    setIsSearchGroupModalShown,
    submit,
  };
};
