import React from 'react';
import { Label } from '@/components/Parts/Form/Label';
import { TextField } from '@/components/Parts/Form/TextField';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { Radio } from '@/components/Parts/Form/Radio';

const prefectures = [
  { id: 1, value: '', name: '都道府県' },
  { id: 1, value: '8', name: '茨城県' },
  { id: 1, value: '9', name: '栃木県' },
  { id: 1, value: '10', name: '群馬県' },
  { id: 1, value: '11', name: '埼玉県' },
  { id: 1, value: '12', name: '千葉県' },
  { id: 1, value: '13', name: '東京都' },
  { id: 1, value: '14', name: '神奈川県' },
];

export const HospitalAffiliation: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 所属病院</h3>

      <div className="mb-4">
        <SelectBox
          name="prefecture_code"
          id="prefecture_code"
          className="!w-72"
          label="勤務先病院の所在地"
          required={true}
        >
          {prefectures.map((prefecture) => (
            <option value={prefecture.value} key={prefecture.value}>
              {prefecture.name}
            </option>
          ))}
        </SelectBox>
      </div>

      <div className="mb-4">
        <Label label="現在の勤務先病院名" required={true} id="hospital-data" />
        <Radio
          name="select_hospital"
          id="hospital-data"
          label="病院データから選択"
        />
        <SelectBox name="hospital_name" id="hospital_name" className="mt-1">
          <option value=""></option>
        </SelectBox>
      </div>

      <div className="mb-4">
        <Radio name="select_hospital" id="direct-hospital" label="直接入力" />
        <TextField name="hospital_name" id="direct-hospital" className="mt-1" />
      </div>
    </div>
  );
};
