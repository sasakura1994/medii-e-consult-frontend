import React from 'react';
import styles from './NotifySettings.module.scss';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

type PresenterPropsType = {
  profile: ProfileEntityType;
  handleChangeNotifyNew: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeNotifySeminar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickUpdate: () => void;
};

export const NotifySettingsPresenter: React.FC<PresenterPropsType> = React.memo(
  (props) => {
    const {
      profile,
      handleChangeNotifyNew,
      handleChangeNotifySeminar,
      handleClickUpdate,
    } = props;

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
                      checked={profile.is_mail_notify && profile.is_push_notify}
                      id="mail-push"
                      onChange={handleChangeNotifyNew}
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
                        profile.is_mail_notify && !profile.is_push_notify
                      }
                      id="mail"
                      onChange={handleChangeNotifyNew}
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
                        !profile.is_mail_notify && profile.is_push_notify
                      }
                      id="push"
                      onChange={handleChangeNotifyNew}
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
                      checked={!profile.not_seminar_mail_target}
                      id="permit"
                      onChange={handleChangeNotifySeminar}
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
                      checked={profile.not_seminar_mail_target}
                      id="deny"
                      onChange={handleChangeNotifySeminar}
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
              onClick={handleClickUpdate}
              className="bg-[#5c6bc0]
                         text-white
                           font-bold
                           py-3.5
                           px-8
                           border-0
                           rounded-full
                           drop-shadow-[0_4px_10px_rgba(92,107,192,0.3)]"
            >
              通知設定を更新
            </button>
          </nav>
        </div>
      </>
    );
  }
);

NotifySettingsPresenter.displayName = 'NotifySettingsPresenter';
