import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { usePostUpdatePublishmentParam } from '@/hooks/api/chat/usePostUpdatePublishmentParam';
import React from 'react';
import { KeyedMutator } from 'swr';

type Props = {
  chatRoomId: string;
  mutatePublishmentStatusData?: KeyedMutator<{
    publishment_accepted: number;
  }>;
};

export const AllowAddToConsultExampleListModal = (props: Props) => {
  const { updatePublishmentParam } = usePostUpdatePublishmentParam();
  const { chatRoomId, mutatePublishmentStatusData } = props;
  return (
    <div className="fixed inset-0 z-[200] flex h-auto items-center justify-center bg-[rgba(157,157,157,0.7)]">
      <div
        className="z-[210] my-auto flex flex-col rounded-md border bg-white p-4 shadow-low
      lg:static lg:h-[150px] lg:w-[500px]"
      >
        <p className="text-center text-base text-[#333333]">当コンサルをコンサル事例としての掲載を許可しますか？</p>
        <div className="mx-auto my-5 flex space-x-2">
          <SecondaryButton
            onClick={async () => {
              await updatePublishmentParam({ chat_room_id: chatRoomId, is_allowed: 0 });
              mutatePublishmentStatusData?.();
            }}
          >
            許可しない
          </SecondaryButton>
          <PrimaryButton
            onClick={async () => {
              await updatePublishmentParam({ chat_room_id: chatRoomId, is_allowed: 1 });
              mutatePublishmentStatusData?.();
            }}
          >
            許可する
          </PrimaryButton>
        </div>
        <p className="text-center text-sm text-[#333333]">※患者や医師の個人情報は伏せた上で掲載させていただきます。</p>
      </div>
    </div>
  );
};
