import React, { useMemo } from 'react';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomConfirmationLabel } from './NewChatRoomConfirmationLabel';
import { NewChatRoomConfirmationValue } from './NewChatRoomConfirmationValue';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { GrayButton } from '@/components/Parts/Button/GrayButton';

type Props = ReturnType<typeof useNewChatRoom>;

export const NewChatRoomConfirmation: React.FC<Props> = (props: Props) => {
  const {
    ageRange,
    backToInput,
    chatDraftImages,
    childAge,
    chatRoom,
    filesForReConsult,
    isSending,
    reConsultFileMessages,
    submit,
    medicalSpecialities,
    doctor,
    group,
  } = props;

  const specialistSelectionMethod = useMemo(() => {
    if (chatRoom.room_type === 'FREE' && medicalSpecialities) {
      return (
        <>
          <NewChatRoomConfirmationLabel>専門医指定方法：診療科を指定</NewChatRoomConfirmationLabel>
          <NewChatRoomConfirmationValue className="my-4">
            {chatRoom.target_specialities.map((speciality) => {
              const medicalSpeciality = medicalSpecialities.find(
                (medicalSpeciality) => medicalSpeciality.speciality_code === speciality
              );
              return (
                <li key={speciality} className="list-decimal">
                  {medicalSpeciality?.name}
                </li>
              );
            })}
          </NewChatRoomConfirmationValue>
        </>
      );
    } else if (chatRoom.room_type === 'BY_NAME' && doctor) {
      return (
        <>
          <NewChatRoomConfirmationLabel>専門医指定方法：バイネーム(氏名)</NewChatRoomConfirmationLabel>
          <NewChatRoomConfirmationValue className="my-4">
            {doctor.last_name + ' ' + doctor.first_name + ' 先生'}
          </NewChatRoomConfirmationValue>
        </>
      );
    } else if (chatRoom.room_type === 'GROUP' && group) {
      return (
        <>
          <NewChatRoomConfirmationLabel>専門医指定方法：グループ</NewChatRoomConfirmationLabel>
          <NewChatRoomConfirmationValue className="my-4">{group.group_name}</NewChatRoomConfirmationValue>
        </>
      );
    } else {
      return <></>;
    }
  }, [chatRoom, medicalSpecialities, doctor, group]);

  return (
    <>
      <h1 className="text-center text-2xl leading-9">E-コンサル ルーム プレビュー</h1>
      <div className="mx-auto mb-10 lg:w-[80%]">
        <div className="my-8 text-center text-sm text-strong">
          &lt;注意&gt;本サービスを通して得た専門的知見に基づくアドバイスは、
          質問医である担当医師の判断・責任でご活用ください
        </div>
        {specialistSelectionMethod}
        <NewChatRoomConfirmationLabel className="mt-10">患者情報</NewChatRoomConfirmationLabel>
        <NewChatRoomConfirmationValue className="mt-4 flex gap-4">
          <div>{ageRange === 'child' ? `${childAge}歳` : `${ageRange}代`}</div>
          <div>{chatRoom.gender === 'man' ? '男性' : '女性'}</div>
        </NewChatRoomConfirmationValue>
        <NewChatRoomConfirmationLabel className="mt-10">要約</NewChatRoomConfirmationLabel>
        <NewChatRoomConfirmationValue className="mt-4">{chatRoom.disease_name}</NewChatRoomConfirmationValue>
        <NewChatRoomConfirmationLabel className="mt-10">コンサル文</NewChatRoomConfirmationLabel>
        <div className="mt-4 whitespace-pre-wrap break-words text-sm">{chatRoom.first_message}</div>
        {filesForReConsult.length > 0 || reConsultFileMessages.length > 0 ? (
          <div className="mt-8 flex flex-col gap-4">
            {reConsultFileMessages.map((chatMessage) => (
              <div key={chatMessage.uid}>
                {chatMessage.content_type.match(/^image/) !== null ? (
                  <img src={chatMessage.file_path} alt={chatMessage.file_name} />
                ) : (
                  <>{chatMessage.file_name}</>
                )}
              </div>
            ))}
            {filesForReConsult.map((file) => (
              <div key={file.id}>
                {file.file.type.match(/^image/) !== null ? (
                  <img src={file.image as string} alt={file.file.name} />
                ) : (
                  <>{file.file.name}</>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {chatDraftImages && (
              <div className="mt-8 flex flex-col gap-4">
                {chatDraftImages.map((chatDraftImage) => (
                  <div key={chatDraftImage.chat_draft_image_id}>
                    {chatDraftImage.is_image ? (
                      <img src={chatDraftImage.url} alt={chatDraftImage.file_name} />
                    ) : (
                      <>{chatDraftImage.file_name}</>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <NewChatRoomConfirmationLabel className="my-4">コンサル事例掲載許可</NewChatRoomConfirmationLabel>
        <NewChatRoomConfirmationValue className="my-4">
          {chatRoom.publishment_accepted
            ? 'コンサル事例としての掲載を許可する'
            : 'コンサル事例としての掲載を許可しない'}
        </NewChatRoomConfirmationValue>
        <div className="mt-8 text-center">
          {!isSending ? (
            <div className="mx-auto w-3/5">
              <div>
                <GrayButton type="button" onClick={() => backToInput()} className="w-full">
                  編集
                </GrayButton>
              </div>
              <div className="mt-4">
                <PrimaryButton type="button" onClick={() => submit()} className="w-full">
                  E-コンサルを開始
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <SpinnerBorder />
          )}
        </div>
      </div>
    </>
  );
};
