import React from 'react';
import { useEditProfile } from './useEditProfile';
import { Radio } from '@/components/Parts/Form/Radio';

type Props = ReturnType<typeof useEditProfile>;

export const EditProfileNotification = (props: Props) => {
  const { profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="mb-10" data-testid="edit-profile-notification">
        <h3 className="mb-4 text-primary">■ 通知</h3>
        <h4 className="mt-4 text-monotone-500">E-コンサルからの新着メッセージ通知通知</h4>
        <div className="mt-2">
          <div>
            <Radio
              label="メール・プッシュ通知両方受け取る"
              name="news_notification"
              value="mail-push"
              checked={
                (profile.is_mail_notify && profile.is_push_notify) ||
                // 新規登録で未選択の場合
                (!profile.is_mail_notify && !profile.is_push_notify)
              }
              onChange={() => setProfileFields({ is_mail_notify: true, is_push_notify: true })}
            />
          </div>
          <div>
            <Radio
              label="メール通知"
              name="news_notification"
              value="mail"
              checked={profile.is_mail_notify && !profile.is_push_notify}
              onChange={() => setProfileFields({ is_mail_notify: true, is_push_notify: false })}
            />
          </div>
          <div>
            <Radio
              label="プッシュ通知（パソコン／アプリ版）"
              name="news_notification"
              value="push"
              checked={!profile.is_mail_notify && profile.is_push_notify}
              onChange={() => setProfileFields({ is_mail_notify: false, is_push_notify: true })}
            />
          </div>
        </div>
        <h4 className="mt-4 text-monotone-500">セミナーからのお知らせ通知</h4>
        <div className="mt-2">
          <div>
            <Radio
              label="メール通知を受け取る"
              name="not_seminar_mail_target"
              value="false"
              checked={!profile.not_seminar_mail_target}
              onChange={() => setProfileFields({ not_seminar_mail_target: false })}
            />
          </div>
          <div>
            <Radio
              label="メール通知を受け取らない"
              name="not_seminar_mail_target"
              value="true"
              checked={profile.not_seminar_mail_target}
              onChange={() => setProfileFields({ not_seminar_mail_target: true })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
