import React from 'react';

type Props = {
  src: string;
  color: string;
  width: string;
  height: string;
  className?: string;
};

export const ColoredImage = (props: Props) => {
  const { src, color, width, height, className } = props;

  return (
    <div
      className={className ?? ''}
      style={{
        width,
        height,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        background: color,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    ></div>
  );
};
