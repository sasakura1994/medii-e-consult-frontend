import React from 'react';
import Select from 'react-select';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { UseEditProfile } from './useEditProfile';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';
import { Heading } from '@/components/Parts/Text/Heading';
import { HospitalInputTypeContainer } from './HospitalInputTypeContainer';
import TextField from '@/components/TextField/TextField';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

export const HospitalAffiliation = (props: UseEditProfile) => {
  const {
    addBlurFields,
    blurFields,
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
            onBlur={() => addBlurFields('prefecture_code')}
            hasError={blurFields.includes('prefecture_code') && profile.prefecture_code === ''}
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
        {blurFields.includes('prefecture_code') && profile.prefecture_code === '' && (
          <ErrorMessage className="mt-2 text-xs">選択してください</ErrorMessage>
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
            onBlur={() => addBlurFields('hospital_id')}
            inputValue={hospitalSearchText}
            onInputChange={(value) => setHospitalSearchText(value)}
            styles={{
              control: (styles) => ({
                ...styles,
                paddingTop: '2px',
                paddingBottom: '2px',
                ...(hospitalInputType === 'select' && blurFields.includes('hospital_id') && profile.hospital_id === ''
                  ? { border: '2px solid #E41D07' }
                  : {}),
              }),
            }}
            isDisabled={hospitalInputType !== 'select'}
          />
          {hospitalInputType === 'select' && blurFields.includes('hospital_id') && profile.hospital_id === '' && (
            <ErrorMessage className="mt-2 text-xs">選択してください</ErrorMessage>
          )}
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
            onBlur={() => addBlurFields('hospital_name')}
            disabled={hospitalInputType !== 'free'}
            hasError={
              hospitalInputType === 'free' && blurFields.includes('hospital_name') && profile.hospital_name === ''
            }
            className="w-full"
          />
          {hospitalInputType === 'free' && blurFields.includes('hospital_name') && profile.hospital_name === '' && (
            <ErrorMessage className="mt-2 text-xs">入力してください</ErrorMessage>
          )}
        </HospitalInputTypeContainer>
      </div>
    </div>
  );
};
