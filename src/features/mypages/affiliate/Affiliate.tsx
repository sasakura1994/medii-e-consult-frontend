import React from 'react';
import styles from './Affiliate.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useAffiliate } from './useAffiliate';
import { Card } from '@/components/Parts/Card/Card';

export const Affiliate: React.FC = () => {
  const accountId = 'AC10-6226-9933-69'; // TODO: ログイン情報から取得する
  const { isError, qrCodeUrl, downloadQrCode, clipboard } =
    useAffiliate(accountId);

  return (
    <>
      <Card
        className="
        mt-[40px]
        mb-[49px]
        px-[24px]
        py-[24px]
        lg:mb-[40px]
        lg:px-[84px]
        lg:py-[40px]
      "
      >
        <h2 className={styles.affiliate__heading}>医師紹介</h2>

        <div className="mb-8 lg:mb-1">
          <h3 className={styles.affiliate__sub_heading}>ご紹介URL</h3>
          <div className="flex flex-wrap justify-center gap-y-5 lg:gap-x-5">
            <div className="h-40 w-40">
              <img src={qrCodeUrl} alt="" className="h-full w-full" />
            </div>
            <div className="flex flex-col justify-center gap-y-5">
              <button
                type="button"
                className={styles.affiliate__btn}
                onClick={downloadQrCode}
              >
                QRコードを保存
              </button>
              <button
                type="button"
                className={styles.affiliate__btn}
                onClick={clipboard}
              >
                紹介用URLをコピー
              </button>
            </div>
          </div>
        </div>

        <div className="mb-[22px] hidden lg:block">
          <h3 className="bg-[#e2e7ff] text-center text-sm leading-6 text-primary">
            スマートフォン向けアプリもぜひご利用ください
          </h3>
          <div className="flex items-center justify-center gap-x-12 px-6 py-3">
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
      </Card>

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
    </>
  );
};
