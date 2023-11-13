import React from 'react';
import Select from 'react-select';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { TextField } from '@/components/Parts/Form/TextField';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { UseEditProfile } from './useEditProfile';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';
import { Heading } from '@/components/Parts/Text/Heading';
import { HospitalInputTypeContainer } from './HospitalInputTypeContainer';

export const HospitalAffiliation = (props: UseEditProfile) => {
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
    setProfileFields,
  } = props;
  const { prefectures } = usePrefecture();

  if (!profile) {
    return <></>;
  }

  return (
    <div>
      <Heading as="h2" className="mb-6">
        所属病院
      </Heading>

      <div className="mb-6">
        <EditProfileLabel required id="prefecture_code">
          勤務先病院の所在地
        </EditProfileLabel>
        {prefectures && (
          <SelectBox
            name="prefecture_code"
            id="prefecture_code"
            value={profile.prefecture_code}
            onChange={(e) => setProfileFields({ prefecture_code: e.target.value })}
            required
          >
            <option value="">都道府県を選択</option>
            {prefectures.map((prefecture) => (
              <option value={prefecture.code} key={prefecture.code}>
                {prefecture.name}
              </option>
            ))}
          </SelectBox>
        )}
      </div>

      <div className="mt-6">
        <EditProfileLabel required id="prefecture_code">
          現在の勤務先病院名
        </EditProfileLabel>
      </div>

      <div className="mt-2">
        <HospitalInputTypeContainer
          label="現在の勤務先病院名"
          id="hospital-data"
          type="select"
          value={hospitalInputType}
          onChange={setHospitalInputType}
        >
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
                paddingTop: '2px',
                paddingBottom: '2px',
              }),
            }}
            isDisabled={hospitalInputType !== 'select'}
          />
        </HospitalInputTypeContainer>
      </div>

      <div className="mt-2">
        <HospitalInputTypeContainer
          label="直接入力"
          id="direct-hospital"
          type="free"
          value={hospitalInputType}
          onChange={setHospitalInputType}
        >
          <TextField
            name="hospital_input_type"
            id="direct-hospital"
            value={profile.hospital_name}
            onChange={(e) => setHospitalName(e.target.value)}
            disabled={hospitalInputType !== 'free'}
          />
        </HospitalInputTypeContainer>
      </div>
    </div>
  );
};
