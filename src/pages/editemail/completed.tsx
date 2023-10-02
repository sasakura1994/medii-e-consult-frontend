import React from 'react';
import EditEmail from '../../features/mypages/editEmail/EditEmail';
import { useUpdateEmail } from '@/features/mypages/editEmail/useUpdateEmail';

const Completed = () => {
  const updateEmail = useUpdateEmail();
  const { editEmailStatus, ...props } = updateEmail;

  return (
    <div className="flex h-[100vh] bg-bg">
      <div className="m-auto mt-9 w-[662px] rounded border border-[#ddd] bg-white py-[60px] text-left">
      {!editEmailStatus ? <EditEmail {...props} /> : 
      <div className="px-[84px]">
        <h2 className="text-bold text-[24px]">
          まだアドレス変更は完了しておりません。
          <br />
          新しいメールアドレスにメールをお送りしましたので、メールに記載のURLより、アドレス変更を完了してください。
        </h2>
      </div>
    }
    </div>
  </div>
  );
};

export default Completed;
