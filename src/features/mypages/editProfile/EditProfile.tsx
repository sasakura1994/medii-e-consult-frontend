import React from 'react';
import styles from './EditProfile.module.scss';

export const EditProfile: React.FC = () => {
  return (
    <>
      <div className={styles.edit_profile}>
        <h2 className={styles.edit_profile__heading}>プロフィール</h2>
      </div>
    </>
  );
};
