import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { UpdateNotfySettingsRequestData, useUpdateNotifySettings } from '@/hooks/api/doctor/useUpdateNotifySettings';

export type UseNotifySettings = {
  notifySettings: UpdateNotfySettingsRequestData;
  isChanged: boolean;
  isError: boolean;
  changeNotifyNew: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeNotifySeminar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  update: () => void;
};

const emptySettings: UpdateNotfySettingsRequestData = {
  is_mail_notify: false,
  is_push_notify: false,
  not_seminar_mail_target: false,
};

export const useNotifySettings = (): UseNotifySettings => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [notifySettings, setNotifySettings] = useState<UpdateNotfySettingsRequestData>({ ...emptySettings });
  const [defaultSettings, setDefaultSettings] = useState<UpdateNotfySettingsRequestData>({ ...emptySettings });
  const [isError, setIsError] = useState(false);

  const { profile } = useFetchProfile();
  const { updateNotifySettings } = useUpdateNotifySettings();

  const isChanged = useMemo(
    () =>
      defaultSettings.is_mail_notify !== notifySettings.is_mail_notify ||
      defaultSettings.is_push_notify !== notifySettings.is_push_notify ||
      defaultSettings.not_seminar_mail_target !== notifySettings.not_seminar_mail_target,
    [defaultSettings, notifySettings]
  );

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    if (!profile) {
      return;
    }

    const currentNotifySettings = {
      is_mail_notify: !profile.is_mail_notify && !profile.is_push_notify ? true : profile.is_mail_notify,
      is_push_notify: !profile.is_mail_notify && !profile.is_push_notify ? true : profile.is_push_notify,
      not_seminar_mail_target: profile.not_seminar_mail_target,
    };
    setNotifySettings(currentNotifySettings);
    setDefaultSettings(currentNotifySettings);
    setIsInitialized(true);
  }, [isInitialized, profile]);

  /**
   * 新着メッセージ通知の選択処理
   */
  const changeNotifyNew = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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

    setNotifySettings((oldValues) => ({
      ...oldValues,
      ...notifyNewFlags,
    }));
  }, []);

  /**
   * お知らせメールの選択処理
   */
  const changeNotifySeminar = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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

    setNotifySettings((oldValues) => ({
      ...oldValues,
      not_seminar_mail_target: notifySeminarFlags,
    }));
  }, []);

  /**
   * 更新実行
   */
  const update = useCallback(async () => {
    setIsError(false);

    const response = await updateNotifySettings(notifySettings).catch((error) => {
      console.error(error);
      return null;
    });

    if (!response) {
      setIsError(true);
      toast('通知設定に失敗しました');
      return;
    }

    setDefaultSettings(notifySettings);
    toast('通知設定を変更しました');
  }, [notifySettings, updateNotifySettings]);

  return {
    notifySettings,
    isChanged,
    isError,
    changeNotifyNew,
    changeNotifySeminar,
    update,
  };
};
