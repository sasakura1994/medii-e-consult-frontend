import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type DocumentInputCompletedProps = {
  isInvited: boolean;
};

const DocumentInputCompleted: React.FC<DocumentInputCompletedProps> = ({
  isInvited,
}) => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // TODO: ここではTopに遷移しているが、実際にはTop以外の画面に遷移する可能性もある
      router.push('/Top');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="border-1 rounded-xs mt-10 -mb-10 w-full border bg-white pb-5 lg:mb-0 lg:px-16 lg:pb-6">
      <div className="mt-9 text-center">
        <div className="mb-6 text-xl font-bold text-primary">
          Medii利用の準備が整いました
        </div>
        <div className="mx-auto mb-12 flex max-w-xs items-center justify-between">
          <img src="/icons/doctor2.svg" className="h-auto w-24" alt="doctor2" />
          <img src="/icons/medii.svg" className="h-auto w-16" alt="medii" />
          <img src="/icons/doctor3.svg" className="h-auto w-24" alt="doctor3" />
        </div>
        {!isInvited && (
          <div className="mb-8">
            現在、ご提出いただいた資料を確認中です。
            <br />
            恐れ入りますが確認完了までしばらくお待ち下さい。
            <br />
            確認完了次第、メールにてご連絡いたします。
          </div>
        )}
        <button
          type="button"
          className="rounded-full bg-primary py-2 px-10 font-bold text-white shadow-lg transition-all duration-300"
          onClick={() => {
            router.push('/Top');
          }}
        >
          {isInvited ? 'さっそく使ってみる' : 'Mediiへ'}
        </button>
        <div className="mt-4 text-sm text-gray-500">
          自動で画面が切り替わらない場合は、上記ボタンをクリックしてください
        </div>
      </div>
    </div>
  );
};

export default DocumentInputCompleted;
