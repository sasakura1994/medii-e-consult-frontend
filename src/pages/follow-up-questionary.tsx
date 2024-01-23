import React from 'react';
import { HubspotCTA } from '@/features/chat/HubspotCTA';
import { useToken } from '@/hooks/authentication/useToken';
import { useFollowUpQuestionary } from '@/features/chat/useFollowUpQuestionary';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import SecondaryButton from '@/components/Button/SecondaryButton';
import Link from 'next/link';

const ChatFollowUpQuestionaryPage = () => {
  const { accountId } = useToken();
  const { answered, chatRoomId, onSubmit } = useFollowUpQuestionary();

  if (answered === undefined) {
    return (
      <div className="flex justify-center p-10" data-testid="loading">
        <SpinnerBorder />
      </div>
    );
  }

  // 回答済み（回答完了時も含む）
  if (answered === true) {
    return (
      <div className="px-2 py-10 text-center" data-testid="answered-message">
        <p>ご回答ありがとうございました。</p>
        <div className="mt-4 flex justify-center">
          <Link href="/top">
            <SecondaryButton>トップへ</SecondaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:w-[644px]" data-testid="form">
      <HubspotCTA
        formId={process.env.HUBSPOT_FOLLOW_UP_FORM_ID ?? ''}
        accountId={accountId ?? ''}
        chatRoomId={chatRoomId ?? ''}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChatFollowUpQuestionaryPage;
