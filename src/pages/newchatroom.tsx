import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomInput } from '@/features/chat/newChatRoom/NewChatRoomInput';
import { NewChatRoomConfirmation } from '@/features/chat/newChatRoom/NewChatRoomConfirmation';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { ImcompleteProfileModal } from '@/components/Parts/Modal/ImcompleteProfileModal';
import { DocumentConfirmingMessage } from '@/components/Doctor/DocumentConfirmingMessage';
import { Header } from '@/components/Layouts/Header/Header';
import { FooterSpMenu } from '@/components/Layouts/Footer/FooterSpMenu';
import { useProfile } from '@/hooks/useProfile';
import { NeedToInputProfileModal } from '@/components/Parts/Modal/NeedToInputProfileModal';
import { ConfirmModal } from '@/components/Parts/Modal/ConfirmModal';

const NewChatRoomPage: NextPageWithLayout = () => {
  const newChatRoom = useNewChatRoom();
  useEventLog({ name: '/NewChatRoom' });
  const { mode, isDraftConfirming, isNeedToInputProfileModalShown, applyDraft, dontUseDraft, fillProfileRedirectUrl } =
    newChatRoom;
  const { profile } = useProfile();

  if (profile?.main_speciality === 'STUDENT') {
    return (
      <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">
        <Card className="px-8 py-4 text-center lg:px-0">
          <h1 className="mt-10 text-2xl leading-9">E-コンサル ルーム作成</h1>
          <div className="my-10" data-testid="for-student">
            医学生はコンサルを作成できません。
          </div>
        </Card>
      </main>
    );
  }

  return (
    <>
      {profile && profile.status.match(/^PENDING_/) && (
        <div>
          <DocumentConfirmingMessage>
            コンサル作成可能ですが、確認完了後に
            <br className="lg:hidden" />
            専門医の方々にコンサル依頼がされます。
          </DocumentConfirmingMessage>
        </div>
      )}
      <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">
        <Card className="px-8 py-4 lg:px-0">
          {mode === 'input' ? <NewChatRoomInput {...newChatRoom} /> : <NewChatRoomConfirmation {...newChatRoom} />}
        </Card>
        {isNeedToInputProfileModalShown && (
          <NeedToInputProfileModal
            href={`/fill-profile?redirect=${encodeURIComponent(fillProfileRedirectUrl)}`}
            dataTestId="need-to-fill-profile-modal"
          />
        )}
      </main>
      <ImcompleteProfileModal />
      {isDraftConfirming && (
        <ConfirmModal onOk={applyDraft} onCancel={dontUseDraft}>
          下書きに作成途中のコンサルがあります。作成途中のコンサルを続けて編集しますか？
        </ConfirmModal>
      )}
    </>
  );
};

NewChatRoomPage.getLayout = (page: React.ReactElement) => {
  return (
    <div className="h-full min-h-screen w-full bg-bg pb-16 lg:pb-0">
      <Header />
      {page}
      <FooterSpMenu />
    </div>
  );
};

export default NewChatRoomPage;
