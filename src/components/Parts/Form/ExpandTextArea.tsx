import React from 'react';
import { TextArea } from './TextArea';
import { useExpandTextArea } from './useExpandTextArea';

export type Props = React.ComponentProps<typeof TextArea>;

export const ExpandTextArea: React.FC<Props> = (props: Props) => {
  const { style: propsStyle = {}, ...otherProps } = props;
  const { onChange, ref, style: hooksStyle } = useExpandTextArea(props);

  return (
    <TextArea
      ref={ref}
      onChange={onChange}
      style={{ ...propsStyle, ...hooksStyle }}
      {...otherProps}
    />
  );
};
