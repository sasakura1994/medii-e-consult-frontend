import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { NotifySettings } from '../NotifySettings';

describe('NotifySettings', () => {
  test('ラジオボタンが選択できること', async () => {
    await act(() => {
      render(
        <RecoilRoot>
          <NotifySettings />
        </RecoilRoot>
      );
    });

    const radios = screen.getAllByRole('radio');

    act(() => userEvent.click(radios[0]));
    expect(radios[0]).toBeChecked();

    act(() => userEvent.click(radios[1]));
    expect(radios[1]).toBeChecked();

    act(() => userEvent.click(radios[2]));
    expect(radios[2]).toBeChecked();

    act(() => userEvent.click(radios[3]));
    expect(radios[3]).toBeChecked();

    act(() => userEvent.click(radios[4]));
    expect(radios[4]).toBeChecked();
  });
});
