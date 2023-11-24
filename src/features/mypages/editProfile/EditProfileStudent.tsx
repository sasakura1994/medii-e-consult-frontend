import React from 'react';
import TextField from '@/components/TextField/TextField';
import { EditProfileLabel } from './EditProfileLabel';
import { UseEditProfile } from './useEditProfile';

export const EditProfileStudent = (props: UseEditProfile) => {
  const { profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <EditProfileLabel required>所属大学</EditProfileLabel>
      <div className="mt-2">
        <TextField
          value={profile.graduated_university ?? ''}
          onChange={(e) => setProfileFields({ graduated_university: e.target.value })}
          className="w-full"
          required
        />
      </div>
    </>
  );
};
