import { useToken } from '@/hooks/authentication/useToken';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import QRCode from 'qrcode';
import { useExistCampaign } from '@/hooks/api/campaign/useExistCampaign';
import { dateFormat } from '@/libs/date';

const qrCodeFileName = 'Medii医師紹介QRコード.png';

export type AffiliateUrlsType = {
  clipboard: string;
};

export type UseAffiliateType = {
  isCampaign: boolean;
  downloadQrCode: () => void;
  clipboard: () => void;
  invitationUrl: string;
  period?: string;
};

export const useAffiliate = (): UseAffiliateType => {
  const { accountId } = useToken();
  const { isCampaign, data: campaign, isLoading: isLoadingCampaign } = useExistCampaign();

  const period = useMemo(() => {
    if (!campaign) {
      return undefined;
    }

    const startAt = campaign.start_at ? dateFormat(campaign.start_at, 'YYYY年M月D日') : '';
    const endAt = campaign.end_at ? dateFormat(campaign.end_at, 'YYYY年M月D日') : '';
    return `${startAt}～${endAt}`;
  }, [campaign]);

  const invitationUrl = useMemo(() => {
    if (isLoadingCampaign || !accountId) {
      return '';
    }
    return isCampaign
      ? `https://medii.jp/e-consult/invitation-cp?p=${accountId}`
      : `https://medii.jp/e-consult/invitation?p=${accountId}`;
  }, [accountId, isLoadingCampaign, isCampaign]);

  /**
   * QR コードのダウンロード
   */
  const downloadQrCode = React.useCallback(async () => {
    if (!invitationUrl) {
      return;
    }
    const qrCodeDataURL = await QRCode.toDataURL(invitationUrl);
    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.setAttribute('download', qrCodeFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [invitationUrl]);

  /**
   * 紹介用 URL のコピー
   */
  const clipboard = useCallback(async () => {
    if (!invitationUrl) {
      return;
    }
    await navigator.clipboard.writeText(invitationUrl);
    toast('紹介用URLをコピーしました');
  }, [invitationUrl]);

  return {
    isCampaign,
    downloadQrCode,
    clipboard,
    invitationUrl,
    period,
  };
};
