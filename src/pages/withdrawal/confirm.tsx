import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';

const WithdrawalConfirmPage: NextPageWithLayout = () => {
  return (
    <div className="mx-auto mt-8 max-w-[1024px]">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbLink href="/editprofile">マイページ</BreadcrumbLink>
        <BreadcrumbItem>アカウント削除</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default WithdrawalConfirmPage;
