import { consultMessageTemplates } from '@/data/chatRoom';
import { onboardingAnsweredState } from '@/globalStates/onboarding';
import { mutateFetchFlag, useFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { useDeleteChatDraftImage } from '@/hooks/api/chat/useDeleteChatDraftImage';
import { useFetchBaseChatRoomForReConsult } from '@/hooks/api/chat/useFetchBaseChatRoomForReConsult';
import { useGetChatDraftImages } from '@/hooks/api/chat/useGetChatDraftImages';
import { usePostChatMessageFile } from '@/hooks/api/chat/usePostChatMessageFile';
import { PostChatRoomRequestData, usePostChatRoom } from '@/hooks/api/chat/usePostChatRoom';
import { usePostDraftImage } from '@/hooks/api/chat/usePostDraftImage';
import {
  GetCurrentChatRoomDraftResponeData,
  useGetCurrentChatRoomDraft,
} from '@/hooks/api/chatRoomDraft/useGetCurrentChatRoomDraft';
import { usePostChatRoomDraft } from '@/hooks/api/chatRoomDraft/usePostChatRoomDraft';
import { useUpdateChatRoomDraft } from '@/hooks/api/chatRoomDraft/useUpdateChatRoomDraft';
import { useFetchDoctorProfile } from '@/hooks/api/doctor/useFetchDoctorProfile';
import { FetchedGroupEntity, useFetchGroup } from '@/hooks/api/group/useFetchGroup';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { loadLocalStorage, removeLocalStorage } from '@/libs/LocalStorageManager';
import { moveItem } from '@/libs/dnd';
import { ChatDraftImageEntity } from '@/types/entities/chat/ChatDraftImageEntity';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';
import { ChatRoomType } from '@/types/entities/chat/ChatRoomEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useAtomValue } from 'jotai';
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

// 値の更新時にすぐには下書き更新しないフィールドの一覧（テキスト入力などはblurにしたいため）
const notSaveToDraftImmediatelyFields = ['disease_name', 'first_message'];

type AgeRange = string | 'child';
type Mode = 'input' | 'confirm';
type InitializingStatus = 'not_initialized' | 'initializing' | 'initialized';

type FileForReConsult = {
  id: number;
  file: File;
  image: string | ArrayBuffer;
};

type NewChatRoomQuery = {
  target_account_id?: string;
  target_group_id?: string;
  target_speciality?: string;
  reconsult?: string;
  room_type?: ChatRoomType;
  from?: string | 'e-detail';
  utm_source?: string;
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
  applyDraft: () => void;
  backToInput: () => void;
  childAge: string;
  changeMedicalSpecialities: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  chatDraftImages?: ChatDraftImageEntity[];
  closeEDtailModal: () => void;
  confirmInput: (e: FormEvent<HTMLFormElement>) => void;
  deleteChatDraftImageById: (chatDraftImageId: string) => Promise<void>;
  deleteFileForReConsult: (id: number) => void;
  deleteReConsultFileMessage: (chatMessageId: number) => void;
  doctor?: DoctorEntity;
  draftSavingTimeoutId?: NodeJS.Timeout;
  editingImage?: File;
  errorMessage: string;
  chatRoom: NewChatRoomEntity;
  dontUseDraft: () => void;
  filesForReConsult: FileForReConsult[];
  group?: FetchedGroupEntity;
  imageInput: RefObject<HTMLInputElement>;
  isDoctorSearchModalShown: boolean;
  isDraftConfirming: boolean;
  isEDetailModalShown: boolean;
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
  updateDraft: () => void;
};

export const useNewChatRoom = (): UseNewChatRoom => {
  const router = useRouter();
  const query = router.query as NewChatRoomQuery;

  const [mode, setMode] = useState<Mode>('input');
  const [chatRoomDraftId, setChatRoomDraftId] = useState('');
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
    from: query.from || '',
    utm_source: query.utm_source || '',
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
  const [initializingStatus, setInitializingStatus] = useState<InitializingStatus>('not_initialized');
  const [draftFrom, setDraftFrom] = useState('');
  const [draftUtmSource, setDraftUtmSource] = useState('');
  const [draftSavingTimeoutId, setDraftSavingTimeoutId] = useState<NodeJS.Timeout | undefined>();
  const [isDraftConfirming, setIsDraftConfirming] = useState(false);
  const [confirmingDraft, setConfirmingDraft] = useState<NewChatRoomEntity>();
  const [draftOnDb, setDraftOnDb] = useState<GetCurrentChatRoomDraftResponeData>();
  const [isEDetailModalClosed, setIsEDetailModalClosed] = useState(false);

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
  const { getCurrentChatRoomDraft } = useGetCurrentChatRoomDraft();
  const { postChatRoomDraft } = usePostChatRoomDraft();
  const { updateChatRoomDraft } = useUpdateChatRoomDraft();
  const { flag: hasConsulted, isLoading: isLoadingFetchFlag } = useFetchFlag('HasConsulted');
  const onboardingAnswered = useAtomValue(onboardingAnsweredState);

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
    if (!router.isReady || !medicalSpecialities || initializingStatus !== 'not_initialized') {
      return;
    }

    setInitializingStatus('initializing');
    if (onboardingAnswered) {
      setChatRoom((chatRoom) => ({
        ...chatRoom,
        disease_name: onboardingAnswered.title,
        age: onboardingAnswered.age ?? undefined,
        target_specialities: onboardingAnswered.targetSpecialities,
        gender: onboardingAnswered.gender,
      }));
      initializeAge(onboardingAnswered.age);
    }
    if (query.target_speciality) {
      const targetSpeciality = medicalSpecialities.find(
        (speciality) => speciality.speciality_code === query.target_speciality
      );
      if (targetSpeciality) {
        setChatRoom((chatRoom) => ({
          ...chatRoom,
          target_specialities: [targetSpeciality.speciality_code],
        }));
      }
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
        gender: baseChatRoomData.chat_room.gender,
        first_message: baseChatRoomData.first_message,
        target_specialities: baseChatRoomData.medical_specialities.map(
          (medicalSpeciality) => medicalSpeciality.speciality_code
        ),
      }));
      setReConsultFileMessages(baseChatRoomData.file_messages);
      initializeAge(baseChatRoomData.chat_room.age);
      setInitializingStatus('initialized');
      return;
    }

    // @todo localStorageの方は古い仕様のためそのうち消す
    const draftOnLocalStorage = loadLocalStorage(newChatRoomFormDataKey);
    const draft = await getCurrentChatRoomDraft().catch((error) => {
      console.error(error);
      return null;
    });
    if (!draft && !draftOnLocalStorage) {
      return;
    }

    setDraftOnDb(draft?.data);
    setConfirmingDraft((draft?.data.data ?? JSON.parse(draftOnLocalStorage!)) as NewChatRoomEntity);
    setIsDraftConfirming(true);
  }, [
    fetchBaseChatRoomForReConsult,
    getCurrentChatRoomDraft,
    initializeAge,
    initializingStatus,
    medicalSpecialities,
    onboardingAnswered,
    query.reconsult,
    query.target_speciality,
    router.isReady,
  ]);

  const dontUseDraft = useCallback(async () => {
    setIsDraftConfirming(false);
    setConfirmingDraft(undefined);
    setInitializingStatus('initialized');
  }, []);

  const applyDraft = useCallback(async () => {
    if (!confirmingDraft) {
      return;
    }
    if (draftOnDb) {
      setChatRoomDraftId(draftOnDb.chat_room_draft_id);
    }
    setChatRoom(confirmingDraft);
    initializeAge(confirmingDraft.age);
    setDraftFrom(confirmingDraft.from);
    setDraftUtmSource(confirmingDraft.utm_source);
    setIsUseDraftImages(true);
    setIsDraftConfirming(false);
    setConfirmingDraft(undefined);
    setInitializingStatus('initialized');
  }, [confirmingDraft, draftOnDb, initializeAge]);

  useEffect(() => {
    if (!router.isReady || initializingStatus !== 'not_initialized') {
      return;
    }
    initialize();
  }, [initialize, initializingStatus, router.isReady]);

  const sendDraft = useCallback(
    async (data: object) => {
      if (query.reconsult) {
        return;
      }

      if (draftSavingTimeoutId) {
        clearTimeout(draftSavingTimeoutId);
        setDraftSavingTimeoutId(undefined);
      }

      if (chatRoomDraftId) {
        await updateChatRoomDraft(chatRoomDraftId, data).catch((error) => {
          console.error(error);
        });
        return;
      }

      const response = await postChatRoomDraft(data).catch((error) => {
        console.error(error);
        return null;
      });
      if (!response) {
        return;
      }

      setChatRoomDraftId(response.data.chat_room_draft_id);
    },
    [chatRoomDraftId, draftSavingTimeoutId, postChatRoomDraft, query.reconsult, updateChatRoomDraft]
  );

  const updateDraft = useCallback(() => {
    if (query.reconsult) {
      return;
    }
    sendDraft(chatRoom);
  }, [chatRoom, query.reconsult, sendDraft]);

  const setChatRoomFields = useCallback(
    async (data: Partial<NewChatRoomEntity>) => {
      const newData = { ...formData, ...data };

      setChatRoom(newData);

      if (query.reconsult) {
        return;
      }

      // 下書き保存しない関数を作っても良いけど、多分いずれ使い分けミスると思うのでここで判別
      for (const key of Object.keys(data)) {
        if (!notSaveToDraftImmediatelyFields.includes(key)) {
          await sendDraft(newData);
          return;
        }
      }

      // テキスト入力の場合はすぐに保存しない
      if (draftSavingTimeoutId) {
        clearTimeout(draftSavingTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        sendDraft(newData);
        setDraftSavingTimeoutId(undefined);
      }, 3000);
      setDraftSavingTimeoutId(timeoutId);
    },
    [draftSavingTimeoutId, formData, query.reconsult, sendDraft]
  );

  const setAgeRangeWrapper = useCallback(
    async (age: AgeRange) => {
      setAgeRange(age);

      if (age === 'child') {
        setChildAge('');
        await setChatRoomFields({ age: undefined });
      } else {
        await setChatRoomFields({ age: Number(age) });
      }
    },
    [setChatRoomFields]
  );

  const setChildAgeWrapper = useCallback(
    async (age: string) => {
      setChildAge(age);
      await setChatRoomFields({ age: Number(age) });
    },
    [setChatRoomFields]
  );

  const selectConsultMessageTemplate = useCallback(
    async (firstMessage: string) => {
      if (
        chatRoom.first_message.trim() !== '' &&
        !confirm('コンサル文にテンプレートを反映します。現在書かれている内容は消えてしまいますがよろしいですか？')
      ) {
        return;
      }

      const newData = { first_message: firstMessage };
      await Promise.all([setChatRoomFields(newData), sendDraft(newData)]);
    },
    [chatRoom.first_message, sendDraft, setChatRoomFields]
  );

  const setModeAndScrollToTop = useCallback((mode: Mode) => {
    setMode(mode);
    window.scrollTo(0, 0);
  }, []);

  const validate = useCallback(() => {
    const errors: string[] = [];

    if (
      consultMessageTemplates.some((consultMessageTemplate) => consultMessageTemplate.text === formData.first_message)
    ) {
      errors.push(
        'コンサル文がテンプレートのままになっているため、コンサルを作成できません。コンサル文を編集してからプレビューボタンを選択して下さい。'
      );
    }

    const error = errors.join('\n');
    setErrorMessage(error);
    return error === '';
  }, [formData]);

  const confirmInput = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      setModeAndScrollToTop('confirm');
    },
    [setModeAndScrollToTop, validate]
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

    const createSource = Object.assign({}, data.create_source);
    if (draftFrom) {
      createSource.from = draftFrom;
    } else if (query.from) {
      createSource.from = query.from;
    }
    if (draftUtmSource) {
      createSource.utm_source = draftUtmSource;
    } else if (query.utm_source) {
      createSource.utm_source = query.utm_source;
    }
    data.create_source = createSource;

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

    mutateFetchFlag('FirstConsultCampaign');
    setIsSending(false);
    removeLocalStorage(newChatRoomFormDataKey);
    router.push(`/chat?chat_room_id=${response.data.chat_room_id}`);
  }, [
    chatDraftImages,
    createNewChatRoom,
    draftFrom,
    draftUtmSource,
    filesForReConsult,
    formData,
    postChatMessageFile,
    query.from,
    query.reconsult,
    query.utm_source,
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
    async (medicalSpecialities: MedicalSpecialityEntity[]) => {
      await setChatRoomFields({
        target_specialities: medicalSpecialities.map((medicalSpeciality) => medicalSpeciality.speciality_code),
      });
      setIsMedicalSpecialitiesSelectDialogShown(false);
    },
    [setChatRoomFields]
  );

  const moveSelectedMedicalSpeciality = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      await setChatRoomFields({
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
    applyDraft,
    backToInput,
    childAge,
    changeMedicalSpecialities,
    chatDraftImages,
    closeEDtailModal: () => setIsEDetailModalClosed(true),
    confirmInput,
    deleteChatDraftImageById,
    deleteFileForReConsult,
    deleteReConsultFileMessage,
    doctor,
    dontUseDraft,
    draftSavingTimeoutId,
    editingImage,
    errorMessage,
    chatRoom,
    filesForReConsult,
    group,
    imageInput,
    isDoctorSearchModalShown,
    isDraftConfirming,
    isEDetailModalShown:
      query.from === 'e-detail' && !isLoadingFetchFlag && hasConsulted === false && !isEDetailModalClosed,
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
    updateDraft,
  };
};
