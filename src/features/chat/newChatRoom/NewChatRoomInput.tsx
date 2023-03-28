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

type Props = ReturnType<typeof useNewChatRoom>;

export const NewChatRoomInput: React.FC<Props> = (props: Props) => {
  const {
    ageRange,
    childAge,
    formData,
    selectConsultMessageTemplate,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setFormData,
  } = props;

  return (
    <>
      <h1 className="text-center text-2xl leading-9">E-コンサル ルーム作成</h1>
      <div className="mx-auto mb-10 lg:w-[80%]">
        <NewChatRoomFormLabel className="mt-4">
          専門医指定方法
        </NewChatRoomFormLabel>
        <div className="mt-1 flex flex-col gap-1">
          <div>
            <NewChatRoomRoomType
              id="room-type-free"
              label="診療科で指定する"
              note="一般的なご相談の場合"
              checked={formData.room_type === 'FREE'}
              value="FREE"
              onChange={() => setFormData({ ...formData, room_type: 'FREE' })}
            />
          </div>
          <div>
            <NewChatRoomRoomType
              id="room-type-by-name"
              label="バイネーム(氏名)で指定する"
              note="相談したい先生が決まっている場合"
              checked={formData.room_type === 'BY_NAME'}
              value="BY_NAME"
              onChange={() =>
                setFormData({ ...formData, room_type: 'BY_NAME' })
              }
            />
          </div>
          <div>
            <NewChatRoomRoomType
              id="room-type-group"
              label="グループで指定する"
              note="特定疾患や地域連携のご相談の場合"
              checked={formData.room_type === 'GROUP'}
              value="GROUP"
              onChange={() => setFormData({ ...formData, room_type: 'GROUP' })}
            />
          </div>
        </div>
        <NewChatRoomFormLabel className="mt-4">患者情報</NewChatRoomFormLabel>
        <div className="flex gap-2">
          <Radio
            name="gender"
            value="man"
            label="男性"
            id="gender-man"
            checked={formData.gender === 'man'}
            onChange={() => setFormData({ ...formData, gender: 'man' })}
          />
          <Radio
            name="gender"
            value="woman"
            label="女性"
            id="gender-woman"
            checked={formData.gender === 'woman'}
            onChange={() => setFormData({ ...formData, gender: 'woman' })}
          />
        </div>
        <div className="mt-2 w-[240px]">
          <SelectBox
            name="age_range"
            id="age-range"
            required
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
            value={formData.disease_name}
            onChange={(e) =>
              setFormData({ ...formData, disease_name: e.target.value })
            }
            placeholder="例）多関節痛を訴える抗核抗体陽性患者への追加検査"
            required
          />
        </div>
        <NewChatRoomFormLabel className="mt-4">コンサル文</NewChatRoomFormLabel>
        <div className="mt-6 text-xs font-bold">テンプレートを反映</div>
        <div className="mt-4 flex flex-row gap-6">
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
            value={formData.first_message}
            onChange={(e) =>
              setFormData({ ...formData, first_message: e.target.value })
            }
          />
          <div className="mt-3 flex items-center gap-2">
            <button type="button">参考画像追加</button>
            <div className="text-[11px] text-block-gray">
              画像・動画・Word・PDF等を含むあらゆるファイル形式に対応しています
            </div>
          </div>
          <div className="my-6 text-center">
            <button type="submit">プレビュー</button>
          </div>
          <div className="mt-6">
            <CheckBox
              name="publishment_accepted"
              label="コンサル事例としての掲載を許可する。"
              checked={formData.publishment_accepted}
              onChange={(e) =>
                setFormData({
                  ...formData,
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
      </div>
    </>
  );
};
