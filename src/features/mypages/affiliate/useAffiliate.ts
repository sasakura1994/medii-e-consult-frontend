import { useToken } from '@/hooks/authentication/useToken';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import QRCode from 'qrcode';

const qrCodeFileName = 'Medii医師紹介QRコード.png';

export type AffiliateUrlsType = {
  clipboard: string;
};

export type UseAffiliateType = {
  isError: boolean;
  downloadQrCode: () => void;
  clipboard: () => void;
  invitationUrl: string;
};

export const useAffiliate = (): UseAffiliateType => {
  const { accountId } = useToken();
  const [isError, setIsError] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState('');

  /**
   * QR コードの取得
   */
  const fetchQrCode = useCallback(async () => {
    setIsError(false);

    try {
      if (accountId) {
        const urls = getAffiliateUrls(accountId);
        setInvitationUrl(urls.clipboard);
      }
    } catch (e) {
      setIsError(true);
      const error = e as { message: string; response: { data: { message: string } } };
      console.log('*** error ***', error.response?.data?.message);
      toast('QRコードの取得に失敗しました');
    }
  }, [accountId]);

  useEffect(() => {
    fetchQrCode();
  }, [fetchQrCode]);

  /**
   * URL の取得
   */
  const getAffiliateUrls = (accountId: string): AffiliateUrlsType => {
    const url = `${process.env.INVITATION_URL}?p=${accountId}`;
    return {
      clipboard: url,
    };
  };

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
    isError,
    downloadQrCode,
    clipboard,
    invitationUrl,
  };
};
