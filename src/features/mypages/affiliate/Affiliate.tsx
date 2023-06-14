import React from 'react';
import styles from './Affiliate.module.scss';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useAffiliate } from './useAffiliate';
import { Card } from '@/components/Parts/Card/Card';
import SecondaryButton from '@/components/Button/Secondary';
import TextField from '@/components/TextField/TextField';

export const Affiliate: React.FC = () => {
  const { isError, qrCodeUrl, downloadQrCode, clipboard, invitationUrl } =
    useAffiliate();

  return (
    <>
      <Card className="mt-10 px-6 py-10">
        <p className="text-left text-xxl font-bold">医師紹介キャンペーン</p>
        <p className="mt-8 text-l font-bold">ご紹介特典</p>
        <div className="flex space-x-4 lg:flex-row ">
          <div className="mt-4 h-[76px] w-[290px] shadow-low">
            <p className="my-2  text-center text-md font-bold">ご紹介者様</p>
            <div className="flex items-center justify-center space-x-2">
              <img src="/icons/seminar_ticket.svg" alt="" />
              <p className="text-md">セミナー視聴チケット</p>
            </div>
          </div>
          <div className="mt-4 h-[76px] w-[290px] shadow-low ">
            <p className="my-2 text-center text-md font-bold">
              ご入会いただいた方
            </p>
            <div className="flex items-center justify-center space-x-2">
              <img src="/icons/point_invitation.svg" alt="" />
              <p className="text-md">Mediiのポイント(1000pt)</p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-l font-bold">紹介ページURL</p>
        <div className="flex">
          <div className="border-r border-border-divider pr-6">
            <div className="h-[120px] w-[120px]">
              <img src={qrCodeUrl} alt="" className="" />
            </div>
            <div className="mx-auto w-[120px]">
              <SecondaryButton width="full" onClick={downloadQrCode}>
                QRコードを保存
              </SecondaryButton>
            </div>
          </div>
          <div className="my-auto ml-6 ">
            <p className="text-md">またはURLを共有</p>
            <div className="flex flex-col justify-center">
              <TextField />
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
