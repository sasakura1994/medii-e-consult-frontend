import React from 'react';
import { TextArea } from './TextArea';
import { useExpandTextArea } from './useExpandTextArea';

export type Props = React.ComponentProps<typeof TextArea>;

export const ExpandTextArea: React.FC<Props> = (props: Props) => {
  const { style: propsStyle = {}, onChange, ...otherProps } = props;
  const { onChange: onChangeOfExpandTextArea, ref, style: hooksStyle } = useExpandTextArea();

  return (
    <TextArea
      ref={ref}
      onChange={(e) => {
        onChange?.(e);
        onChangeOfExpandTextArea(e);
      }}
      style={{ ...propsStyle, ...hooksStyle }}
      {...otherProps}
    />
  );
};
