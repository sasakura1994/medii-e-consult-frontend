import React from 'react';
import { NewChatRoomFormLabel } from '@/features/chat/newChatRoom/NewChatRoomFormLabel';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomRoomType } from './NewChatRoomRoomType';
import { Radio } from '@/components/Parts/Form/Radio';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { ages, childAges } from '@/data/age';
import { TextField } from '@/components/Parts/Form/TextField';
import { consultMessageTemplates } from '@/data/chatRoom';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import ImageEditor, {
  ImageEditorProps,
} from '@/components/Parts/ImageEditor/ImageEditor';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { OutlinedSquareButton } from '@/components/Parts/Button/OutlinedSquareButton';
import { MedicalSpecialitiesSelectDialog } from '@/components/MedicalSpeciality/MedicalSpecialitiesSelectDialog';
import { SelectedMedicalSpecialities } from '@/components/MedicalSpeciality/SelectedMedicalSpecialities';
import { DoctorSearchModal } from './DoctorSearchModal';
import { SearchGroupModal } from './SearchGroupModal';
import { NewChatRoomFile } from './NewChatRoomFile';
// canvasの関係でサーバー時点でimportされているとエラーになるためこうするしかないらしい
const ImageEditorComponent = dynamic<ImageEditorProps>(
  (() =>
    import(
      '@/components/Parts/ImageEditor/ImageEditor'
    )) as DynamicOptions<ImageEditorProps>,
  { ssr: false }
) as typeof ImageEditor;

type Props = ReturnType<typeof useNewChatRoom>;

export const NewChatRoomInput: React.FC<Props> = (props: Props) => {
  const {
    ageRange,
    deleteChatDraftImageById,
    errorMessage,
    changeMedicalSpecialities,
    chatDraftImages,
    childAge,
    confirmInput,
    doctor,
    deleteReConsultFileMessage,
    editingImage,
    chatRoom,
    group,
    imageInput,
    isDoctorSearchModalShown,
    isMedicalSpecialitiesSelectDialogShown,
    isSearchGroupModalShown,
    medicalSpecialities,
    medicalSpecialityCategories,
    moveSelectedMedicalSpeciality,
    onImageEdited,
    onSelectImage,
    reConsultFileMessages,
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
  } = props;

  return (
    <>
      <h1 className="text-center text-2xl leading-9">E-コンサル ルーム作成</h1>
      <div className="mx-auto mb-10 lg:w-[80%]">
        <form onSubmit={confirmInput}>
          <NewChatRoomFormLabel className="mt-4">
            専門医指定方法
          </NewChatRoomFormLabel>
          <div className="mt-1 flex flex-col gap-1">
            <div>
              <NewChatRoomRoomType
                id="room-type-free"
                label="診療科で指定する"
                note="一般的なご相談の場合"
                checked={chatRoom.room_type === 'FREE'}
                value="FREE"
                onChange={() => setChatRoomFields({ room_type: 'FREE' })}
              />
              {chatRoom.room_type === 'FREE' && (
                <>
                  <div className="mt-2 flex items-center gap-2">
                    <OutlinedSquareButton
                      type="button"
                      onClick={() =>
                        setIsMedicalSpecialitiesSelectDialogShown(true)
                      }
                    >
                      診療科を指定
                    </OutlinedSquareButton>
                    {selectedMedicalSpecialities.length === 0 ? (
                      <div>未選択</div>
                    ) : (
                      <div>
                        選択数：{selectedMedicalSpecialities.length}/
                        {medicalSpecialities?.length}
                      </div>
                    )}
                  </div>
                  {selectedMedicalSpecialities.length > 0 &&
                    medicalSpecialityCategories && (
                      <div className="my-6">
                        <SelectedMedicalSpecialities
                          medicalSpecialities={selectedMedicalSpecialities}
                          medicalSpecialityCategories={
                            medicalSpecialityCategories
                          }
                          onDelete={(medicalSpeciality) =>
                            setChatRoomFields({
                              target_specialities:
                                chatRoom.target_specialities.filter(
                                  (specialityCode) =>
                                    specialityCode !==
                                    medicalSpeciality.speciality_code
                                ),
                            })
                          }
                          moveSelectedMedicalSpeciality={
                            moveSelectedMedicalSpeciality
                          }
                        />
                      </div>
                    )}
                </>
              )}
            </div>
            <div>
              <NewChatRoomRoomType
                id="room-type-by-name"
                label="バイネーム(氏名)で指定する"
                note="相談したい先生が決まっている場合"
                checked={chatRoom.room_type === 'BY_NAME'}
                value="BY_NAME"
                onChange={() => setChatRoomFields({ room_type: 'BY_NAME' })}
              />
            </div>
            {chatRoom.room_type === 'BY_NAME' && (
              <>
                <div className="my-2 flex items-center gap-2">
                  <OutlinedSquareButton
                    type="button"
                    onClick={() => setIsDoctorSearchModalShown(true)}
                  >
                    専門医検索
                  </OutlinedSquareButton>
                  {doctor ? (
                    <div>
                      {doctor.last_name} {doctor.first_name} 先生
                    </div>
                  ) : (
                    <div>未選択</div>
                  )}
                </div>
              </>
            )}
            <div>
              <NewChatRoomRoomType
                id="room-type-group"
                label="グループで指定する"
                note="特定疾患や地域連携のご相談の場合"
                checked={chatRoom.room_type === 'GROUP'}
                value="GROUP"
                isBeta
                onChange={() => setChatRoomFields({ room_type: 'GROUP' })}
              />
            </div>
            {chatRoom.room_type === 'GROUP' && (
              <>
                <div className="my-2 flex items-center gap-2">
                  <OutlinedSquareButton
                    type="button"
                    onClick={() => setIsSearchGroupModalShown(true)}
                  >
                    グループ検索
                  </OutlinedSquareButton>
                  {group ? <div>{group.group_name}</div> : <div>未選択</div>}
                </div>
              </>
            )}
          </div>
          <NewChatRoomFormLabel className="mt-4">患者情報</NewChatRoomFormLabel>
          <div className="flex gap-2">
            <Radio
              name="gender"
              value="man"
              label="男性"
              id="gender-man"
              checked={chatRoom.gender === 'man'}
              onChange={() => setChatRoomFields({ gender: 'man' })}
            />
            <Radio
              name="gender"
              value="woman"
              label="女性"
              id="gender-woman"
              checked={chatRoom.gender === 'woman'}
              onChange={() => setChatRoomFields({ gender: 'woman' })}
            />
          </div>
          <div className="mt-2 w-[240px]">
            <SelectBox
              name="age_range"
              id="age-range"
              required
              value={ageRange}
              onChange={(e) => setAgeRangeWrapper(e.target.value)}
            >
              <option value="" disabled={ageRange !== ''}>
                年代を入力して下さい
              </option>
              <option value="child">小児</option>
              {ages.map((age) => (
                <option value={age.age} key={age.age}>
                  {age.label}
                </option>
              ))}
            </SelectBox>
            {ageRange === 'child' && (
              <div className="mt-2">
                <SelectBox
                  name="child_age"
                  id="child-age"
                  value={childAge}
                  required
                  onChange={(e) => setChildAgeWrapper(e.target.value)}
                >
                  <option value="" disabled={childAge !== ''}>
                    小児年齢を入力して下さい
                  </option>
                  {childAges.map((age) => (
                    <option value={age.age} key={age.age}>
                      {age.label}
                    </option>
                  ))}
                </SelectBox>
              </div>
            )}
          </div>
          <NewChatRoomFormLabel className="mt-4">要約</NewChatRoomFormLabel>
          <div className="mt-1">
            <TextField
              name="disease_name"
              value={chatRoom.disease_name}
              onChange={(e) =>
                setChatRoomFields({ disease_name: e.target.value })
              }
              placeholder="例）多関節痛を訴える抗核抗体陽性患者への追加検査"
              required
            />
          </div>
          <NewChatRoomFormLabel className="mt-4">
            コンサル文
          </NewChatRoomFormLabel>
          <div className="mt-6 text-xs font-bold">テンプレートを反映</div>
          <div className="mt-4 flex flex-row flex-wrap gap-x-6">
            {consultMessageTemplates.map((consultMessageTemplate) => (
              <Radio
                key={consultMessageTemplate.title}
                name="consult_message_template"
                label={consultMessageTemplate.title}
                onChange={() =>
                  selectConsultMessageTemplate(consultMessageTemplate.text)
                }
              />
            ))}
          </div>
          <div className="mt-6">
            <ExpandTextArea
              name="first_message"
              className="min-h-[140px] text-[13px]"
              value={chatRoom.first_message}
              onChange={(e) =>
                setChatRoomFields({ first_message: e.target.value })
              }
            />
            <div className="mt-3 flex items-center gap-2">
              <input
                type="file"
                name="file"
                ref={imageInput}
                className="hidden"
                onClick={() => resetImageInput()}
                onChange={onSelectImage}
              />
              <OutlinedSquareButton
                type="button"
                onClick={() => imageInput.current?.click()}
              >
                参考画像追加
              </OutlinedSquareButton>
              <div className="text-[11px] text-block-gray">
                画像・動画・Word・PDF等を含むあらゆるファイル形式に対応しています
              </div>
            </div>
            {((chatDraftImages && chatDraftImages.length > 0) ||
              reConsultFileMessages) && (
              <div className="mt-4 flex flex-col gap-5">
                {reConsultFileMessages.map((chatMessage) => (
                  <NewChatRoomFile
                    key={chatMessage.uid}
                    isImage={chatMessage.content_type.match(/^image/) !== null}
                    url={chatMessage.file_path}
                    onDelete={() => deleteReConsultFileMessage(chatMessage.uid)}
                  />
                ))}
                {chatDraftImages?.map((chatDraftImage) => (
                  <NewChatRoomFile
                    key={chatDraftImage.chat_draft_image_id}
                    isImage={chatDraftImage.is_image}
                    url={chatDraftImage.url}
                    onDelete={() =>
                      deleteChatDraftImageById(
                        chatDraftImage.chat_draft_image_id
                      )
                    }
                  />
                ))}
              </div>
            )}
            <div className="my-6 text-center">
              <PrimaryButton type="submit" className="mx-auto my-6 w-[60%]">
                プレビュー
              </PrimaryButton>
            </div>
            {errorMessage !== '' && (
              <ErrorMessage className="text-center">
                {errorMessage}
              </ErrorMessage>
            )}
            <div className="mt-12">
              <CheckBox
                name="publishment_accepted"
                label="コンサル事例としての掲載を許可する。"
                checked={chatRoom.publishment_accepted}
                onChange={(e) =>
                  setChatRoomFields({
                    publishment_accepted: e.target.checked,
                  })
                }
              />
              <div>
                ※名前などの個人情報は伏せた上で掲載させていただきます。
                <br />
                ※専門医も掲載を許可した場合のみ掲載されます。
              </div>
            </div>
          </div>
        </form>
      </div>
      {editingImage && (
        <ImageEditorComponent
          file={editingImage}
          onSubmit={onImageEdited}
          onClose={() => setEditingImage(undefined)}
        />
      )}
      {isMedicalSpecialitiesSelectDialogShown && (
        <MedicalSpecialitiesSelectDialog
          setShowModal={setIsMedicalSpecialitiesSelectDialogShown}
          defaultSelectedMedicalSpecialities={selectedMedicalSpecialities}
          onChange={changeMedicalSpecialities}
        />
      )}
      {isDoctorSearchModalShown && (
        <DoctorSearchModal
          onChange={(doctor) => {
            setIsDoctorSearchModalShown(false);
            setChatRoomFields({ target_doctor: doctor.account_id });
          }}
          setShowModal={setIsDoctorSearchModalShown}
        />
      )}
      {isSearchGroupModalShown && (
        <SearchGroupModal
          onChange={(group) => {
            setIsSearchGroupModalShown(false);
            setChatRoomFields({ group_id: group.group_id });
          }}
          setShowModal={setIsSearchGroupModalShown}
        />
      )}
    </>
  );
};
