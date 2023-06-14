import { useToken } from '@/hooks/authentication/useToken';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const qrCodeFileName = 'Medii医師紹介QRコード.png';

export type AffiliateUrlsType = {
  qrCode: string;
  clipboard: string;
};

export type UseAffiliateType = {
  isError: boolean;
  qrCodeUrl: string;
  downloadQrCode: () => void;
  clipboard: () => void;
  invitationUrl: string;
};

export const useAffiliate = (): UseAffiliateType => {
  const { accountId } = useToken();
  const [isError, setIsError] = useState(false);
  const [qrCodeUrl, setQrcodeUrl] = useState('');
  const [invitationUrl, setInvitationUrl] = useState('');

  /**
   * QR コードの取得
   */
  const fetchQrCode = useCallback(async () => {
    setIsError(false);

    try {
      if (accountId) {
        const urls = getAffiliateUrls(accountId);
        const response = await fetch(urls.qrCode, {
          method: 'GET',
          headers: {},
        });

        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer]);
        const url = window.URL.createObjectURL(blob);
        setQrcodeUrl(url);
        setInvitationUrl(urls.clipboard);
      }
    } catch (e) {
      setIsError(true);
      const error = e as Error;
      console.log('*** error ***', error.message);
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
    const url = `${process.env.WEB_SERVER_URL}/registration?p=${accountId}`;
    const qrCodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}`;
    return {
      qrCode: qrCodeUrl,
      clipboard: url,
    };
  };

  /**
   * QR コードのダウンロード
   */
  const downloadQrCode = React.useCallback(() => {
    if (!qrCodeUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.setAttribute('download', qrCodeFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [qrCodeUrl]);

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
    qrCodeUrl,
    downloadQrCode,
    clipboard,
    invitationUrl,
  };
};
