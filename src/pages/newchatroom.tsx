import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomInput } from '@/features/chat/newChatRoom/NewChatRoomInput';
import { NewChatRoomConfirmation } from '@/features/chat/newChatRoom/NewChatRoomConfirmation';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

const NewChatRoomPage: NextPageWithLayout = () => {
  const newChatRoom = useNewChatRoom();
  useEventLog({ name: '/NewChatRoom' });
  const { mode } = newChatRoom;

  return (
    <Card className="px-8 py-4 lg:px-0">
      {mode === 'input' ? (
        <NewChatRoomInput {...newChatRoom} />
      ) : (
        <NewChatRoomConfirmation {...newChatRoom} />
      )}
    </Card>
  );
};

NewChatRoomPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default NewChatRoomPage;
