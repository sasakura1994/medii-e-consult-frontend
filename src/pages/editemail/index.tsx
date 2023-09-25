import React from 'react';
import Completed from './completed';
import EditEmail from '../../features/mypages/editEmail/EditEmail';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { useUpdateEmail } from '@/features/mypages/editEmail/useUpdateEmail';

const EditEmailPage = () => {
  const updateEmail = useUpdateEmail();
  const { editEmailStatus, ...props } = updateEmail;

  return (
    <div className="flex h-[100vh] bg-bg">
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
