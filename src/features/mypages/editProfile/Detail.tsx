import React from 'react';
import { useEditProfile } from './useEditProfile';
import { CaptionWithBody } from '@/components/Parts/CaptionWithBody';

export const Detail: React.FC = () => {
  const { editProfileScreen, openEdit } = useEditProfile();

  if (!editProfileScreen.isDetailOpen) {
    return null;
  }

  return (
    <>
      <div className="item mb-10 flex items-center justify-between">
        <h2 className="text-2xl leading-8" data-testid="h-edit-profile-detail">
          プロフィール
        </h2>
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
          onClick={openEdit}
          data-testid="btn-profile-edit"
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
    </>
  );
};
