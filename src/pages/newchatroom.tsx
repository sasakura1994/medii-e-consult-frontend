import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomInput } from '@/features/chat/newChatRoom/NewChatRoomInput';
import { NewChatRoomConfirmation } from '@/features/chat/newChatRoom/NewChatRoomConfirmation';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useNmo } from '@/hooks/alliance/useNmo';
import { Modal } from '@/components/Parts/Modal/Modal';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Link from 'next/link';

const NewChatRoomPage: NextPageWithLayout = () => {
  const newChatRoom = useNewChatRoom();
  useEventLog({ name: '/NewChatRoom' });
  const { mode } = newChatRoom;
  const { isNeedToInputProfile } = useNmo();

  return (
    <>
      <Card className="px-8 py-4 lg:px-0">
        {mode === 'input' ? <NewChatRoomInput {...newChatRoom} /> : <NewChatRoomConfirmation {...newChatRoom} />}
      </Card>
      {isNeedToInputProfile && (
        <Modal className="w-lg-breakpoint px-8 py-20 lg:px-20" data-testid="nmo-modal">
          <p>
            すべてのサービスをご利用いただくには、追加のプロフィール入力が必要です。
            以下のボタンからプロフィールの入力をお願いいたします。
          </p>
          <div className="mt-10">
            <Link href={`/nmo/input-profile?redirect=${encodeURIComponent('/newchatroom')}`}>
              <a>
                <PrimaryButton size="large" className="mx-auto">
                  プロフィール入力
                </PrimaryButton>
              </a>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

NewChatRoomPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default NewChatRoomPage;
