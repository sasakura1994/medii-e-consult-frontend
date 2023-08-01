import { useDeleteChatDraftImage } from '@/hooks/api/chat/useDeleteChatDraftImage';
import { useGetChatDraftImages } from '@/hooks/api/chat/useGetChatDraftImages';
import { PostChatRoomResponseData, usePostChatRoom } from '@/hooks/api/chat/usePostChatRoom';
import { usePostDraftImage } from '@/hooks/api/chat/usePostDraftImage';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { moveItem } from '@/libs/dnd';
import { GroupEntity } from '@/types/entities/GroupEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';

type AgeRange = string | 'child';
type Mode = 'input' | 'confirm';

export const useNewChatRoom = () => {
  const [mode, setMode] = React.useState<Mode>('input');
  const [formData, setFormData] = React.useState<NewChatRoomEntity>({
    room_type: 'FREE',
    gender: 'man',
    disease_name: '',
    first_message: '',
    publishment_accepted: true,
  });
  const [ageRange, setAgeRange] = React.useState<AgeRange>('');
  const [childAge, setChildAge] = React.useState<string>('');
  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] = React.useState<MedicalSpecialityEntity[]>([]);
  const [editingImage, setEditingImage] = React.useState<File>();
  const [doctor, setDoctor] = React.useState<DoctorEntity>();
  const [group, setGroup] = React.useState<GroupEntity>();
  const [isSending, setIsSending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isMedicalSpecialitiesSelectDialogShown, setIsMedicalSpecialitiesSelectDialogShown] = React.useState(false);
  const [isDoctorSearchModalShown, setIsDoctorSearchModalShown] = React.useState(false);
  const [isSearchGroupModalShown, setIsSearchGroupModalShown] = React.useState(false);

  const { createNewChatRoom } = usePostChatRoom();
  const { createDraftImage } = usePostDraftImage();
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { chatDraftImages, mutate: mutateGetChatDraftImages } = useGetChatDraftImages({ isNeed: true });
  const { deleteChatDraftImage } = useDeleteChatDraftImage();

  const imageInput = React.useRef<HTMLInputElement>(null);

  const setAgeRangeWrapper = React.useCallback(
    (age: AgeRange) => {
      setAgeRange(age);

      if (age === 'child') {
        setChildAge('');
        setFormData({ ...formData, age: undefined });
      } else {
        setFormData({ ...formData, age: Number(age) });
      }
    },
    [formData]
  );

  const setChildAgeWrapper = React.useCallback(
    (age: string) => {
      setChildAge(age);
      setFormData({ ...formData, age: Number(age) });
    },
    [formData]
  );

  const selectConsultMessageTemplate = React.useCallback(
    (firstMessage: string) => {
      if (
        formData.first_message.trim() !== '' &&
        !confirm('コンサル文にテンプレートを反映します。現在書かれている内容は消えてしまいますがよろしいですか？')
      ) {
        return;
      }

      setFormData((formData) => ({ ...formData, first_message: firstMessage }));
    },
    [formData.first_message]
  );

  const setModeAndScrollToTop = React.useCallback((mode: Mode) => {
    setMode(mode);
    window.scrollTo(0, 0);
  }, []);

  const confirmInput = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setModeAndScrollToTop('confirm');
    },
    [formData]
  );

  const backToInput = React.useCallback(() => {
    setModeAndScrollToTop('input');
  }, []);

  const submit = React.useCallback(async () => {
    setIsSending(true);
    setErrorMessage('');

    // if (this.reConsultChatRoom) {
    //   formData.re_consult_chat_room_id = this.reConsultChatRoom.chat_room_id
    //   formData.re_consult_file_chat_message_ids =
    //     this.reConsultFileMessages.map((chatMessage) => chatMessage.uid)
    // }

    // formData.target_specialities = formData.target_specialities.map(
    //   (medicalSpeciality) => medicalSpeciality.speciality_code
    // )

    const response = await createNewChatRoom({
      ...formData,
      chat_draft_image_ids: [],
      target_specialities: [],
    }).catch((error) => {
      console.error(error);
      setErrorMessage((error.response.data as PostChatRoomResponseData).message);
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
  }, [formData]);

  const resetImageInput = React.useCallback(() => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [imageInput]);

  const onSelectImage = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const onImageEdited = React.useCallback((file: File) => {
    setEditingImage(undefined);
    addFile(file);
  }, []);

  const addFile = React.useCallback(async (file: File) => {
    await createDraftImage(file);
    mutateGetChatDraftImages();
  }, []);

  const deleteChatDraftImageById = React.useCallback(async (chatDraftImageId: string) => {
    const response = await deleteChatDraftImage(chatDraftImageId).catch((error) => {
      console.error(error);
      return null;
    });
    if (!response) {
      alert('エラーが発生しました。');
      return;
    }
    mutateGetChatDraftImages();
  }, []);

  const changeMedicalSpecialities = React.useCallback((medicalSpecialities: MedicalSpecialityEntity[]) => {
    setSelectedMedicalSpecialities(medicalSpecialities);
    setIsMedicalSpecialitiesSelectDialogShown(false);
  }, []);

  const moveSelectedMedicalSpeciality = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSelectedMedicalSpecialities(moveItem(selectedMedicalSpecialities, dragIndex, hoverIndex));
    },
    [selectedMedicalSpecialities]
  );

  const changeDoctor = React.useCallback(
    (doctor: DoctorEntity) => {
      setDoctor(doctor);
      setFormData({ ...formData, target_doctor: doctor.account_id });
    },
    [formData]
  );

  const changeGroup = React.useCallback(
    (group: GroupEntity) => {
      setGroup(group);
      setFormData({ ...formData, group_id: group.group_id });
    },
    [formData]
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
    formData,
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
    setFormData,
    setIsDoctorSearchModalShown,
    setIsMedicalSpecialitiesSelectDialogShown,
    setIsSearchGroupModalShown,
    setSelectedMedicalSpecialities,
    submit,
  };
};
