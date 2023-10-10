import React from 'react';
import { useRouter } from 'next/router';
import { CompleteCard } from './CompletedCard';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

const Welcome = () => {
  const router = useRouter();
  const { postEventLog } = useEventLog();

  return (
    <>
      <div className="h-72 bg-medii-blue-100" />
      <div className="absolute left-0 right-0 top-0 flex items-center justify-center">
        <div className="mx-auto px-8">
          <p className="mt-28 text-center text-xxxl font-bold text-medii-blue-base">Mediiにようこそ</p>
          <p className="mt-6 text-md text-monotone-950 lg:text-center">
            Mediiでは医師の臨床疑問や不安を解消する2つのサービスをご利用いただけます。
            <br />
            Mediiのすべての機能は無料です。
          </p>
          <div className="mt-10 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <CompleteCard
              title="専門医にコンサル"
              label="完全無料・匿名"
              imageSrc="images/document/consult.svg"
              description="臨床疑問をエキスパートの医師とチャット形式で相談できます。相談内容に適した医師をMediiがマッチングします。"
              buttonSolid="専門医に相談"
              linkSolid="/newchatroom?from=welcome"
              logSolid="click-chat-in-welcome"
              buttonOutline="E-コンサルとは"
              linkOutline="/top?tutorial=true"
              logOutline="click-tutorial-in-welcome"
            />
            <CompleteCard
              title="E-カンファ"
              label="視聴チケット1枚プレゼント"
              imageSrc="images/document/conference.svg"
              description="専門医の先生をお招きして、各診療科・症例の知見を広く提供するオンラインセミナーを実施しています。"
              buttonOutline="E-カンファを見る"
              linkOutline="/seminar?fromwelcome=1"
              logOutline="click-seminar-in-welcome"
            />
          </div>
          <div
            onClick={async () => {
              await postEventLog({ name: 'click-top-in-welcome' });
              router.push('/top?fromwelcome=1');
            }}
          >
            <div className="mb-4 mt-16 flex cursor-pointer items-center justify-center space-x-1">
              <p className="text-md text-text-secondary">トップページに移動する</p>
              <img className="mt-0.5 text-text-secondary" src="icons/arrow_right_short.svg" alt="arrow_right_short" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
