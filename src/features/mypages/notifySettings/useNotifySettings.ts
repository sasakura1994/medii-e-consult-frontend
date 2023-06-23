import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import type { ProfileEntity } from '@/types/entities/profileEntity';

export const useNotifySettings = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [profile, setProfile] = useState<ProfileEntity>();
  const [isError, setIsError] = useState(false);

  const { profile: defaultProfile } = useFetchProfile();
  const { updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    if (!defaultProfile) {
      return;
    }

    setProfile({ ...defaultProfile });
    setIsInitialized(true);
  }, [isInitialized, defaultProfile]);

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

      setProfile((oldValues?: ProfileEntity) =>
        oldValues
          ? {
              ...oldValues,
              ...notifyNewFlags,
            }
          : undefined
      );
    },
    [setProfile]
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

      setProfile((oldValues?: ProfileEntity) =>
        oldValues
          ? {
              ...oldValues,
              not_seminar_mail_target: notifySeminarFlags,
            }
          : undefined
      );
    },
    [setProfile]
  );

  /**
   * 更新実行
   */
  const update = useCallback(async () => {
    setIsError(false);
    const data = { ...profile };
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, (data as any)[key]);
    });

    const response = await updateProfile(formData).catch((error) => {
      console.error(error);
      return null;
    });

    if (!response) {
      setIsError(true);
      toast('通知設定に失敗しました');
      return;
    }

    toast('通知設定を変更しました');
  }, [profile, updateProfile]);

  return {
    profile,
    isError,
    changeNotifyNew,
    changeNotifySeminar,
    update,
  };
};
