import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useAffiliate } from './useAffiliate';
import SecondaryButton from '@/components/Button/SecondaryButton';
import TextField from '@/components/TextField/TextField';
import { HowToInvitation } from './HowToInvitation';

export const Affiliate: React.FC = () => {
  const { isError, qrCodeUrl, downloadQrCode, clipboard, invitationUrl } = useAffiliate();

  return (
    <>
      <div className="mt-10 px-6 py-10">
        <p className="text-left text-xxl font-bold">医師紹介キャンペーン</p>
        <p className="mt-8 text-l font-bold">ご紹介特典</p>
        <div className="flex flex-col items-center lg:flex-row lg:space-x-4 ">
          <div className="mt-4 h-[76px] w-[327px] shadow-low lg:w-[290px]">
            <p className="my-2 text-center text-md font-bold">ご紹介者様</p>
            <div className="flex items-center justify-center space-x-2">
              <img src="icons/seminar_ticket.svg" alt="" />
              <p className="text-md">E-カンファ視聴チケット</p>
            </div>
          </div>
          <div className="mt-4 h-[76px] w-[327px] shadow-low lg:w-[290px] ">
            <p className="my-2 text-center text-md font-bold">ご入会いただいた方</p>
            <div className="flex items-center justify-center space-x-2">
              <img src="icons/point_invitation.svg" alt="" />
              <p className="text-md">Mediiのポイント(1000pt)</p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-l font-bold">紹介ページURL</p>
        <div className="flex flex-col lg:flex-row">
          <div className="flex border-0 border-border-divider pr-6 lg:flex-col lg:border-r">
            <div className="mx-auto h-[120px] w-[120px]">
              <img src={qrCodeUrl} alt="" />
            </div>
            <div className="my-auto w-[140px] lg:mx-auto">
              <SecondaryButton onClick={downloadQrCode} className="whitespace-nowrap">
                QRコードを保存
              </SecondaryButton>
            </div>
          </div>
          <div className="my-auto lg:ml-3">
            <p className="mb-1 ml-2 text-md lg:mb-0">またはURLを共有</p>
            <div className="flex items-center space-x-1">
              <TextField className="min-w-0 flex-shrink lg:w-[260px]" value={invitationUrl} />
              <SecondaryButton onClick={clipboard} className="whitespace-nowrap">
                リンクをコピー
              </SecondaryButton>
            </div>
          </div>
        </div>
        <p className="mt-8 text-l font-bold">ご紹介の手順</p>
        <HowToInvitation
          number={1}
          text={'紹介ページURLより”あなた専用の紹介ページ”を取得し、お知り合いの医師・医学生に送る'}
        />
        <HowToInvitation
          number={2}
          text={'お知り合いの医師・医学生は、紹介ページにアクセスし、紹介特典とE-コンサルについての情報を受け取る'}
        />
        <HowToInvitation
          number={3}
          text={'あなた専用の紹介ページから会員登録いただくと、あなたと新規会員へ紹介特典をプレゼント'}
        />
      </div>

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
