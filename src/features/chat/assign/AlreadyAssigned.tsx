import React from 'react';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { Container } from '@/components/Layouts/Container';

type Props = {
  chatRoom: ChatRoomEntity;
};

export const AlreadyAssigned: React.FC<Props> = ({ chatRoom }: Props) => {
  const parts = chatRoom.title.split(/ /);

  return (
    <div data-testid="assign-already-assigned" className="bg-white py-8">
      <Container className="px-8">
        <img
          src="/icons/exclamation.svg"
          width="32"
          height="32"
          alt=""
          className="mx-auto"
        />
        <div className="mt-2 text-center font-bold text-primary">
          申し訳ございません。以下のコンサルは他の先生がご対応して下さいました。
        </div>
        <div className="mt-4 flex justify-center">
          <div className="rounded border border-[#dddddd] py-2 px-[46px] text-center">
            <div className="text-sm font-bold">{parts[parts.length - 1]}</div>
            {parts.length >= 3 && (
              <div className="mt-[1px] text-sm">
                {parts.slice(0, 2).join(' ')}
              </div>
            )}
            <div className="tetx-block-gray mt-[1px] text-[11px]">
              ※平均回答時間：45分
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          もしよろしければ、以下の症例相談のやり取りに先生の持つご知見を
          <br className="hidden lg:inline" />
          コメントいただくことはお願いできますでしょうか？
        </div>
        <div className="mt-1 text-center text-[11px] font-bold">
          どうぞよろしくお願いいたします。
        </div>
      </Container>
    </div>
  );
};
