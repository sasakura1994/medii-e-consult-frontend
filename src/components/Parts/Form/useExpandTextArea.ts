import React from 'react';
import { Props } from './ExpandTextArea';

export const useExpandTextArea = (props: Props) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = React.useState<string | number>();

  React.useEffect(() => {
    setHeight('auto');
  }, []);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (ref.current) {
        setHeight('auto');
        if (e.target.value === '') {
          setHeight(0);
        } else {
          setHeight(ref.current.scrollHeight);
        }
      }

      if (props.onChange) {
        props.onChange(e);
      }
    },
    [props]
  );

  return { onChange, ref, style: { height } };
};
