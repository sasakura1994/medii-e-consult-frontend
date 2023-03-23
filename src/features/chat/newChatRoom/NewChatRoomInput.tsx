import React from 'react';
import { NewChatRoomFormLabel } from '@/features/chat/newChatRoom/NewChatRoomFormLabel';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomRoomType } from './NewChatRoomRoomType';

type Props = ReturnType<typeof useNewChatRoom>;

export const NewChatRoomInput: React.FC<Props> = (props: Props) => {
  const { formData, setFormData } = props;

  return (
    <>
      <h1 className="text-center text-2xl leading-9">E-コンサル ルーム作成</h1>
      <div className="mx-auto px-4 lg:w-[80%]">
        <NewChatRoomFormLabel className="pt-4">
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
      </div>
    </>
  );
};
