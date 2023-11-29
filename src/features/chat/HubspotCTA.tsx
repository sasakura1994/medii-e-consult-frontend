import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import HubspotForm from 'react-hubspot-form';

type Props = {
  accountId: string;
  chatRoomIdStr: string;
};
type Query = {
  chat_room_id?: string;
};

export const HubspotCTA = (props: Props) => {
  const { accountId } = props;
  const router = useRouter();
  const { chat_room_id } = router.query as Query;

  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const iframeElement = window.document.getElementsByTagName('iframe');
          if (iframeElement[0]) {
            const accountIdInput = iframeElement[0].contentDocument?.getElementById(
              `accountid-${process.env.HUBSPOT_FORM_ID}`
            );
            const chatRoomIdInput = iframeElement[0].contentDocument?.getElementById(
              `chatroom_id-${process.env.HUBSPOT_FORM_ID}`
            );
            if (accountIdInput && chatRoomIdInput && accountId && chat_room_id) {
              console.log('chat_room_id', chat_room_id);

              accountIdInput.setAttribute('disabled', 'disabled');
              accountIdInput.setAttribute('value', accountId);
              chatRoomIdInput.setAttribute('disabled', 'disabled');
              chatRoomIdInput.setAttribute('value', chat_room_id);
              observer.disconnect();
            }
          }
        }
      }
    });

    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document.body, config);

    return () => observer.disconnect();
  }, [accountId, chat_room_id]);

  return (
    <div className="m-4">
      <HubspotForm portalId={process.env.HUBSPOT_PORTAL_ID} formId={process.env.HUBSPOT_FORM_ID} />
    </div>
  );
};
