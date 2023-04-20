import { Card } from '@/components/Parts/Card/Card';
import React from 'react';
import { AssignLabelAndContent } from './AssignLabelAndContent';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { GrayButton } from '@/components/Parts/Button/GrayButton';
import Link from 'next/link';

type Props = {
  chatRoom: ChatRoomEntity;
  images: string[];
  onConfirm: () => void;
};

export const Assign: React.FC<Props> = ({
  chatRoom,
  images,
  onConfirm,
}: Props) => {
  return (
    <Card className="px-4 py-8 lg:px-20 lg:py-8" spNoBorder>
      <div
        data-testid="assign-assign"
        className="text-center text-2xl font-bold"
      >
        E-コンサル依頼内容
      </div>
      <div className="py-8 text-center text-sm text-strong">
        &lt;注意&gt;本サービスを通してご提供頂いた専門的知見に基づくアドバイスは、
        質問医の判断で活用するものとして同意を頂いた上で本サービスをご活用頂いております
      </div>
      <AssignLabelAndContent label="ルーム名">
        {chatRoom.title}
      </AssignLabelAndContent>
      <AssignLabelAndContent label="コンサル文" className="mt-4">
        <div className="whitespace-pre-wrap break-words">
          {chatRoom.latest_message}
        </div>
      </AssignLabelAndContent>
      {images.length > 0 && (
        <AssignLabelAndContent label="参考画像" className="mt-4">
          <div className="flex flex-row gap-3">
            {images.map((imageUrl) => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt=""
                className="max-h-[540px] max-w-full"
              />
            ))}
          </div>
        </AssignLabelAndContent>
      )}
      <div className="mx-auto mt-[60px] flex w-4/5 flex-col gap-10 lg:w-full lg:flex-row-reverse lg:gap-6">
        <PrimaryButton
          type="button"
          className="w-full flex-1"
          onClick={onConfirm}
        >
          E-コンサルに回答する
        </PrimaryButton>
        <Link href="/chat">
          <GrayButton type="button" className="w-full flex-1">
            依頼を断る
          </GrayButton>
        </Link>
      </div>
    </Card>
  );
};