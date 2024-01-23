import { useFetchEmail } from '@/hooks/api/account/useFetchEmail';
import React, { useCallback, useEffect, useState } from 'react';
import HubspotForm from 'react-hubspot-form';

type Props = {
  formId: string;
  accountId: string;
  chatRoomId: string;
  onSubmit?: () => void;
};
export const HubspotCTA = (props: Props) => {
  const { formId, accountId, chatRoomId, onSubmit } = props;
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

  const handleSubmit = useCallback(
    async (event: MessageEvent) => {
      if (onSubmit && event.data?.type === 'hsFormCallback' && event.data?.eventName === 'onFormSubmitted') {
        onSubmit();
      }
    },
    [onSubmit]
  );

  useEffect(() => {
    window.addEventListener('message', handleSubmit);
    return () => {
      window.removeEventListener('message', handleSubmit);
    };
  }, [handleSubmit, onSubmit]);

  if (process.env.HUBSPOT_PORTAL_ID) {
    return (
      <div className="m-4">
        <HubspotForm
          portalId={process.env.HUBSPOT_PORTAL_ID}
          formId={formId}
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
