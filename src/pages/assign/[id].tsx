import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { Assign } from '@/features/chat/assign/Assign';
import { useAssign } from '@/features/chat/assign/useAssign';

const AssignPage: NextPageWithLayout = () => {
  const useAssignData = useAssign();
  const { chatRoom, images } = useAssignData;

  return (
    <>{chatRoom && <Assign chatRoom={chatRoom} images={images || []} />}</>
  );
};

export default AssignPage;

AssignPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
