import React from 'react';
import { toast } from 'react-toastify';

const qrCodeFileName = 'Medii医師紹介QRコード.png';

export type AffiliateUrlsType = {
  qrCode: string;
  clipboard: string;
};

export type UseAffiliateType = {
  isLoading: boolean;
  isError: boolean;
  qrCodeUrl: string;
  downloadQrCode: () => void;
  clipboard: () => void;
};

export const useAffiliate = (accountId: string): UseAffiliateType => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [qrCodeUrl, setQrcodeUrl] = React.useState('');
  const [clipboardUrl, setClipboardUrl] = React.useState('');

  React.useEffect(() => {
    fetchQrCode(accountId);
  }, []);

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
   * QR コードの取得
   */
  const fetchQrCode = async (accountId: string) => {
    setIsError(false);
    setIsLoading(true);

    const urls = getAffiliateUrls(accountId);

    try {
      const response = await fetch(urls.qrCode, {
        method: 'GET',
        headers: {},
      });

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      setQrcodeUrl(url);
      setClipboardUrl(urls.clipboard);
      setIsLoading(false);
    } catch (e: unknown) {
      const error = e as Error;
      console.log('*** error ***', error.message);
      setIsLoading(false);
      setIsError(true);
      toast('QRコードの取得に失敗しました');
    }
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
  const clipboard = React.useCallback(async () => {
    if (!clipboardUrl) {
      return;
    }
    await navigator.clipboard.writeText(clipboardUrl);
    toast('紹介用URLをコピーしました');
  }, [clipboardUrl]);

  return {
    isLoading,
    isError,
    qrCodeUrl,
    downloadQrCode,
    clipboard,
  };
};
