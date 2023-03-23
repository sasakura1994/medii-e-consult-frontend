import React from 'react';
import { NewChatRoomFormLabel } from '@/features/chat/newChatRoom/NewChatRoomFormLabel';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomRoomType } from './NewChatRoomRoomType';
import { Radio } from '@/components/Parts/Form/Radio';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { ages, childAges } from '@/data/age';

type Props = ReturnType<typeof useNewChatRoom>;

export const NewChatRoomInput: React.FC<Props> = (props: Props) => {
  const {
    ageRange,
    childAge,
    formData,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setFormData,
  } = props;

  return (
    <>
      <h1 className="text-center text-2xl leading-9">E-コンサル ルーム作成</h1>
      <div className="mx-auto px-4 lg:w-[80%]">
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
      </div>
    </>
  );
};
