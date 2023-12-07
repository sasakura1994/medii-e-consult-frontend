import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNotifySettings } from './useNotifySettings';
import { Radio } from '@/components/Parts/Form/Radio';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Card } from '@/components/Parts/Card/Card';

export const NotifySettings: React.FC = () => {
  const { notifySettings, isChanged, isError, changeNotifyNew, changeNotifySeminar, update } = useNotifySettings();

  return (
    <>
      <Card className="mt-[48px] px-6 py-10">
        <div>
          <h2 className="text-xl">通知設定</h2>

          <h2 className="mt-6 font-bold">コンサル・グループチャットの新しい返信</h2>

          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Radio
                value="mail-push"
                name="new_notify"
                checked={notifySettings.is_mail_notify && notifySettings.is_push_notify ? true : false}
                id="mail-push"
                label="メール・プッシュ通知 両方受け取る"
                onChange={changeNotifyNew}
              />
            </li>
            <li>
              <Radio
                value="mail"
                name="new_notify"
                checked={notifySettings.is_mail_notify && !notifySettings.is_push_notify ? true : false}
                id="mail"
                label="メール通知"
                onChange={changeNotifyNew}
              />
            </li>
            <li>
              <Radio
                value="push"
                name="new_notify"
                checked={!notifySettings.is_mail_notify && notifySettings.is_push_notify ? true : false}
                id="push"
                label="プッシュ通知（パソコン／アプリ版）"
                onChange={changeNotifyNew}
              />
            </li>
          </ul>

          <h2 className="mt-8">Mediiからのお知らせメール</h2>

          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Radio
                value="permit"
                name="seminar_notify"
                checked={!notifySettings.not_seminar_mail_target ? true : false}
                id="permit"
                label="メール通知を受け取る"
                onChange={changeNotifySeminar}
              />
            </li>
            <li>
              <Radio
                value="deny"
                name="seminar_notify"
                checked={notifySettings.not_seminar_mail_target ? true : false}
                id="deny"
                label="メール通知を受け取らない"
                onChange={changeNotifySeminar}
              />
            </li>
          </ul>
        </div>

        <nav className="mt-6 text-center">
          <PrimaryButton type="button" onClick={update} size="large" className="mx-auto" disabled={!isChanged}>
            通知設定を更新
          </PrimaryButton>
        </nav>
      </Card>

      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position={toast.POSITION.TOP_CENTER}
        closeButton={false}
        toastClassName={() =>
          isError
            ? 'bg-toast-error text-white text-center py-2 shadow-md'
            : 'bg-toast-success text-white text-center py-2 shadow-md'
        }
      />
    </>
  );
};
