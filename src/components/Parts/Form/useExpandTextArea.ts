import React from 'react';

export const useExpandTextArea = () => {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = React.useState<string | number>();

  React.useEffect(() => {
    setHeight('auto');
  }, []);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      setHeight('auto');
      if (e.target.value === '') {
        setHeight(0);
      } else {
        setHeight(ref.current.scrollHeight);
      }
    }
  }, []);

  return { onChange, ref, style: { height } };
};
