import React, { ReactNode } from 'react';
import { HospitalInputType } from './useEditProfile';
import { Radio } from '@/components/Parts/Form/Radio';

type Props = {
  label: string;
  id: string;
  type: HospitalInputType;
  value: HospitalInputType;
  children: ReactNode;
  onChange: (tyoe: HospitalInputType) => void;
};

export const HospitalInputTypeContainer = (props: Props) => {
  const { children, label, id, type, value, onChange } = props;

  return (
    <div
      className={`flex items-center gap-2 rounded ${
        type === value ? 'border-2 border-medii-blue-base' : 'border border-border-field'
      } p-4`}
    >
      <Radio name="hospital_input_type" id={id} value={type} onChange={() => onChange(type)} checked={type === value} />
      <div className="flex-1">
        <div>{label}</div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
};
