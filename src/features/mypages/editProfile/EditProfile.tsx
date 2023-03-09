import React from 'react';
import styles from './EditProfile.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useClipboard } from '@/hooks/useClipboard';
import { EditProfileUrlPublish } from './EditProfileUrlPublish';
import { EditProfileDetail } from './EditProfileDetail';
import { EditProfileEdit } from './EditProfileEdit';

export const EditProfile: React.FC = () => {
  const accountId = 'AC10-6226-9933-69'; // TODO: ログイン情報から取得する
  const clipboardUrl = `${process.env.WEB_SERVER_URL}/NewChatRoom?target_account_id=${accountId}`;
  const { isError, clipboard } = useClipboard(clipboardUrl);

  return (
    <>
      <EditProfileUrlPublish clipboard={clipboard} />

      <div className={styles.edit_profile}>
        <EditProfileDetail />
        <EditProfileEdit />
      </div>

      <div className="text-center lg:pb-20">
        <button
          type="button"
          className="text-sm text-[#999999] underline"
          onClick={() => console.log('ログアウト')}
        >
          ログアウト
        </button>
      </div>

      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position={toast.POSITION.BOTTOM_CENTER}
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
