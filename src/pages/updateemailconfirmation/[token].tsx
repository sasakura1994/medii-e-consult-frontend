import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import EditEmailConfirmation from '@/features/mypages/updateEmailConfirmation/EditEmailConfirmation';
import { useUpdateEmailConfirmation } from '@/features/mypages/updateEmailConfirmation/useUpdateEmailConfirmation';
import Completed from '@/features/mypages/updateEmailConfirmation/completed';

const UpdateEmailConfirmation = () => {
  const { emailConfirmStatus, ...others } = useUpdateEmailConfirmation();

  return (
    <div className="flex h-screen bg-bg">
      <div className="m-auto mt-6 flex w-[644px] justify-center rounded border border-[#ddd] bg-white py-10">
        {!emailConfirmStatus ? <EditEmailConfirmation {...others} /> : <Completed />}
      </div>
    </div>
  );
};

UpdateEmailConfirmation.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default UpdateEmailConfirmation;
