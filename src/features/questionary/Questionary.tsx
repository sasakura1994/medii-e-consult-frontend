import { InlineNotification } from '@/components/Notification/InlineNotification';
import React, { useMemo } from 'react';
import HubspotForm from 'react-hubspot-form';
import { useQuestionary } from './useQuestionary';

export const Questionary = () => {
  const { isAvailable, profile, router, fromId, setIsFormReady } = useQuestionary();

  const notification = useMemo(() => {
    if (profile && profile.status === 'CREATED') {
      return (
        <InlineNotification
          text="プロフィール情報が入力されておりません。アンケートにご回答いただくためにプロフィールのご入力をお願いいたします。
                会員登録いただくことで、アンケート謝礼ポイントの進呈および、ポイント交換が可能になります。"
          dataTestId="hubspot-questionary-notification-is-imperfect-profile"
          buttonText="プロフィール登録"
          buttonOnClick={() => router.push('/editprofile?registerMode=true')}
        />
      );
    } else if (profile && profile.status === 'PROFILE') {
      return (
        <InlineNotification
          text="医師確認資料が提出されておりません。アンケートにご回答いただくために医師確認資料のご提出をお願いいたします。会員登録いただくことで、アンケート謝礼ポイントの進呈および、ポイント交換が可能になります。"
          dataTestId="hubspot-questionary-notification-need-to-send-confirmation"
          buttonText="医師確認"
          buttonOnClick={() => router.push('/document')}
        />
      );
    }
  }, [profile, router]);

  if (!isAvailable) {
    if (notification) {
      return notification;
    }
    return <></>;
  }

  return (
    <div className="m-4 lg:mx-24">
      <HubspotForm
        portalId={process.env.HUBSPOT_PORTAL_ID}
        formId={fromId}
        onFormSubmitted={(
          _: HTMLFormElement,
          data: { redirectUrl: ''; submissionValues: { [key: string]: string | number | boolean | [] } }
        ) => {
          setTimeout(() => {
            // if_consultが存在し、かつ下記形式ではないとうまく動作しないので注意
            // if_consult: 1: 相談したい, 2: どちらともいえない, 3: 相談したくない
            if (data.submissionValues.if_consult === '1' || data.submissionValues.if_consult === '2') {
              router.replace({ pathname: '/newchatroom', query: { from: `questionary_${fromId}` } });
            } else {
              router.replace('/seminar/archives');
            }
          }, 5000);
        }}
        onFormReady={(form: Element) => {
          if (form) {
            setTimeout(() => {
              setIsFormReady(true);
            }, 500);
          }
        }}
      />
    </div>
  );
};
