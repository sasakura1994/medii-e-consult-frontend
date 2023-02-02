import React from 'react';
import styles from './Affiliate.module.scss';

export const AffiliatePresenter: React.FC = () => {
  return (
    <div className={styles.affiliate}>
      <h2 className={styles.affiliate__heading}>医師紹介 キャンペーン</h2>

      <div className="mb-4">
        <h3 className={styles.affiliate__sub_heading}>
          医師紹介 キャンペーン対象者
        </h3>
        <p className={styles.affiliate__text}>
          <span className="font-bold mr-[3px]">回答医</span>
          としてご登録いただいた
          <span className="font-bold mx-[3px]">アレルギー内科</span>の先生
        </p>
      </div>

      <div className="mb-4">
        <h3 className={styles.affiliate__sub_heading}>ご紹介特典</h3>
        <p className={styles.affiliate__text}>
          <span className="font-bold">ご紹介者＆被ご紹介者</span>
          双方にMedii内で利用できる
          <span className="text-[#5c6bc0] font-bold ml-[3px]">
            777ポイント（アマゾンギフト券交換 777円分相当）
          </span>
          <span className="font-bold">をプレゼント！</span>
        </p>
      </div>

      <div className="mb-8 lg:mb-1">
        <h3 className={styles.affiliate__sub_heading}>ご紹介URL</h3>
        <div className="flex flex-wrap justify-center gap-y-5 lg:gap-x-5">
          <div className="w-40 h-40">
            <img
              src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://stg-e-consult.medii.jp/registration?p=AC10-6226-9933-69"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-5">
            <button type="button" className={styles.affiliate__btn}>
              QRコードを保存
            </button>
            <button type="button" className={styles.affiliate__btn}>
              紹介用URLをコピー
            </button>
          </div>
        </div>
      </div>

      <div className="mb-[22px] hidden lg:block">
        <h3 className="bg-[#e2e7ff] text-[#5c6bc0] text-sm text-center leading-6">
          スマートフォン向けアプリもぜひご利用ください
        </h3>
        <div className="flex justify-center items-center gap-x-12 px-6 py-3">
          <a
            href="https://apps.apple.com/us/app/id1530503820"
            className="w-4/5"
          >
            <img src="/images/appstore.png" alt="" className="w-full" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=jp.medii.mediiapp"
            className="w-4/5"
          >
            <img src="/images/googleplay.png" alt="" className="w-full" />
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-[#333333] font-normal text-center mb-2">
          紹介における注意事項について
        </h3>
        <ul className="text-[#808080] text-sm list-disc">
          <li>
            回答医としてのご登録はその専門科の専門医資格や、一定年数以上の勤務経験（※専門医取得可能年数以上の臨床経験を参考にしております）、ご功績などから総合的に判断し、承認制とさせていただいております。
            <br />
            （大変恐縮ではございますが、回答医としての条件を満たさない場合ポイント贈呈の対象外となることご了承ください）
          </li>
          <li>
            上記URL以外からご紹介頂いた場合、紹介者を識別できないためポイントは付与されません。
          </li>
          <li>
            ポイント付与対象となる医師の方は、専門科、もしくは対応可能な科にアレルギー内科を選択された方のみとさせて頂いております。
          </li>
          <li>
            当キャンペーンについては規定数に達し次第、予告なく終了する場合があります。
          </li>
          <li>
            ポイントの付与は被紹介者様の回答医申請が承認された時点で行われます。
          </li>
        </ul>
      </div>
    </div>
  );
};
