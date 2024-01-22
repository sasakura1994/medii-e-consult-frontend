import React from 'react';
import { HubspotCTA } from '@/features/chat/HubspotCTA';
import { useToken } from '@/hooks/authentication/useToken';
import { useFollowUpQuestionary } from '@/features/chat/useFollowUpQuestionary';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

const ChatFollowUpQuestionary = () => {
  const { accountId } = useToken();

  const { answered, id } = useFollowUpQuestionary();

  if (answered === undefined) {
    return (
      <div className="flex justify-center p-10">
        <SpinnerBorder />
      </div>
    );
  }

  if (answered === true) {
    return <div className="px-2 py-10 text-center">回答済みです</div>;
  }

  return (
    <div className="mx-auto lg:w-[644px]">
      <HubspotCTA
        formId={process.env.HUBSPOT_FOLLOW_UP_FORM_ID ?? ''}
        accountId={accountId ?? ''}
        chatRoomId={id ?? ''}
      />
    </div>
  );
};

export default ChatFollowUpQuestionary;
