import React from 'react';
import { useRecoilState } from 'recoil';
import { profileState } from '@/globalStates/profileState';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { NotifySettingsPresenter } from './NotifySettingsPresenter';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

export const NotifySettingsContainer: React.FC = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const { isLoading, profile: profileData } = useFetchProfile();
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
   * プロフィールデータの状態管理
   */
  React.useEffect(() => {
    if (isLoading && !profileData) {
      return;
    }

    setProfile((oldValues) => ({
      ...oldValues,
      ...profileData,
    }));
  }, [isLoading, profileData]);

  /**
   * 新着メッセージ通知の選択処理
   */
  const handleChangeNotifyNew = React.useCallback(
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

      setProfile((oldValues: ProfileEntityType) => ({
        ...oldValues,
        ...notifyNewFlags,
      }));
    },
    []
  );

  /**
   * お知らせメールの選択処理
   */
  const handleChangeNotifySeminar = React.useCallback(
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

      setProfile((oldValues: ProfileEntityType) => ({
        ...oldValues,
        not_seminar_mail_target: notifySeminarFlags,
      }));
    },
    [setProfile]
  );

  /**
   * 更新実行
   */
  const handleClickUpdate = () => {
    updateProfile(profile);
  };

  return (
    <>
      <NotifySettingsPresenter
        profile={profile}
        handleChangeNotifyNew={handleChangeNotifyNew}
        handleChangeNotifySeminar={handleChangeNotifySeminar}
        handleClickUpdate={handleClickUpdate}
      />
      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position={toast.POSITION.TOP_CENTER}
        closeButton={false}
        toastClassName={() =>
          isError
            ? 'bg-[#b20000] text-white text-center py-[8px] shadow-md'
            : 'bg-[#3f51b5] text-white text-center py-[8px] shadow-md'
        }
      />
    </>
  );
};
