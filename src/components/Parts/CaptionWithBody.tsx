import React from 'react';

type ClassNamesType = {
  block?: string;
  caption?: string;
  body?: string;
};

type PropsType = {
  caption: string;
  body?: string;
  classNames?: ClassNamesType;
};

export const CaptionWithBody: React.FC<PropsType> = (props) => {
  const { caption, body, classNames } = props;

  return (
    <div className={classNames?.block}>
      <p className={classNames?.caption}>{caption}</p>
      {body && <p className={classNames?.body}>{body}</p>}
    </div>
  );
};
