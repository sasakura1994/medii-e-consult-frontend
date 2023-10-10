import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { GroupDetailModal } from '../GroupDetailModal';

describe('GroupDetailModal', () => {
  test('実名グループの場合は補足を表示', () => {
    render(
      <RecoilRoot>
        <GroupDetailModal
          group={{
            group_id: 'group',
            group_name: '',
            area: '',
            disease: '',
            explanation: '',
            is_real_name: true,
            member_ids: [],
            speciality_counts: {},
          }}
          setShowModal={() => {
            return;
          }}
          onSubmit={() => {
            return;
          }}
        />
      </RecoilRoot>
    );

    expect(screen.queryByTestId('real-name-note')).toBeInTheDocument();
  });
});
