import React from 'react';
import styles from './NotifySettings.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNotifySettings } from './useNotifySettings';
import { Radio } from '@/components/Parts/Form/Radio';

export const NotifySettings: React.FC = () => {
  const { profile, isError, changeNotifyNew, changeNotifySeminar, update } =
    useNotifySettings();

  return (
    <>
      <div className={styles.notify_settings}>
        <div className={styles.notify_settings__content}>
          <h2 className={styles.notify_settings__heading}>通知設定</h2>

          <div className={styles.notify_settings__block}>
            <h2 className={styles.notify_settings__sub_heading}>
              ■ E-コンサルからの新着メッセージ通知
            </h2>

            <ul className={styles.notify_settings__list}>
              <li className={styles.notify_settings__item}>
                <Radio
                  value="mail-push"
                  name="new_notify"
                  checked={
                    profile?.is_mail_notify && profile?.is_push_notify
                      ? true
                      : false
                  }
                  id="mail-push"
                  label="メール・プッシュ通知両方受け取る"
                  onChange={changeNotifyNew}
                />
              </li>
              <li className={styles.notify_settings__item}>
                <Radio
                  value="mail"
                  name="new_notify"
                  checked={
                    profile?.is_mail_notify && !profile?.is_push_notify
                      ? true
                      : false
                  }
                  id="mail"
                  label="メール通知"
                  onChange={changeNotifyNew}
                />
              </li>
              <li className={styles.notify_settings__item}>
                <Radio
                  value="push"
                  name="new_notify"
                  checked={
                    !profile?.is_mail_notify && profile?.is_push_notify
                      ? true
                      : false
                  }
                  id="push"
                  label="プッシュ通知（パソコン／アプリ版）"
                  onChange={changeNotifyNew}
                />
              </li>
            </ul>
          </div>

          <div className={styles.notify_settings__block}>
            <h2 className={styles.notify_settings__sub_heading}>
              ■ Mediiからのお知らせメール
            </h2>

            <ul className={styles.notify_settings__list}>
              <li className={styles.notify_settings__item}>
                <Radio
                  value="permit"
                  name="seminar_notify"
                  checked={!profile?.not_seminar_mail_target ? true : false}
                  id="permit"
                  label="プッシュ通知（パソコン／アプリ版）"
                  onChange={changeNotifySeminar}
                />
              </li>
              <li className={styles.notify_settings__item}>
                <Radio
                  value="deny"
                  name="seminar_notify"
                  checked={profile?.not_seminar_mail_target ? true : false}
                  id="deny"
                  label="メール通知を受け取らない"
                  onChange={changeNotifySeminar}
                />
              </li>
            </ul>
          </div>
        </div>

        <nav className="text-center">
          <button
            type="button"
            onClick={update}
            className="rounded-full
                       border-0
                       bg-primary
                       py-3.5
                       px-8
                       font-bold
                       text-white
                       drop-shadow-button"
          >
            通知設定を更新
          </button>
        </nav>
      </div>

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
