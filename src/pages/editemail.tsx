import React from 'react';
import EditEmail from '../features/mypages/editEmail/EditEmail';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { useUpdateEmail } from '@/features/mypages/editEmail/useUpdateEmail';
import Completed from '@/features/mypages/editEmail/completed';

const EditEmailPage = () => {
  const updateEmail = useUpdateEmail();
  const { editEmailStatus, ...props } = updateEmail;

  return (
    <div className="flex h-screen bg-bg">
      <div className="m-auto mt-9 w-[662px] rounded border border-[#ddd] bg-white py-[60px] text-left">
        {!editEmailStatus ? <EditEmail {...props} /> : <Completed />}
      </div>
    </div>
  );
};

EditEmailPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default EditEmailPage;
