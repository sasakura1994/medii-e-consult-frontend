import { Card } from '@/components/Parts/Card/Card';

import React from 'react';
import { EditGroupDetail } from './EditGroupDetail';

export const CreateGroup = () => {
  return (
    <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">
      <Card className="px-4 py-4 lg:px-20">
        <p className="mt-2 text-center text-2xl font-bold">新規グループ作成</p>
        <EditGroupDetail />
      </Card>
    </main>
  );
};
