import React from 'react';

type PropsType = {
  clipboard: (message?: string | undefined) => void;
};

export const EditProfileUrlPublish: React.FC<PropsType> = (props) => {
  const { clipboard } = props;

  return (
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
          data-testid="btn-url-publish"
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
  );
};
