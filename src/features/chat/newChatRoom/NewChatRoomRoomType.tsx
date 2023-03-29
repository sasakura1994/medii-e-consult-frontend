import React from 'react';
import { Radio } from '@/components/Parts/Form/Radio';
import { Badge } from '@/components/Parts/Badge/Badge';

type Props = Pick<
  React.ComponentProps<typeof Radio>,
  'checked' | 'id' | 'value'
> & {
  label: string;
  note: string;
  isBeta?: boolean;
  onChange: () => void;
};

export const NewChatRoomRoomType: React.FC<Props> = (props: Props) => {
  const { checked, label, id, note, isBeta, onChange, value } = props;

  return (
    <div className="flex">
      <div className="p-1.5">
        <Radio
          name="room_type"
          id={id}
          checked={checked}
          value={value}
          onChange={() => onChange()}
        />
      </div>
      <label className="block" htmlFor={id}>
        <div className="flex gap-1">
          <div>{label}</div>
          <div>
            {isBeta === true && (
              <Badge className="inline-block w-[50px] text-[11px]">β版</Badge>
            )}
          </div>
        </div>
        <div className="text-sm text-[darkgray]">{note}</div>
      </label>
    </div>
  );
};
