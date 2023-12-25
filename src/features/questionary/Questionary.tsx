import { useToken } from '@/hooks/authentication/useToken';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HubspotForm from 'react-hubspot-form';

type Query = {
  id: string;
};

export const Questionary = () => {
  const router = useRouter();
  const { accountId } = useToken();
  const { email } = useProfile();
  const { id: fromId } = router.query as Query;
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (!email || !accountId || !isFormReady) return;

    const iframeElement = window.document.getElementsByTagName('iframe')[0];
    if (!iframeElement.contentDocument) return;

    // accountidとemailを設定する（この要素名でないとアンケートフォームに埋め込むことはできない）
    const accountIdInput = iframeElement.contentDocument.querySelector('input[name="accountid"].hs-input');
    const chatRoomIdInput = iframeElement.contentDocument.querySelector('input[name="email"].hs-input');

    if (accountIdInput && chatRoomIdInput) {
      accountIdInput.setAttribute('value', accountId);
      chatRoomIdInput.setAttribute('value', email.mail_address);
    }
  }, [accountId, isFormReady, email]);

  if (!process.env.HUBSPOT_PORTAL_ID || !fromId) {
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
              router.replace('/newchatroom');
            } else {
              router.replace('/seminar/archives');
            }
          }, 5000);
        }}
        onReady={(form: Element) => {
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
