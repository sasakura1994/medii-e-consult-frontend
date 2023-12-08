import React from 'react';
import { useAmazonGift } from './useAmazonGift';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';

export const AmazonGiftCodeConfirmDialog: React.FC = () => {
  const { codeConfirmState, inputPinCode, showGiftCode, resendPinCode, closeCodeComfirmDialog } = useAmazonGift();

  if (!codeConfirmState.showComfirmDialog) {
    return null;
  }

  return (
    <Modal pcWidth="400">
      <div className="px-4 py-2">
        <div className="mb-3 flex justify-between">
          <h2>ギフトコード確認</h2>
          <button type="button" onClick={closeCodeComfirmDialog}>
            閉じる
          </button>
        </div>

        <p className="mb-4">
          ご登録いただいているメールアドレスに確認コードをお送りしました。メールに記載されている確認コードをご入力下さい。
        </p>

        <div className="mb-4 flex items-center">
          <span className="mr-3">確認コード</span>
          <input
            type="text"
            id=""
            className="h-12
                       w-40
                       rounded
                       border
                       border-solid
                       border-block-gray
                       px-3
                       py-2"
            onChange={inputPinCode}
          />
        </div>

        <PrimaryButton
          onClick={() => showGiftCode(codeConfirmState.requestId, codeConfirmState.pinCode)}
          className="mx-auto mb-3 px-6 py-[7px]"
        >
          ギフトコードを表示
        </PrimaryButton>

        {!codeConfirmState.message && codeConfirmState.giftCode ? (
          // 正常にコードが取得できた場合
          <div className="mx-auto w-[90%]">
            <p>
              <span className="mr-2">ギフトコード:</span>
              <span className="font-bold">{codeConfirmState.giftCode}</span>
            </p>
            <p>(ギフトコードの取り扱いには十分ご注意ください。)</p>
          </div>
        ) : (
          // 初期表示
          <PrimaryButton
            onClick={() => resendPinCode(codeConfirmState.requestId)}
            className="mx-auto mb-3 px-6 py-[7px]"
          >
            確認コードの再送信
          </PrimaryButton>
        )}

        {/* レスポンスのメッセージ表示 */}
        {codeConfirmState.message && <p>{codeConfirmState.message}</p>}
      </div>
    </Modal>
  );
};
