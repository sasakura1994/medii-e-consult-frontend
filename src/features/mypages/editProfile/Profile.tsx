import React from 'react';
import styles from './Profile.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useClipboard } from '@/hooks/useClipboard';
import { useProfile } from '../../../hooks/useProfile';
import { UrlPublish } from './UrlPublish';
import { Detail } from './Detail';
import { Edit } from './Edit';
import { Modal } from '@/components/Parts/Modal/Modal';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';

export const Profile: React.FC = () => {
  const accountId = 'AC10-6226-9933-69'; // TODO: ログイン情報から取得する
  const clipboardUrl = `${process.env.WEB_SERVER_URL}/NewChatRoom?target_account_id=${accountId}`;
  const { isError, clipboard } = useClipboard(clipboardUrl);
  const { editProfileScreen, showModal, setShowModal } = useProfile();
  const [showOtherModal, setOtherModal] = React.useState(false); // TODO: テスト用のステートなので動作確認後削除する

  return (
    <>
      <UrlPublish clipboard={clipboard} />

      <div className={styles.edit_profile}>
        <Detail />
        <Edit setShowModal={setShowModal} />
      </div>

      {editProfileScreen.isEditOpen && (
        <>
          <PrimaryButton dataTestId="btn-profile-regist">
            プロフィール登録
          </PrimaryButton>
        </>
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

      {/* TODO: モーダルは仮実装となるので、適宜中身を実装する */}
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <div className="h-32 w-64 rounded-md bg-white p-4">
            <h2 className="mb-3">モーダル</h2>

            <div className="text-center">
              <button
                type="button"
                className="rounded border border-solid border-primary px-4 py-2"
                onClick={() => setOtherModal(true)}
              >
                open other modal
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* TODO: このモーダルはサンプルとして実装しているので、確認後削除する */}
      {showOtherModal && (
        <Modal setShowModal={setOtherModal}>
          <div className="h-48 w-80 rounded-md bg-red-300 p-4">
            <h2 className="mb-3">別のモーダル</h2>
          </div>
        </Modal>
      )}
    </>
  );
};
