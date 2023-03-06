import React from 'react';
import styles from './EditProfile.module.scss';
import { CaptionWithBody } from '@/components/Parts/CaptionWithBody';

export const EditProfile: React.FC = () => {
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
            onClick={() => console.log('URL発行')}
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

      <div className={styles.edit_profile}>
        <div className="item mb-10 flex items-center justify-between">
          <h2 className="text-2xl leading-8">プロフィール</h2>
          <button
            type="button"
            className="inline-block
                       rounded
                       border
                       border-solid
                       border-[#999999]
                       bg-white
                       px-2
                       py-2
                       text-sm
                       leading-none"
            onClick={() => console.log('プロフィール編集')}
          >
            プロフィールを編集
          </button>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ 利用者情報</h3>
          <div className="flex">
            <CaptionWithBody
              caption="名前"
              body="蜂谷 庸正"
              classNames={{
                block: 'mb-6 flex-1',
                caption: 'text-[#999999] mb-2',
              }}
            />
            <CaptionWithBody
              caption="名前（よみ）"
              body="はちや つねまさ"
              classNames={{
                block: 'mb-6 flex-1',
                caption: 'text-[#999999] mb-2',
              }}
            />
          </div>

          <CaptionWithBody
            caption="生年月日"
            body="1978年 10月 7日"
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <div>
            <CaptionWithBody
              caption="メールアドレス"
              body="t.hachiya@medii.jp"
              classNames={{ block: 'mb-2', caption: 'text-[#999999] mb-2' }}
            />
            <button
              type="button"
              className="inline-block
                       rounded
                       border
                       border-solid
                       border-[#999999]
                       bg-white
                       px-2
                       py-2
                       text-sm
                       leading-none"
              onClick={() => console.log('メールアドレス編集')}
            >
              メールアドレスを変更
            </button>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ 医療従事経歴</h3>

          <CaptionWithBody
            caption="医師資格取得年"
            body="1999 年"
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="専門科"
            body="呼吸器内科"
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="その他（対応可能な科目）"
            body="総合内科"
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="特によく診てきた疾患・領域"
            body={undefined}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="専門医資格"
            body={undefined}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ 所属病院</h3>

          <CaptionWithBody
            caption="勤務病院の所在地"
            body="埼玉県"
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="勤務先病院名"
            body="TMG"
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ E-コンサル利用区分</h3>
          <p>回答医&相談（E−コンサルへの回答も行います）</p>
        </div>
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
    </>
  );
};
