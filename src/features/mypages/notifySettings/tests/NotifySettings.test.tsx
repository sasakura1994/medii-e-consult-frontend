import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { NotifySettings } from '../NotifySettings';

describe('NotifySettings', () => {
  test('新着メッセージ通知のラジオボタンが選択できること', async () => {
    await act(() => {
      render(
        <RecoilRoot>
          <NotifySettings />
        </RecoilRoot>
      );
    });

    const radios = screen.getAllByTestId('radio-new-notify');

    expect(radios[0]).not.toBeChecked(); // メール・プッシュ
    act(() => userEvent.click(radios[0]));
    expect(radios[0]).toBeChecked();

    expect(radios[1]).not.toBeChecked(); // メール
    act(() => userEvent.click(radios[1]));
    expect(radios[1]).toBeChecked();

    expect(radios[2]).not.toBeChecked(); // プッシュ
    act(() => userEvent.click(radios[2]));
    expect(radios[2]).toBeChecked();
  });

  test('お知らせメールのラジオボタンが選択できること', async () => {
    await act(() => {
      render(
        <RecoilRoot>
          <NotifySettings />
        </RecoilRoot>
      );
    });

    const radios = screen.getAllByTestId('radio-seminar-notify');

    expect(radios[0]).not.toBeChecked(); // 受け取る
    act(() => userEvent.click(radios[0]));
    expect(radios[0]).toBeChecked();

    expect(radios[1]).not.toBeChecked(); // 受け取らない
    act(() => userEvent.click(radios[1]));
    expect(radios[1]).toBeChecked();
  });
});
