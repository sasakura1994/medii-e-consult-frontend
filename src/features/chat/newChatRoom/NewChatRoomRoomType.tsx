import React from 'react';
import { Radio } from '@/components/Parts/Form/Radio';

type Props = Pick<React.ComponentProps<typeof Radio>, 'checked' | 'id' | 'value'> & {
  label: string;
  note: string;
  onChange: () => void;
};

export const NewChatRoomRoomType: React.FC<Props> = (props: Props) => {
  const { checked, label, id, note, onChange, value } = props;

  return (
    <div className="flex">
      <div className="mt-2 p-1.5">
        <Radio name="room_type" id={id} checked={checked} value={value} onChange={() => onChange()} />
      </div>
      <label className="block" htmlFor={id}>
        <div>{label}</div>
        <div className="text-sm text-[darkgray]">{note}</div>
      </label>
    </div>
  );
};
