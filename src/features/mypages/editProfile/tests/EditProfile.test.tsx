import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { EditProfile } from '../EditProfile';

describe('EditProfile', () => {
  test('編集画面に切り替わること', async () => {
    await act(() => {
      render(
        <RecoilRoot>
          <EditProfile />
        </RecoilRoot>
      );
    });

    // screen.debug();

    const editProfileBtn = screen.getByTestId('btn-profile-edit');
    await act(() => {
      userEvent.click(editProfileBtn);
    });

    const headingEditProfileEdit = screen.getByTestId('h-edit-profile-edit');
    expect(headingEditProfileEdit).toBeInTheDocument();
  });
  test.todo('詳細画面に切り替わること');
  test.todo('所属科選択モーダルが表示されること');
  test.todo('更新ができること');
});
