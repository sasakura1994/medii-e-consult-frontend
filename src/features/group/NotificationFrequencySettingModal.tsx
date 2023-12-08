import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { Radio } from '@/components/Parts/Form/Radio';
import { Modal } from '@/components/Parts/Modal/Modal';
import { GroupEntity, NotificationFrequency } from '@/hooks/api/group/useFetchGetGroup';
import { useUpdateNotificationFrequency } from '@/hooks/api/group/useUpdateNotificationFrequency';

import React, { useState } from 'react';

type NotificationFrequencySettingModalProps = {
  setShowModal: (value: boolean) => void;
  group: GroupEntity;
};

export const NotificationFrequencySettingModal = (props: NotificationFrequencySettingModalProps) => {
  const { setShowModal, group } = props;
  const [selectedValue, setSelectedValue] = useState<NotificationFrequency>(group.notification_frequency);
  const { updateNotificationFrequency } = useUpdateNotificationFrequency();
  return (
    <Modal
      isUseFooter
      setShowModal={async () => {
        await updateNotificationFrequency(
          {
            notification_frequency: selectedValue,
          },
          group.group_id
        );
        setShowModal(false);
      }}
      className="px-6 pb-0 pt-10"
      submitButton={
        <PrimaryButton
          onClick={async () => {
            await updateNotificationFrequency(
              {
                notification_frequency: selectedValue,
              },
              group.group_id
            );
            setShowModal(false);
          }}
        >
          設定を保存する
        </PrimaryButton>
      }
      closeButton={
        <TertiaryButton
          onClick={async () => {
            await updateNotificationFrequency(
              {
                notification_frequency: selectedValue,
              },
              group.group_id
            );
            setShowModal(false);
          }}
        >
          キャンセル
        </TertiaryButton>
      }
    >
      <p className="text-center text-2xl font-bold">メッセージ通知頻度の設定</p>
      <p className="mt-4 text-sm text-[#333333]">
        ※このグループカンファレンス内の通知頻度の設定することで、通知回数を抑えることができます。
      </p>
      <div className="mx-auto w-[160px]">
        <div className="mt-2 flex">
          <div className="mt-2 p-1.5">
            <Radio
              name="frequency"
              id={'ALL'}
              checked={selectedValue === 'ALL'}
              value={'ALL'}
              onChange={() => setSelectedValue('ALL')}
            />
          </div>
          <label className="block" htmlFor={'ALL'}>
            <p>毎回通知</p>
          </label>
        </div>
        <div className="mt-2 flex">
          <div className="mt-2 p-1.5">
            <Radio
              name="frequency"
              id={'HOURLY'}
              checked={selectedValue === 'HOURLY'}
              value={'HOURLY'}
              onChange={() => setSelectedValue('HOURLY')}
            />
          </div>

          <label className="block" htmlFor={'HOURLY'}>
            <p>1時間に1回通知</p>
          </label>
        </div>
        <div className="my-2 flex">
          <div className="mt-2 p-1.5">
            <Radio
              name="frequency"
              id={'DAILY'}
              checked={selectedValue === 'DAILY'}
              value={'DAILY'}
              onChange={() => setSelectedValue('DAILY')}
            />
          </div>

          <label className="block" htmlFor={'DAILY'}>
            <p> 24時間に1回通知</p>
          </label>
        </div>
      </div>
    </Modal>
  );
};
