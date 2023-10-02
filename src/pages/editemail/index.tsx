import React from 'react';
import Completed from './completed';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';

const EditEmailPage = () => {
  return (
        <Completed />
  );
};

EditEmailPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default EditEmailPage;
