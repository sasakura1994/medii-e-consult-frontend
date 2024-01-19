import { useFetchEmail } from '@/hooks/api/account/useFetchEmail';
import React, { useEffect, useState } from 'react';
import HubspotForm from 'react-hubspot-form';

type Props = {
  accountId: string;
  chatRoomId: string;
};
export const HubspotCTA = (props: Props) => {
  const { accountId, chatRoomId } = props;
  const [isFormReady, setIsFormReady] = useState(false);
  const { email } = useFetchEmail();

  useEffect(() => {
    if (!chatRoomId || !isFormReady) return;

    const iframeElement = window.document.getElementsByTagName('iframe')[0];
    if (!iframeElement) return;

    const accountIdInput = iframeElement.contentDocument?.querySelector('input[name="accountid"].hs-input');
    const chatRoomIdInput = iframeElement.contentDocument?.querySelector('input[name="chatroom_id"].hs-input');

    if (accountIdInput && chatRoomIdInput) {
      accountIdInput.setAttribute('value', accountId);
      chatRoomIdInput.setAttribute('value', chatRoomId);
    }
  }, [accountId, isFormReady, chatRoomId]);

  useEffect(() => {
    if (!email || !isFormReady) {
      return;
    }

    const iframeElement = window.document.getElementsByTagName('iframe')[0];
    if (!iframeElement) return;

    const emailInput = iframeElement.contentDocument?.querySelector('input[name="email"].hs-input');
    if (!emailInput) {
      return;
    }

    emailInput.setAttribute('value', email.mail_address);
  }, [email, isFormReady]);

  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_ID) {
    return (
      <div className="m-4">
        <HubspotForm
          portalId={process.env.HUBSPOT_PORTAL_ID}
          formId={process.env.HUBSPOT_FORM_ID}
          onFormReady={(form: Element) => {
            if (form) {
              setTimeout(() => {
                setIsFormReady(true);
              }, 1000);
            }
          }}
        />
      </div>
    );
  }
  return <></>;
};
