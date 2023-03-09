import React from 'react';
import styles from './NotifySettings.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNotifySettings } from './useNotifySettings';

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
                <div className={styles.radio}>
                  <input
                    type="radio"
                    value="mail-push"
                    name="new_notify"
                    checked={profile?.is_mail_notify && profile?.is_push_notify}
                    id="mail-push"
                    onChange={changeNotifyNew}
                    data-testid="radio-new-notify"
                  />
                  <label htmlFor="mail-push">
                    メール・プッシュ通知両方受け取る
                  </label>
                </div>
              </li>
              <li className={styles.notify_settings__item}>
                <div className={styles.radio}>
                  <input
                    type="radio"
                    value="mail"
                    name="new_notify"
                    checked={
                      profile?.is_mail_notify && !profile?.is_push_notify
                    }
                    id="mail"
                    onChange={changeNotifyNew}
                    data-testid="radio-new-notify"
                  />
                  <label htmlFor="mail">メール通知</label>
                </div>
              </li>
              <li className={styles.notify_settings__item}>
                <div className={styles.radio}>
                  <input
                    type="radio"
                    value="push"
                    name="new_notify"
                    checked={
                      !profile?.is_mail_notify && profile?.is_push_notify
                    }
                    id="push"
                    onChange={changeNotifyNew}
                    data-testid="radio-new-notify"
                  />
                  <label htmlFor="push" className="">
                    プッシュ通知（パソコン／アプリ版）
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.notify_settings__block}>
            <h2 className={styles.notify_settings__sub_heading}>
              ■ Mediiからのお知らせメール
            </h2>

            <ul className={styles.notify_settings__list}>
              <li className={styles.notify_settings__item}>
                <div className={styles.radio}>
                  <input
                    type="radio"
                    value="permit"
                    name="seminar_notify"
                    checked={!profile?.not_seminar_mail_target}
                    id="permit"
                    onChange={changeNotifySeminar}
                    data-testid="radio-seminar-notify"
                  />
                  <label htmlFor="permit">メール通知を受け取る</label>
                </div>
              </li>
              <li className={styles.notify_settings__item}>
                <div className={styles.radio}>
                  <input
                    type="radio"
                    value="deny"
                    name="seminar_notify"
                    checked={profile?.not_seminar_mail_target}
                    id="deny"
                    onChange={changeNotifySeminar}
                    data-testid="radio-seminar-notify"
                  />
                  <label htmlFor="deny">メール通知を受け取らない</label>
                </div>
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
