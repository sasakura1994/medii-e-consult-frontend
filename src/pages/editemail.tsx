import React from 'react';
import EditEmail from '../features/mypages/editEmail/EditEmail';
import { useUpdateEmail } from '@/features/mypages/editEmail/useUpdateEmail';
import Completed from '@/features/mypages/editEmail/completed';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';

const EditEmailPage = () => {
  const updateEmail = useUpdateEmail();
  const { editEmailStatus, ...props } = updateEmail;

  return (
    <div className="flex h-screen">
      <div className="m-auto mt-9 w-[600px] py-[60px] text-left">
        {!editEmailStatus ? <EditEmail {...props} /> : <Completed />}
      </div>
    </div>
  );
};

EditEmailPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default EditEmailPage;
