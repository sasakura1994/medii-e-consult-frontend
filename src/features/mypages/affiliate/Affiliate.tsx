import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useAffiliate } from './useAffiliate';
import SecondaryButton from '@/components/Button/SecondaryButton';
import TextField from '@/components/TextField/TextField';
import { HowToInvitation } from './HowToInvitation';
import { useProfile } from '@/hooks/useProfile';
import QRCode from 'qrcode.react';

export const Affiliate: React.FC = () => {
  const { campaign, isCampaign, downloadQrCode, clipboard, invitationUrl, period } = useAffiliate();
  const { profile } = useProfile();

  if (profile && profile.status === 'VERIFIED') {
    return (
      <>
        <div className={`${!isCampaign ? '' : 'mt-10'} px-6 py-10`}>
          {campaign && isCampaign && period && (
            <>
              <div className="mb-2 w-[340px]">
                <div className="flex items-center justify-center gap-[10px] rounded p-2 shadow-low">
                  <img src="icons/top-popup-back.svg" alt="" />
                  <p className="text-sm font-light">キャンペーン情報が表示されている方限定！</p>
                </div>
                <div className="flex px-4">
                  <img src="icons/top-popup-arrow.svg" className="drop-shadow-popup" alt="" />
                </div>
              </div>
              <p className="text-left text-xxl font-bold">医師紹介キャンペーン</p>
              <p className="mt-4 text-left text-l font-bold">対象：医師3年目以上の方(初期研修医を除く)</p>
              <p className="mt-2 text-left text-l font-bold">キャンペーン期間：{period}</p>
              <p className="mt-8 text-l font-bold">ご紹介特典</p>
              <div className="mt-4 grid auto-cols-max grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="p-2 shadow-low">
                  <p className="mb-1 text-center font-bold">ご紹介者様</p>
                  <div className="flex items-start justify-center gap-1">
                    <img src="icons/point_invitation.svg" alt="" width="21" height="21" />
                    <div>
                      <div>
                        最大{`${(campaign.parent_register_point || 0) + (campaign.parent_consult_point || 0)}`}
                        円相当のMediiポイント
                      </div>
                      <ul className="mt-1 list-disc pl-6 text-xs text-text-secondary">
                        <li>紹介いただいた医師が新規登録で {campaign.parent_register_point}pt</li>
                        {(campaign.parent_consult_point || 0) > 0 && (
                          <li>紹介いただいた医師が症例相談で {campaign.parent_consult_point}pt</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-2 shadow-low">
                  <p className="mb-1 text-center font-bold">新規ご登録者様</p>
                  <div className="flex items-start justify-center gap-1">
                    <img src="icons/point_invitation.svg" alt="" width="21" height="21" />
                    <div>
                      <div>
                        最大{`${(campaign.child_register_point || 0) + (campaign.child_consult_point || 0)}`}
                        円相当のMediiポイント
                      </div>
                      <ul className="mt-1 list-disc pl-6 text-xs text-text-secondary">
                        <li>新規登録で {campaign.child_register_point}pt</li>
                        {(campaign.child_consult_point || 0) > 0 && (
                          <li>症例相談で {campaign.child_consult_point}pt</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-text-secondary">
                <p>
                  【登録による進呈】 ご紹介いただいた医師が新規登録・医師資格の確認完了で
                  {campaign.parent_register_point}
                  ptを進呈いたします。 新規登録後、1営業日を目安にポイントを進呈いたします。
                </p>
                {(campaign.parent_consult_point || 0) > 0 ? (
                  <>
                    <p>
                      【症例相談による進呈】
                      ご紹介いただいた医師がキャンペーン期間中に現在診ている症例の相談と解決後のお礼で
                      {campaign.parent_consult_point || 0}ptを進呈いたします。 キャンペーン期間終了後に進呈いたします。
                    </p>
                    <p>
                      【注意事項】紹介された方が、過去E-コンサルにご登録されたことがある場合は対象外となります。
                      一般的な医学知識に関する相談など、現在診ている患者さんの症例ではないと判断された場合はポイント付与の対象外とさせていただくことがございます。
                      また、相談を投稿した後、回答者へのお礼がない、回答者への返答がない場合も対象外となります。
                    </p>
                    <p>
                      本キャンペーンにより進呈されるポイントは、紹介された方が新規会員登録された後と、キャンペーン終了後の2回に分けてに進呈予定です。
                      本キャンペーンは、予告なく終了する可能性があります。
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      【注意事項】ご紹介いただいた医師が、過去E-コンサルにご登録されたことがある場合は対象外となります。
                      本キャンペーンによるポイントは、ご紹介いただいた医師の会員登録が完了しましたら進呈予定です。本キャンペーンは、予告なく終了する可能性があります。
                    </p>
                  </>
                )}
              </div>
            </>
          )}
          <p className={`${!isCampaign ? 'mt-4' : 'mt-8'} text-l font-bold`}>紹介ページURL</p>
          <div className="flex flex-col lg:flex-row">
            <div className="flex border-0 border-border-divider pr-6 lg:flex-col lg:border-r">
              <div className="flex h-[120px] w-[120px] items-center justify-center lg:w-auto">
                {invitationUrl && <QRCode className="mx-auto" size={80} value={invitationUrl} />}
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
                <TextField className="min-w-0 flex-shrink lg:w-[260px]" value={invitationUrl} onChange={() => {}} />
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
              !isCampaign
                ? 'お知り合いの医師は、紹介ページにアクセスし、E-コンサルについての情報を受け取る'
                : 'お知り合いの医師は、紹介ページにアクセスし、紹介特典とE-コンサルについての情報を受け取る'
            }
          />
          {isCampaign && (
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
          toastClassName={() => 'bg-toast-success text-white text-center py-2 shadow-md'}
        />
      </>
    );
  }

  return (
    <>
      <p className="mt-8 text-l font-bold">医師確認完了後、専用の紹介URLが発行されます。</p>
    </>
  );
};
