import React, { useEffect } from 'react';
import { CompleteCard } from './CompletedCard';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useRouter } from 'next/router';

const DocumentInputCompleted: React.FC = () => {
  const { postEventLog } = useEventLog();
  const router = useRouter();

  useEffect(() => {
    postEventLog({ name: 'document-complete' });
  }, [postEventLog]);

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
      <div className="mx-auto px-8">
        <p className="mt-28 text-center text-xxl font-bold text-medii-blue-700">
          Mediiにようこそ
        </p>
        <p className="mt-6 text-md text-monotone-950 lg:text-center">
          Mediiでは医師の臨床疑問や不安を解消する3つのサービスをご利用いただけます。
          <br />
          Mediiのすべての機能は無料です。
        </p>
        <div className="mt-10 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <CompleteCard
            title="専門医にコンサル"
            label="完全無料・匿名"
            imageSrc="/images/document/consult.svg"
            description="臨床疑問をエキスパートの医師とチャット形式で相談できます。相談内容に適した医師をMediiがマッチングします。"
            buttonSolid="専門医に相談"
            linkSolid="/Chat"
            logSolid="click-chat"
            buttonOutline="使い方を見る"
            linkOutline="/top?tutorial=true"
            logOutline="click-tutorial"
          />
          <CompleteCard
            title="E-カンファ"
            label="視聴チケット1枚プレゼント"
            imageSrc="/images/document/conference.svg"
            description="専門医の先生をお招きして、各診療科・症例の知見を広く提供するオンラインセミナーを実施しています。"
            buttonOutline="セミナーを見る"
            linkOutline="/seminar"
            logOutline="click-seminar"
          />
          <CompleteCard
            title="症例バンク"
            imageSrc="/images/document/bank.svg"
            description="論文・ガイドラインだけではわからない、臨床経験から蓄積された知見をスライド形式で閲覧できます。"
            buttonOutline="症例スライドを見る"
            linkOutline={process.env.CASE_BANK_URL ?? ''}
            logOutline="click-case-bank"
          />
        </div>
        <div
          onClick={async () => {
            await postEventLog({ name: 'click-top' });
            router.push('/top');
          }}
        >
          <div className="mt-16 mb-4 flex cursor-pointer items-center justify-center space-x-1">
            <p className="text-md text-monotone-600">トップページに移動する</p>
            <img
              className="mt-0.5 text-monotone-600"
              src="icons/arrow_right_short.svg"
              alt="arrow_right_short"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentInputCompleted;
