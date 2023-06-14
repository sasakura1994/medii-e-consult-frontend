import React from 'react';

const TextField = () => {
  return (
    <>
      <label className="text-md text-text-primary">ラベル</label>
      <input
        className="border border-border-field"
        placeholder="プレースホルダー"
      ></input>
      <p className="text-medii-sm text-text-secondary">サポートテキスト</p>
    </>
  );
};

export default TextField;
