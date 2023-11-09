import { Card } from '@/components/Parts/Card/Card';
import TextField from '@/components/TextField/TextField';

import React from 'react';

export const CreateGroup = () => {
  return (
    <main className="mx-auto pb-20 pt-10 lg:w-lg-breakpoint lg:pb-0">
      <Card className="px-20 py-4">
        <h1 className="mt-2 text-2xl leading-9">新規グループ作成</h1>
        <div className="mb-2 mt-6 flex text-left">
          <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
          <label htmlFor="specialty" className="text-left font-bold">
            エリア・施設名
          </label>
        </div>
        <TextField
          name="specialty"
          className="h-12 w-full"
          id="specialty"
          placeholder="例) 〇〇県、△△大学 などを入力"
        />
        <div className="mb-2 mt-4 flex text-left">
          <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
          <div className="text-left font-bold">グループの専門分野</div>
        </div>
        <p>※対処疾患または診療科目どちらかの入力は必須となります</p>
        <div className="text-left font-bold">診療科目</div>
        <div
          className="mt-2 rounded-md border border-text-field-frame px-4 py-3"
          style={{
            backgroundImage: "url('/icons/pull.svg')",
            backgroundPosition: 'right 1rem center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <p>複数専門領域合同(MDD)</p>
        </div>
        <label htmlFor="targetDisease" className="text-left font-bold">
          対象疾患
        </label>
        <TextField name="targetDisease" className="h-12 w-full" id="targetDisease" placeholder="例) 間質性肺炎" />
        <div className="mb-2 mt-4 flex text-left">
          <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
          <label htmlFor="groupName" className="text-left font-bold">
            グループ名
          </label>
        </div>
        <TextField name="groupName" className="h-12 w-full" id="groupName" placeholder="グループ名を入力" />
      </Card>
    </main>
  );
};
