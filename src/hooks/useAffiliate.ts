import React from 'react';

export type UseAffiliateType = {
  loading: boolean;
  qrCodeUrl: string;
  clipboardUrl: string;
  errorMessage: string;
  fetchQrCode: (accountId: string) => void;
};

type AffiliateUrlsType = {
  qrCode: string;
  clipboard: string;
};

export const useAffiliate = (): UseAffiliateType => {
  const [loading, setLoading] = React.useState(false);
  const [qrCodeUrl, setQrcodeUrl] = React.useState('');
  const [clipboardUrl, setClipboardUrl] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const getAffiliateUrls = (accountId: string): AffiliateUrlsType => {
    const url = `${process.env.WEB_SERVER_URL}/registration?p=${accountId}`;
    const qrCodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}`;
    return {
      qrCode: qrCodeUrl,
      clipboard: url,
    };
  };

  const fetchQrCode = async (accountId: string) => {
    setLoading(true);
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
      setLoading(false);
    } catch (e: unknown) {
      const error = e as Error;
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return {
    loading,
    qrCodeUrl,
    clipboardUrl,
    errorMessage,
    fetchQrCode,
  };
};
