import { Card } from '@/components/Parts/Card/Card';

import React from 'react';
import { EditGroup } from './EditGroup';

export const CreateGroup = () => {
  return (
    <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">
      <Card className="px-20 py-4">
        <h1 className="mt-2 text-2xl leading-9">新規グループ作成</h1>
        <EditGroup />
      </Card>
    </main>
  );
};
