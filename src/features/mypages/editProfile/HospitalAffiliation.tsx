import React from 'react';
import { Label } from '@/components/Parts/Form/Label';
import { TextField } from '@/components/Parts/Form/TextField';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { Radio } from '@/components/Parts/Form/Radio';

/*
  勤務先病院名
  - `/api/hospital/hospital_by_id?hospital_id=${this.formData.hospital_id}` にリクエスト
    {
        "uid": 16448,
        "hospital_id": "HS11-21-0206-09",
        "hospital_guid": "a6b4fa9e-1b22-4895-96e0-3a05d3da433e",
        "hospital_name": "医療法人社団 武蔵野会 ＴＭＧサテライトクリニック朝霞台",
        "medical_institution_number": "21,0206,9",
        "internal_chat_enable": 0,
        "assignable": 0,
        "prefecture_code": "11",
        "zip_code": "351-0021",
        "address": "朝霞市西弁財１丁目８番２１号",
        "tel": "048-452-7700",
        "bed_count": 0,
        "hospital_group": null,
        "created_date": "2021-12-06T07:32:06",
        "updated_date": "2021-12-06T07:32:06"
    }

  - hospital_id === '' => 直接入力
  - hospital_id => 病院データ
*/

export const HospitalAffiliation: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 所属病院</h3>

      <div className="mb-4">
        <SelectBox
          name="prefecture_code"
          disabled={true}
          id="prefecture_code"
          className="!w-72"
          label="勤務先病院の所在地"
          required={true}
          options={[]}
        />
      </div>

      <div className="mb-4">
        <Label label="現在の勤務先病院名" required={true} id="hospital-data" />
        <Radio
          name="select_hospital"
          id="hospital-data"
          label="病院データから選択"
        />
        <SelectBox
          name="hospital_name"
          disabled={true}
          id="hospital_name"
          className="mt-1"
          options={[]}
        />
      </div>

      <div className="mb-4">
        <Radio name="select_hospital" id="direct-hospital" label="直接入力" />
        <TextField name="hospital_name" id="direct-hospital" className="mt-1" />
      </div>
    </div>
  );
};
