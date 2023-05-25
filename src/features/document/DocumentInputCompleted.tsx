import { DefaultButton } from '@/components/Parts/Button/DefaultButton';
import { useRouter } from 'next/router';
import React from 'react';
import { Default } from 'react-toastify/dist/utils';

const DocumentInputCompleted: React.FC = () => {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
      <div className="mx-auto">
        <p className="mt-28 text-center text-2xl font-bold text-medii-blue">
          Mediiにようこそ
        </p>
        <p className="mt-6 text-center text-base">
          Mediiでは医師の臨床疑問や不安を解消する3つのサービスをご利用いただけます。{' '}
          <br />
          Mediiのすべての機能は無料です。
        </p>
        <div className="mt-10 flex space-x-2">
          <div
            className="mx-auto w-80 rounded-md bg-white p-6 shadow-md"
            style={{ height: '362px' }}
          >
            <div className="mx-auto flex">
              <p className="my-auto text-center text-lg font-bold">
                専門医にコンサル
              </p>
              <p
                className="my-auto mx-auto w-24 rounded-md bg-medii-blue-50
              px-1 py-1 text-center text-xs text-medii-blue"
              >
                完全無料・匿名
              </p>
            </div>
            <img
              className="mx-auto mt-4"
              src="/images/document/consult.svg"
              alt="consult"
            />
            <p className="mx-auto mt-4 text-left text-sm text-secondary">
              臨床疑問をエキスパートの医師とチャット形式で相談できます。相談内容に適した医師をMediiがマッチングします。
            </p>
            <div className="mt-4 flex space-x-2">
              <DefaultButton>専門医に相談</DefaultButton>
              <DefaultButton variant="outline">使い方を見る</DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentInputCompleted;
