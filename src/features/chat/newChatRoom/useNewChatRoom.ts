import { useDeleteChatDraftImage } from '@/hooks/api/chat/useDeleteChatDraftImage';
import { useGetChatDraftImages } from '@/hooks/api/chat/useGetChatDraftImages';
import {
  PostChatRoomResponseData,
  usePostChatRoom,
} from '@/hooks/api/chat/usePostChatRoom';
import { usePostDraftImage } from '@/hooks/api/chat/usePostDraftImage';
import { useFetchDoctorProfile } from '@/hooks/api/doctor/useFetchDoctorProfil';
import { useFetchGroup } from '@/hooks/api/group/useFetchGroup';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { loadLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
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
} from 'react';

export const newChatRoomFormDataKey = 'NewChatRoom::chatRoom';

type AgeRange = string | 'child';
type Mode = 'input' | 'confirm';

export const useNewChatRoom = () => {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>('input');
  const [chatRoom, setChatRoom] = useState<NewChatRoomEntity>({
    chat_room_id: '',
    room_type: 'FREE',
    gender: 'man',
    disease_name: '',
    first_message: '',
    publishment_accepted: true,
    target_specialities: [],
    chat_draft_image_ids: [],
  });
  const [ageRange, setAgeRange] = useState<AgeRange>('');
  const [childAge, setChildAge] = useState<string>('');
  const [editingImage, setEditingImage] = useState<File>();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [
    isMedicalSpecialitiesSelectDialogShown,
    setIsMedicalSpecialitiesSelectDialogShown,
  ] = useState(false);
  const [isDoctorSearchModalShown, setIsDoctorSearchModalShown] =
    useState(false);
  const [isSearchGroupModalShown, setIsSearchGroupModalShown] = useState(false);
  const [isUseDraftImages, setIsUseDraftImages] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { createNewChatRoom } = usePostChatRoom();
  const { createDraftImage } = usePostDraftImage();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { chatDraftImages, mutate: mutateGetChatDraftImages } =
    useGetChatDraftImages({ isNeed: isUseDraftImages });
  const { deleteChatDraftImage } = useDeleteChatDraftImage();
  const { group } = useFetchGroup(chatRoom.group_id);
  const { doctor } = useFetchDoctorProfile(chatRoom.target_doctor);

  const imageInput = useRef<HTMLInputElement>(null);

  const selectedMedicalSpecialities = useMemo((): MedicalSpecialityEntity[] => {
    if (!medicalSpecialities) {
      return [];
    }

    const results: MedicalSpecialityEntity[] = [];
    for (const specialityCode of chatRoom.target_specialities) {
      const medicalSpeciality = medicalSpecialities.find(
        (medicalSpeciality) =>
          medicalSpeciality.speciality_code === specialityCode
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
      chat_draft_image_ids:
        chatDraftImages?.map(
          (chatDraftImage) => chatDraftImage.chat_draft_image_id
        ) ?? [],
    }),
    [ageRange, chatDraftImages, chatRoom, childAge]
  );

  const initialize = useCallback(async () => {
    if (!medicalSpecialities) {
      return;
    }

    const draft = loadLocalStorage(newChatRoomFormDataKey);
    if (!draft) {
      return;
    }
    if (
      !confirm(
        '下書きに作成途中のコンサルがあります。作成途中のコンサルを続けて編集しますか？'
      )
    ) {
      setIsInitialized(true);
      return;
    }

    const data = JSON.parse(draft) as NewChatRoomEntity;

    setChatRoom(data);

    if (data.age) {
      if (data.age < 10) {
        setChildAge(data.age.toString());
        setAgeRange('child');
      } else {
        setAgeRange(data.age.toString());
      }
    }

    setIsUseDraftImages(true);
    setIsInitialized(true);
  }, [medicalSpecialities]);

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
        !confirm(
          'コンサル文にテンプレートを反映します。現在書かれている内容は消えてしまいますがよろしいですか？'
        )
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

    // if (this.reConsultChatRoom) {
    //   chatRoom.re_consult_chat_room_id = this.reConsultChatRoom.chat_room_id
    //   chatRoom.re_consult_file_chat_message_ids =
    //     this.reConsultFileMessages.map((chatMessage) => chatMessage.uid)
    // }

    // chatRoom.target_specialities = chatRoom.target_specialities.map(
    //   (medicalSpeciality) => medicalSpeciality.speciality_code
    // )

    const response = await createNewChatRoom({
      ...formData,
      chat_room_id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        (c) => {
          const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      ),
    }).catch((error) => {
      console.error(error);
      setErrorMessage(
        (error.response.data as PostChatRoomResponseData).message
      );
      return null;
    });

    if (!response) {
      setIsSending(false);
      setModeAndScrollToTop('input');
      return;
    }

    if (response.data.code !== 1 || !response.data.chat_room_id) {
      setIsSending(false);
      setErrorMessage(response.data.message);
      setModeAndScrollToTop('input');
      return;
    }

    router.push(`/chat?chat_room_id=${response.data.chat_room_id}`);
  }, [createNewChatRoom, formData, router, setModeAndScrollToTop]);

  const resetImageInput = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [imageInput]);

  const addFile = useCallback(
    async (file: File) => {
      await createDraftImage(file);
      setIsUseDraftImages(true);
      mutateGetChatDraftImages();
    },
    [createDraftImage, mutateGetChatDraftImages]
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
      const response = await deleteChatDraftImage(chatDraftImageId).catch(
        (error) => {
          console.error(error);
          return null;
        }
      );
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
        target_specialities: medicalSpecialities.map(
          (medicalSpeciality) => medicalSpeciality.speciality_code
        ),
      });
      setIsMedicalSpecialitiesSelectDialogShown(false);
    },
    [setChatRoomFields]
  );

  const moveSelectedMedicalSpeciality = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const copy = [...chatRoom.target_specialities];
      const dragging = copy.splice(dragIndex, 1);
      setChatRoomFields({
        target_specialities: [
          ...copy.slice(0, hoverIndex),
          dragging[0],
          ...copy.slice(hoverIndex),
        ],
      });
    },
    [chatRoom.target_specialities, setChatRoomFields]
  );

  return {
    ageRange,
    backToInput,
    childAge,
    changeMedicalSpecialities,
    chatDraftImages,
    confirmInput,
    deleteChatDraftImageById,
    doctor,
    editingImage,
    errorMessage,
    chatRoom,
    group,
    imageInput,
    isDoctorSearchModalShown,
    isMedicalSpecialitiesSelectDialogShown,
    isSearchGroupModalShown,
    isSending,
    medicalSpecialities,
    medicalSpecialityCategories,
    mode,
    moveSelectedMedicalSpeciality,
    onImageEdited,
    onSelectImage,
    resetImageInput,
    selectConsultMessageTemplate,
    selectedMedicalSpecialities,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setEditingImage,
    setChatRoomFields,
    setIsDoctorSearchModalShown,
    setIsMedicalSpecialitiesSelectDialogShown,
    setIsSearchGroupModalShown,
    submit,
  };
};
