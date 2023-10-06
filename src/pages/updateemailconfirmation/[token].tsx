import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import EditEmailConfirmation from '@/features/mypages/updateEmailConfirmation/EditEmailConfirmation';
import { useUpdateEmailConfirmation } from '@/features/mypages/updateEmailConfirmation/useUpdateEmailConfirmation';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

const UpdateEmailConfirmation = () => {
  const { isTokenExist, isSending, ...props } = useUpdateEmailConfirmation();

  return (
    <div className="flex h-screen bg-bg">
      <div className="m-auto mt-6 flex w-[644px] justify-center rounded border border-[#ddd] bg-white py-10">
        {isSending ? (
          <SpinnerBorder />
        ) : (
          <div>
            {isTokenExist ? (
              <EditEmailConfirmation {...props} />
            ) : (
              <div className="font-bold text-red-400">データが存在しません。</div>
            )}
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
