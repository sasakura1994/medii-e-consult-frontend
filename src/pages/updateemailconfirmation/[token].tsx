import React from 'react';
import EditEmailConfirmation from '@/features/mypages/updateEmailConfirmation/EditEmailConfirmation';
import { useUpdateEmailConfirmation } from '@/features/mypages/updateEmailConfirmation/useUpdateEmailConfirmation';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';

const UpdateEmailConfirmation = () => {
  const { isTokenExist, isSending, ...props } = useUpdateEmailConfirmation();

  return (
    <div className="flex h-screen">
      <div className="m-auto mt-6 flex w-[644px] justify-center py-10">
        {isSending ? (
          <SpinnerBorder />
        ) : (
          <div>
            {isTokenExist === true && <EditEmailConfirmation {...props} />}
            {isTokenExist === false && <div className="font-bold text-red-400">データが存在しません。</div>}
          </div>
        )}
      </div>
    </div>
  );
};

UpdateEmailConfirmation.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default UpdateEmailConfirmation;
