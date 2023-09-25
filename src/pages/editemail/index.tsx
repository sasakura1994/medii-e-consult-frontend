import React from 'react';
import Completed from './completed';
import Editing from './editing';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { emailSubmitState } from '@/globalStates/editSubmitState';
import { useRecoilState } from 'recoil';

const EditEmailPage = () => {
  const [editEmailStatus] = useRecoilState(emailSubmitState);

  return (
    <div className="flex h-[100vh] bg-bg">
      <div className="m-auto mt-9 w-[662px] rounded border border-[#ddd] bg-white py-[60px] text-left">
        {!editEmailStatus ? <Editing /> : <Completed />}
      </div>
    </div>
  );
};

EditEmailPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};

export default EditEmailPage;
