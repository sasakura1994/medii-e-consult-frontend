import Link from 'next/link';
import React from 'react';

const Completed = () => {
  return (
    <div className="text-center text-5">
      <p>更新が完了しました。再度ログインしてください。</p>
      <br />
      <p className="underline decoration-1">
        <Link href="/login" data-label="backToLoginLink">
          ログイン
        </Link>
      </p>
    </div>
  );
};

export default Completed;
