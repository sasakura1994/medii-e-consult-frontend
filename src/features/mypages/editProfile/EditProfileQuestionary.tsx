import React from 'react';
import { useEditProfile } from './useEditProfile';
import { EditProfileLabel } from './EditProfileLabel';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { useFetchQuestionaryItems } from '@/hooks/api/questionary/useFetchQuestionaryItems';
import { CheckBox } from '@/components/Parts/Form/CheckBox';

export type Props = ReturnType<typeof useEditProfile>;

export const EditProfileQuestionary = (props: Props) => {
  const { profile, selectedQuestionaryItemIds, setProfileFields, toggleQuestionaryItem } = props;
  const { questionaryItems } = useFetchQuestionaryItems();

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="mb-10" data-testid="edit-profile-questionary">
        <h3 className="mb-4 text-primary">■ アンケート</h3>
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
        <div>
          <div>その他</div>
          <TextArea
            name="questionary_other"
            value={profile.questionary_other ?? ''}
            className="h-[100px]"
            onChange={(e) => setProfileFields({ questionary_other: e.target.value })}
          />
        </div>
      </div>
    </>
  );
};
