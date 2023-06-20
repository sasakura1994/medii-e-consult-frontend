import React from 'react';
import Select from 'react-select';
import { Label } from '@/components/Parts/Form/Label';
import { TextField } from '@/components/Parts/Form/TextField';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { Radio } from '@/components/Parts/Form/Radio';
import { useEditProfile } from './useEditProfile';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';

type Props = ReturnType<typeof useEditProfile>;

export const HospitalAffiliation = (props: Props) => {
  const {
    hospitalInputType,
    hospitalOptions,
    hospitalSearchText,
    profile,
    selectedHospital,
    selectHospital,
    setHospitalInputType,
    setHospitalName,
    setHospitalSearchText,
    setProfile,
  } = props;
  const { prefectures } = usePrefecture();

  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 所属病院</h3>

      <div className="mb-4 w-72">
        <Label label="勤務先病院の所在地" required id="prefecture_code" />
        {prefectures && (
          <SelectBox
            name="prefecture_code"
            id="prefecture_code"
            value={profile.prefecture_code}
            onChange={(e) =>
              setProfile({ ...profile, prefecture_code: e.target.value })
            }
            required
          >
            {prefectures.map((prefecture) => (
              <option value={prefecture.code} key={prefecture.code}>
                {prefecture.name}
              </option>
            ))}
          </SelectBox>
        )}
      </div>

      <div className="mb-4">
        <Label label="現在の勤務先病院名" required={true} id="hospital-data" />
        <Radio
          name="hospital_input_type"
          id="hospital-data"
          label="病院データから選択"
          value="select"
          onChange={() => setHospitalInputType('select')}
          checked={hospitalInputType === 'select'}
        />
        {hospitalInputType === 'select' && (
          <div className="mt-1">
            <Select
              options={hospitalOptions}
              placeholder="病院名"
              noOptionsMessage={() => '病院名を入力してください。'}
              value={selectedHospital}
              onChange={(newValue) => selectHospital(newValue)}
              inputValue={hospitalSearchText}
              onInputChange={(value) => setHospitalSearchText(value)}
              styles={{
                control: (styles) => ({
                  ...styles,
                  paddingTop: '8px',
                  paddingBottom: '8px',
                }),
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <Radio
          name="select_hospital"
          id="direct-hospital"
          label="直接入力"
          value="free"
          onChange={() => setHospitalInputType('free')}
          checked={hospitalInputType === 'free'}
        />
        {hospitalInputType === 'free' && (
          <TextField
            name="hospital_input_type"
            id="direct-hospital"
            className="mt-1"
            value={profile.hospital_name}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};
