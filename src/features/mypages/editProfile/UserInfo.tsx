import React from 'react';
import { TextField } from '@/components/Parts/Form/TextField';

export const UserInfo: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 利用者情報</h3>
      <div className="mb-4 flex gap-6">
        <TextField
          name="last_name"
          value="蜂谷"
          disabled={true}
          id="last_name"
          label="姓"
        />

        <TextField
          name="first_name"
          value="庸正"
          disabled={true}
          id="first_name"
          label="名"
        />
      </div>

      <div className="mb-4 flex gap-6">
        <TextField
          name="last_name_hira"
          value="はちや"
          disabled={true}
          id="last_name_hira"
          label="姓（かな）"
        />

        <TextField
          name="first_name_hira"
          value="つねまさ"
          disabled={true}
          id="first_name_hira"
          label="名（かな）"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="birthday_year" className="mb-1 block font-bold">
          生年月日（半角）
        </label>
        <div className="flex gap-6">
          <TextField
            name="birthday_year"
            value="1978"
            disabled={true}
            id="birthday_year"
            className="!w-40"
            subscript="年"
          />

          <TextField
            name="birthday_month"
            value="10"
            disabled={true}
            id="birthday_month"
            subscript="月"
          />

          <TextField
            name="birthday_day"
            value="7"
            disabled={true}
            id="birthday_day"
            subscript="月"
          />
        </div>
      </div>

      <div className="mb-4">
        <TextField
          name="graduated_university"
          id="graduated_university"
          label="卒業大学"
          placeholder="大学名"
          required={false}
        />
      </div>
    </div>
  );
};
