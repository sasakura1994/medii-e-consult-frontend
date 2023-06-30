import React from 'react';

export const TopArticle = () => {
  return (
    <div className="flex cursor-pointer gap-2 border-b py-4">
      <div className="w-[200px]">
        <p className="text-md leading-[160%] text-text-primary line-clamp-3">
          若手医師が感じる経験不足をE-コンサルで補う。迷ったら、まず気軽に質問してみることが患者さんのためになる。
        </p>
        <p className="mt-1 text-sm font-light text-text-secondary">
          リウマチ膠原病内科医
        </p>
        <p className="text-sm font-light text-text-secondary">多田先生</p>
      </div>
      <div className="mr-2">
        <img
          className=" h-[60px] w-[88px]"
          src="images/top/tmp_494.png"
          alt=""
        />
      </div>
    </div>
  );
};
