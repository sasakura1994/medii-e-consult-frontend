import React from 'react';
import styles from './Profile.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useClipboard } from '@/hooks/useClipboard';
import { useProfile } from './useProfile';
import { UrlPublish } from './UrlPublish';
import { Detail } from './Detail';
import { Edit } from './Edit';
import { Modal } from '@/components/Parts/Modal/Modal';

export const Profile: React.FC = () => {
  const accountId = 'AC10-6226-9933-69'; // TODO: ログイン情報から取得する
  const clipboardUrl = `${process.env.WEB_SERVER_URL}/NewChatRoom?target_account_id=${accountId}`;
  const { isError, clipboard } = useClipboard(clipboardUrl);
  const { editProfileScreen, showModal } = useProfile();

  return (
    <>
      <UrlPublish clipboard={clipboard} />

      <div className={styles.edit_profile}>
        <Detail />
        <Edit />
      </div>

      {editProfileScreen.isEditOpen && (
        <button
          type="button"
          className="mx-auto
                     block
                     rounded-full
                     bg-primary
                     py-[7px] px-8
                     font-bold
                     text-white
                     drop-shadow-button"
          data-testid="btn-profile-regist"
          onClick={() => {
            console.log('プロフィール登録');
          }}
        >
          プロフィール登録
        </button>
      )}

      <div className="mt-12 text-center lg:pb-20">
        {editProfileScreen.isEditOpen ? (
          <button
            type="button"
            className="text-[#0758E4] underline"
            onClick={() => console.log('アカウント削除')}
          >
            アカウントを削除する
          </button>
        ) : (
          <button
            type="button"
            className="text-[#999999] underline"
            onClick={() => console.log('ログアウト')}
          >
            ログアウト
          </button>
        )}
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

      <Modal isShow={showModal}>
        <div className="h-32 w-32 rounded-md bg-white">
          <h2>モーダル</h2>
        </div>
      </Modal>
    </>
  );
};
