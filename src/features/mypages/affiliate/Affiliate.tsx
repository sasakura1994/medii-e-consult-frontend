import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useAffiliate } from './useAffiliate';
import SecondaryButton from '@/components/Button/SecondaryButton';
import TextField from '@/components/TextField/TextField';
import { HowToInvitation } from './HowToInvitation';

export const Affiliate: React.FC = () => {
  const { isError, qrCodeUrl, downloadQrCode, clipboard, invitationUrl } = useAffiliate();

  // TODO: [紹介キャンペーンの年内終了]2023/12/29 00:00まで表示する
  const isFinishedCampaign = useMemo(() => {
    const today = new Date();
    const end = new Date('2023/12/29 00:00:00');
    if (today > end) {
      return true;
    }
    return false;
  }, []);

  return (
    <>
      <div className={`${isFinishedCampaign ? '' : 'mt-10'} px-6 py-10`}>
        {!isFinishedCampaign && (
          <>
            <p className="text-left text-xxl font-bold">医師紹介キャンペーン</p>
            <p className="mt-4 text-left text-l font-bold">2023年12月28日までに登録いただいた方が対象です</p>
            <p className="mt-8 text-l font-bold">ご紹介特典</p>
            <div className="mt-4 grid auto-cols-max grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="p-2 shadow-low">
                <p className="mb-1 text-center font-bold">ご紹介者様</p>
                <div className="flex items-start justify-center gap-1">
                  <img src="icons/point_invitation.svg" alt="" width="21" height="21" />
                  <div>
                    <div>最大4,500円相当のMediiポイント</div>
                    <ul className="mt-1 list-disc pl-6 text-xs text-text-secondary">
                      <li>紹介された人の新規登録で 3,000pt</li>
                      <li>紹介された人の初回コンサルで 1,500pt</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-2 shadow-low">
                <p className="mb-1 text-center font-bold">ご入会いただいた方</p>
                <div className="flex items-start justify-center gap-1">
                  <img src="icons/point_invitation.svg" alt="" width="21" height="21" />
                  <div>
                    <div>最大4,500円相当のMediiポイント</div>
                    <ul className="mt-1 list-disc pl-6 text-xs text-text-secondary">
                      <li>新規登録で 3,000pt</li>
                      <li>初回アンケートへのご回答 500pt</li>
                      <li>初回コンサル 1,000pt</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-text-secondary">
              ご紹介からポイント付与完了までの期間に退会済みまたは利用制限となった方はポイント付与の対象外となる場合があります。
              不正行為等によるポイント取得を確認した場合、ポイント付与の対象外とし、付与されたポイントは取消しとなる場合があります。
              招待した方および招待された方がもらえるポイントは、予告なく変更される場合があります。
              医師をご紹介いただいた場合のみ対象となります。医学生は対象外となりますのでご了承ください。(医学生が医師をご紹介いただいた場合は対象となります。)
              <br />
              2023年12月28日までにご紹介いただいた医師がプロフィール登録を完了していることが条件となります。期日以降に登録いただいたり、
              プロフィール登録が完了していない、プロフィールが正しくないなどの場合はポイント付与の対象外となります。
              なお、ポイント付与までに2-3営業日かかることがございます。
            </p>
          </>
        )}
        <p className={`${isFinishedCampaign ? 'mt-4' : 'mt-8'} text-l font-bold`}>紹介ページURL</p>
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
          text={'紹介ページURLより”あなた専用の紹介ページ”を取得し、お知り合いの医師に送る'}
        />
        <HowToInvitation
          number={2}
          text={
            isFinishedCampaign
              ? 'お知り合いの医師は、紹介ページにアクセスし、E-コンサルについての情報を受け取る'
              : 'お知り合いの医師は、紹介ページにアクセスし、紹介特典とE-コンサルについての情報を受け取る'
          }
        />
        {!isFinishedCampaign && (
          <HowToInvitation
            number={3}
            text={'あなた専用の紹介ページから会員登録いただくと、あなたと新規会員へ紹介特典をプレゼント'}
          />
        )}
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
