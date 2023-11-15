import React from 'react';
import EditEmail from '../features/mypages/editEmail/EditEmail';
import { LegacyMyPageLayout } from '@/components/Layouts/LegacyMyPageLayout';
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
  return <LegacyMyPageLayout>{page}</LegacyMyPageLayout>;
};

export default EditEmailPage;
