import React from 'react';
import styles from './Affiliate.module.scss';

export const AffiliatePresenter: React.FC = () => {
  return (
    <div className={styles.affiliate}>
      <h2 className={styles.affiliate__heading}>医師紹介</h2>

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
    </div>
  );
};
