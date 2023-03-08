import React from 'react';
import styles from './SpinnerBorder.module.scss';

type PresenterPropsType = {
  style?: React.CSSProperties;
};

export const SpinnerBorder: React.FC<PresenterPropsType> = (props) => {
  const { style } = props;
  return (
    <div className={styles.spinner_border} style={style} role="status"></div>
  );
};
