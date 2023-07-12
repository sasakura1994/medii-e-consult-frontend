import { useDeleteChatDraftImage } from '@/hooks/api/chat/useDeleteChatDraftImage';
import { useGetChatDraftImages } from '@/hooks/api/chat/useGetChatDraftImages';
import {
  PostChatRoomResponseData,
  usePostChatRoom,
} from '@/hooks/api/chat/usePostChatRoom';
import { usePostDraftImage } from '@/hooks/api/chat/usePostDraftImage';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { GroupEntity } from '@/types/entities/GroupEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';

export const newChatRoomFormDataKey = 'NewChatRoom::chatRoom';

type AgeRange = string | 'child';
type Mode = 'input' | 'confirm';

export const useNewChatRoom = () => {
  const [mode, setMode] = useState<Mode>('input');
  const [chatRoom, setChatRoom] = useState<NewChatRoomEntity>({
    room_type: 'FREE',
    gender: 'man',
    disease_name: '',
    first_message: '',
    publishment_accepted: true,
  });
  const [ageRange, setAgeRange] = useState<AgeRange>('');
  const [childAge, setChildAge] = useState<string>('');
  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] =
    useState<MedicalSpecialityEntity[]>([]);
  const [editingImage, setEditingImage] = useState<File>();
  const [doctor, setDoctor] = useState<DoctorEntity>();
  const [group, setGroup] = useState<GroupEntity>();
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [
    isMedicalSpecialitiesSelectDialogShown,
    setIsMedicalSpecialitiesSelectDialogShown,
  ] = useState(false);
  const [isDoctorSearchModalShown, setIsDoctorSearchModalShown] =
    useState(false);
  const [isSearchGroupModalShown, setIsSearchGroupModalShown] = useState(false);

  const { createNewChatRoom } = usePostChatRoom();
  const { createDraftImage } = usePostDraftImage();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { chatDraftImages, mutate: mutateGetChatDraftImages } =
    useGetChatDraftImages({ isNeed: true });
  const { deleteChatDraftImage } = useDeleteChatDraftImage();

  const imageInput = useRef<HTMLInputElement>(null);

  const setAgeRangeWrapper = useCallback(
    (age: AgeRange) => {
      setAgeRange(age);

      if (age === 'child') {
        setChildAge('');
        setChatRoom({ ...chatRoom, age: undefined });
      } else {
        setChatRoom({ ...chatRoom, age: Number(age) });
      }
    },
    [chatRoom]
  );

  const setChildAgeWrapper = useCallback(
    (age: string) => {
      setChildAge(age);
      setChatRoom({ ...chatRoom, age: Number(age) });
    },
    [chatRoom]
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

      setChatRoom((chatRoom) => ({ ...chatRoom, first_message: firstMessage }));
    },
    [chatRoom.first_message]
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
      ...chatRoom,
      chat_draft_image_ids: [],
      target_specialities: [],
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

    if (response.data.code !== 1) {
      setIsSending(false);
      setErrorMessage(response.data.message);
      setModeAndScrollToTop('input');
      return;
    }
  }, [chatRoom, createNewChatRoom, setModeAndScrollToTop]);

  const resetImageInput = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [imageInput]);

  const addFile = useCallback(
    async (file: File) => {
      await createDraftImage(file);
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
      setSelectedMedicalSpecialities(medicalSpecialities);
      setIsMedicalSpecialitiesSelectDialogShown(false);
    },
    []
  );

  const moveSelectedMedicalSpeciality = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSelectedMedicalSpecialities((selectedMedicalSpecialities) => {
        const copy = [...selectedMedicalSpecialities];
        const dragging = copy.splice(dragIndex, 1);
        return [
          ...copy.slice(0, hoverIndex),
          dragging[0],
          ...copy.slice(hoverIndex),
        ];
      });
    },
    []
  );

  const changeDoctor = useCallback(
    (doctor: DoctorEntity) => {
      setDoctor(doctor);
      setChatRoom({ ...chatRoom, target_doctor: doctor.account_id });
    },
    [chatRoom]
  );

  const changeGroup = useCallback(
    (group: GroupEntity) => {
      setGroup(group);
      setChatRoom({ ...chatRoom, group_id: group.group_id });
    },
    [chatRoom]
  );

  return {
    ageRange,
    backToInput,
    childAge,
    changeDoctor,
    changeGroup,
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
    setAgeRange,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setEditingImage,
    setChatRoom,
    setIsDoctorSearchModalShown,
    setIsMedicalSpecialitiesSelectDialogShown,
    setIsSearchGroupModalShown,
    setSelectedMedicalSpecialities,
    submit,
  };
};
