import React from 'react';

export const AmazonGiftExchangeDialog: React.FC = () => {
  const isShow = true;
  if (!isShow) {
    return null;
  }

  const purchaseCompleted = true;

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/[0.4]">
      <div className="absolute top-1/2 left-1/2 w-[90%] translate-y-[-50%] translate-x-[-50%] rounded border border-solid border-[#999999] bg-white p-4 lg:w-[33%]">
        <div className="mb-3 flex justify-between">
          <h2>ポイント交換確認</h2>
          <button type="button" onClick={() => console.log('閉じる')}>
            閉じる
          </button>
        </div>

        <p className="mb-4">
          <span>1000</span>円分のAmazonギフトに交換します。よろしいですか。
        </p>

        {purchaseCompleted ? (
          <p>
            交換を受け付けました。ギフト券の発行が完了次第メールにてご連絡いたします。
          </p>
        ) : (
          <button
            type="button"
            onClick={() => console.log('交換する')}
            className="mx-auto mb-3 block rounded-full bg-[#5c6bc0] py-[7px] px-6 font-bold text-white drop-shadow-[0_4px_10px_rgba(92,107,192,0.3)]"
          >
            交換する
          </button>
        )}
      </div>
    </div>
  );
};
