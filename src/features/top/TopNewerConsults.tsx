import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { TopNewerConsult } from './TopNewerConsult';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { useFetchNewerConsults } from '@/hooks/api/chat/useFetchNewerConsults';
import Link from 'next/link';

export const TopNewerConsults = () => {
  const consults = useFetchNewerConsults();

  return (
    <>
      <div>
        <div className="bg-popup flex  items-center justify-center gap-[10px] rounded p-2  shadow-low ">
          <div>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.5053 2.74178C14.2373 1.74153 14.8309 0.713395 15.8311 0.445379C16.8314 0.177364 17.8595 0.770956 18.1275 1.7712L21.6863 15.0527C21.9543 16.0529 21.3607 17.0811 20.3605 17.3491C19.3602 17.6171 18.3321 17.0235 18.0641 16.0233L17.9949 15.7652L14.5742 2.99893L14.5053 2.74178ZM13.5322 3.93955C11.344 5.75446 8.53159 7.19649 5.61612 8.20392L7.63397 15.7346C7.82477 15.696 8.01462 15.6586 8.20345 15.6227C8.46068 15.5737 8.71794 15.5279 8.97521 15.4856C11.5199 15.0668 14.0668 14.9846 16.6179 15.4559L13.5322 3.93955ZM6.40976 15.9954L4.42599 8.59189C3.61335 8.84517 2.75121 9.09706 2.01876 9.30555C0.699539 9.68108 -0.0928674 11.0458 0.264873 12.3809L0.911921 14.7957C1.26974 16.1311 2.63905 16.916 3.96953 16.5761C4.05115 16.5553 4.13281 16.5346 4.21451 16.514C4.33318 16.4841 4.45193 16.4546 4.57076 16.4253C5.18173 16.2747 5.79477 16.1317 6.40976 15.9954ZM8.43734 16.8506C8.78898 16.7836 9.13976 16.7231 9.48973 16.6695L10.3414 18.6293C10.6812 19.3334 10.2973 20.1762 9.53891 20.3794L8.87656 20.5569C8.39607 20.6856 7.88631 20.517 7.57707 20.1305L5.18821 17.5612C5.87289 17.3956 6.56097 17.2394 7.25236 17.0911C7.65262 17.0052 8.04775 16.9248 8.43734 16.8506Z"
                fill="#0758E4"
              />
            </svg>
          </div>
          <p className='text-sm font-light'>毎日多くのコンサルがエキスパート医師により解決されています！</p>
        </div>
        <div className="flex px-4">
          <svg className='drop-shadow-popup' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            
            <path  d="M5 5L0 0L10 0L5 5Z" fill="white" />
          </svg>
        </div>
      </div>
      <div className="mt-2 rounded-lg bg-bg-secondary p-4">
        <p className="text-xxl font-bold text-text-primary">新着のE-コンサル</p>
        <StyledHiddenScrollBar className="flex space-x-2 overflow-x-scroll px-1 py-4">
          {consults?.map((consult, index) => <TopNewerConsult key={consult.consult_name + index} consult={consult} />)}
        </StyledHiddenScrollBar>
        <div className="flex justify-center">
          <Link href="/examplelist">
            <SecondaryButton size="large" className="w-full">
              解決済みのコンサル事例を見る
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </>
  );
};
