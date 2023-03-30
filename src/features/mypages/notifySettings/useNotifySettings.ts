import React from 'react';
import { toast } from 'react-toastify';
import { profileState } from '@/globalStates/profileState';
import { useRecoilState } from 'recoil';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

export type UseNotifySettingsType = {
  profile?: ProfileEntityType;
  isError: boolean;
  changeNotifyNew: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeNotifySeminar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  update: () => void;
};

export const useNotifySettings = (): UseNotifySettingsType => {
  const [profile, setProfileData] = useRecoilState(profileState);
  const { profile: profileData } = useFetchProfile();
  const { isSuccess, isError, updateProfile } = useUpdateProfile();

  /**
   * 更新失敗
   */
  React.useEffect(() => {
    if (!isSuccess && isError) {
      toast('通知設定に失敗しました');
    }
  }, [isSuccess, isError]);

  /**
   * 更新成功
   */
  React.useEffect(() => {
    if (isSuccess) {
      toast('通知設定を変更しました');
    }
  }, [isSuccess]);

  /**
   * 新着メッセージ通知の選択処理
   */
  const changeNotifyNew = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let notifyNewFlags = {
        is_mail_notify: true,
        is_push_notify: true,
      };

      switch (e.target.value) {
        case 'mail-push':
          notifyNewFlags = {
            is_mail_notify: true,
            is_push_notify: true,
          };
          break;
        case 'mail':
          notifyNewFlags = {
            is_mail_notify: true,
            is_push_notify: false,
          };
          break;
        case 'push':
          notifyNewFlags = {
            is_mail_notify: false,
            is_push_notify: true,
          };
          break;
        default:
          break;
      }

      setProfileData((oldValues: ProfileEntityType) => ({
        ...oldValues,
        ...notifyNewFlags,
      }));
    },
    [setProfileData]
  );

  /**
   * お知らせメールの選択処理
   */
  const changeNotifySeminar = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let notifySeminarFlags = true;

      switch (e.target.value) {
        case 'permit':
          notifySeminarFlags = false;
          break;
        case 'deny':
          notifySeminarFlags = true;
          break;
        default:
          break;
      }

      setProfileData((oldValues: ProfileEntityType) => ({
        ...oldValues,
        not_seminar_mail_target: notifySeminarFlags,
      }));
    },
    [setProfileData]
  );

  /**
   * 更新実行
   */
  const update = () => {
    updateProfile(profile);
  };

  /**
   * プロフィールをフェッチできたらグローバルステートに保持する
   * Note:
   *       ログイン時（useLogin）にもステートに値がセットされているが、
   *       ログイン後はリダイレクトが走って中身が消えてしまうので、一旦ここで再セットするようにしている
   */
  React.useEffect(() => {
    if (!profileData) return;
    setProfileData((oldValues: ProfileEntityType) => ({
      ...oldValues,
      ...profileData,
    }));
  }, [profileData]);

  return {
    profile,
    isError,
    changeNotifyNew,
    changeNotifySeminar,
    update,
  };
};
