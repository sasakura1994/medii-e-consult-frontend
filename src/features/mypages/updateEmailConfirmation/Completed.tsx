import Link from 'next/link';
import React from 'react';
import { removeAuthToken } from '@/libs/cookie';

const Completed = () => {
  removeAuthToken();
  
  return (
    <div className="text-5 text-center">
      <p>更新が完了しました。再度ログインしてください。</p>
      <br />
      <Link href="/login" data-label="backToLoginLink" className="text-[#551a8b] underline decoration-1">
        ログイン
      </Link>
    </div>
  );
};

export default Completed;
