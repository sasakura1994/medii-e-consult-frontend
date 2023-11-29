import React, { useEffect, useState } from 'react';
import HubspotForm from 'react-hubspot-form';

type Props = {
  accountId: string;
  chatRoomId: string;
};
export const HubspotCTA = (props: Props) => {
  const { accountId, chatRoomId } = props;
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (!chatRoomId || !isFormReady) return;

    const iframeElement = window.document.getElementsByTagName('iframe')[0];
    if (!iframeElement) return;

    const accountIdInput = iframeElement.contentDocument?.getElementById(`accountid-${process.env.HUBSPOT_FORM_ID}`);
    const chatRoomIdInput = iframeElement.contentDocument?.getElementById(`chatroom_id-${process.env.HUBSPOT_FORM_ID}`);

    if (accountIdInput && chatRoomIdInput) {
      accountIdInput.setAttribute('disabled', 'disabled');
      accountIdInput.setAttribute('value', accountId);
      chatRoomIdInput.setAttribute('disabled', 'disabled');
      chatRoomIdInput.setAttribute('value', chatRoomId);
    }
  }, [accountId, isFormReady, chatRoomId]);

  return (
    <div className="m-4">
      <HubspotForm
        portalId={process.env.HUBSPOT_PORTAL_ID}
        formId={process.env.HUBSPOT_FORM_ID}
        onReady={(form: Element) => {
          if (form) {
            setTimeout(() => {
              setIsFormReady(true);
            }, 1000);
          }
        }}
      />
    </div>
  );
};
