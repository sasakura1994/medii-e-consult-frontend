import React from 'react';
import { UseEditProfile } from './useEditProfile';
import { EditProfileLabel } from './EditProfileLabel';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { useFetchQuestionaryItems } from '@/hooks/api/questionary/useFetchQuestionaryItems';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { EditProfileHeading } from './EditProfileHeading';

export const EditProfileQuestionary = (props: UseEditProfile) => {
  const { profile, selectedQuestionaryItemIds, setProfileFields, toggleQuestionaryItem } = props;
  const { questionaryItems } = useFetchQuestionaryItems();
  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="mb-10" data-testid="edit-profile-questionary">
        <EditProfileHeading className="mb-4">アンケート</EditProfileHeading>
        <div className="mt-2">
          <EditProfileLabel required={false}>ご登録いただいたきっかけを教えてください(複数選択可)</EditProfileLabel>
        </div>
        {questionaryItems?.map((questionaryItem) => (
          <div key={questionaryItem.id}>
            <CheckBox
              name="questionary_item[]"
              value={questionaryItem.id.toString()}
              label={questionaryItem.text}
              checked={selectedQuestionaryItemIds.includes(questionaryItem.id.toString())}
              onChange={() => toggleQuestionaryItem(questionaryItem.id)}
            />
          </div>
        ))}
        <div className='flex flex-row items-start'>
          <TextArea
            name="questionary_other"
            value={profile.questionary_other ?? ''}
            className="h-[100px]"
            onChange={(e) => setProfileFields({ questionary_other: e.target.value })}
            placeholder="上記以外でのきっかけをご記入ください"
          />
        </div>
      </div>
    </>
  );
};