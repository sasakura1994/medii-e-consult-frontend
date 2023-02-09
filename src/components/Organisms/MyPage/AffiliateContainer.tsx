import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useAffiliate } from '@/hooks/useAffiliate';
import { AffiliatePresenter } from './AffiliatePresenter';

const accountId = 'AC10-6226-9933-69'; // TODO: ログイン情報から取得する
const qrCodeFileName = 'Medii医師紹介QRコード.png';

export const AffiliateContainer: React.FC = () => {
  const { qrCodeUrl, clipboardUrl, fetchQrCode } = useAffiliate();

  React.useEffect(() => {
    fetchQrCode(accountId);
  }, []);

  const handleClickDownload = React.useCallback(() => {
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

  const handleClickClipboard = React.useCallback(async () => {
    if (!clipboardUrl) {
      return;
    }
    await navigator.clipboard.writeText(clipboardUrl);
    toast('紹介用URLをコピーしました');
  }, [clipboardUrl]);

  return (
    <>
      <AffiliatePresenter
        handleClickDownload={handleClickDownload}
        handleClickClipboard={handleClickClipboard}
      />
      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position={toast.POSITION.BOTTOM_CENTER}
        closeButton={false}
        toastClassName={() =>
          'bg-[#3f51b5] text-white text-center py-[8px] shadow-md'
        }
      />
    </>
  );
};
