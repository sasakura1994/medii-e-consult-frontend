import React from 'react';

export const OtherChat = () => {
  return (
    <>
      <div className="ml-3 flex">
        <p className="text-sm">総合内科 31年目</p>
        <p className="ml-1 text-sm text-block-gray">6/16 14:43</p>
      </div>

      <p className="ml-3 mb-3 max-w-[670px] whitespace-pre-wrap rounded-lg bg-white p-2">
        {`お世話になっております。

⚫️⚫️の一般的な解釈/使用法についてご教示頂きたい点があり、質問させていただきました。
患者さんは⚫️年前に⚫️⚫️と診断され、現在は⚫️⚫️の治療を行っております。

現在症状として⚫️⚫️ 身体所見として⚫️⚫️ 検査所見として⚫️⚫️を認めています。
一般的に、⚫️⚫️という疾患/所見/治療は⚫️⚫️でしょうか？ 専門の先生にご意見をお伺いしたいと考えております。

どうぞよろしくお願いいたします。`}
      </p>
    </>
  );
};
