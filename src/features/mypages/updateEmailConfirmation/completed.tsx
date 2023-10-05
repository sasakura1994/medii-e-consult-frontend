import Link from 'next/link';
import React from 'react';

const Completed = () => {
  return (
    <div className="text-center text-5">
      <p>更新が完了しました。再度ログインしてください。</p>
      <br />
      <Link href="/login" data-label="backToLoginLink">
        <a className="text-[#551a8b] underline decoration-1">ログイン</a>
      </Link>
    </div>
  );
};

export default Completed;
