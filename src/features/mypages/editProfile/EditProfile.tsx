import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useClipboard } from '@/hooks/useClipboard';
import { EditProfileDetail } from './EditProfileDetail';

export const EditProfile: React.FC = () => {
  const accountId = 'AC10-6226-9933-69'; // TODO: ログイン情報から取得する
  const clipboardUrl = `${process.env.WEB_SERVER_URL}/NewChatRoom?target_account_id=${accountId}`;
  const { isError, clipboard } = useClipboard(clipboardUrl);

  return (
    <>
      <div className="mt-4 bg-white p-2">
        <div className="rounded bg-[#eff3f6] p-4 text-center">
          <h2 className="mb-1 text-xl">
            自身へのコンサルを行うことができるURLの発行ボタンです。
          </h2>
          <p className="mb-1 leading-7">
            お困りの先生に発行することで、
            <br />
            スムーズにE-コンサルの利用が行えますので、ご利用ください。
          </p>
          <p className="mb-3 text-sm">
            ※別途、E-コンサルの登録が必要となります。
          </p>
          <button
            type="button"
            className="mx-auto
                       mb-3
                       block
                       rounded-full
                       bg-[#5c6bc0]
                       py-[7px] px-8
                       font-bold
                       text-white
                       drop-shadow-[0_4px_10px_rgba(92,107,192,0.3)]"
            data-testid="btn-exec-exchange"
            onClick={() => clipboard('クリップボードにコピーしました')}
          >
            <img
              src="/icons/clip.svg"
              alt=""
              className="mr-3 inline-block align-middle"
            />
            コンサル受付URLを発行する
          </button>
        </div>
      </div>

      <EditProfileDetail />

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
            ? 'bg-[#b20000] text-white text-center py-[8px] shadow-md'
            : 'bg-[#3f51b5] text-white text-center py-[8px] shadow-md'
        }
      />
    </>
  );
};
