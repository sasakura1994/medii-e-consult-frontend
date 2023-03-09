import React from 'react';
import { useAmazonGift } from './useAmazonGift';

export const AmazonGiftCodeConfirmDialog: React.FC = () => {
  const {
    codeConfirmState,
    inputPinCode,
    showGiftCode,
    resendPinCode,
    closeCodeComfirmDialog,
  } = useAmazonGift();

  if (!codeConfirmState.showComfirmDialog) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/[0.4]">
      <div
        className="absolute
                   top-1/2
                   left-1/2
                   w-[90%]
                   translate-y-[-50%]
                   translate-x-[-50%]
                   rounded border
                   border-solid
                   border-block-gray
                   bg-white
                   p-4
                   lg:w-[33%]"
      >
        <div className="mb-3 flex justify-between">
          <h2>ギフトコード確認</h2>
          <button type="button" onClick={closeCodeComfirmDialog}>
            閉じる
          </button>
        </div>

        <p className="mb-4">
          ご登録頂いてメールアドレスに確認コードをお送りしました。メールに記載されている確認コードをご入力下さい。
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
                       py-2
                       px-3"
            onChange={inputPinCode}
          />
        </div>

        <button
          type="button"
          onClick={() =>
            showGiftCode(codeConfirmState.requestId, codeConfirmState.pinCode)
          }
          className="mx-auto
                     mb-3
                     block
                     rounded-full
                     bg-primary
                     py-[7px]
                     px-6
                     font-bold
                     text-white
                     drop-shadow-button"
        >
          ギフトコードを表示
        </button>

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
          <button
            type="button"
            onClick={() => resendPinCode(codeConfirmState.requestId)}
            className="mx-auto
                       mb-3
                       block
                       rounded-full
                       bg-primary
                       py-[7px]
                       px-6
                       font-bold
                       text-white
                       drop-shadow-button"
          >
            確認コードの再送信
          </button>
        )}

        {/* レスポンスのメッセージ表示 */}
        {codeConfirmState.message && <p>{codeConfirmState.message}</p>}
      </div>
    </div>
  );
};
