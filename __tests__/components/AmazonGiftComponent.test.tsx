import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { AmazonGiftComponent } from '@/components/Organisms/MyPage/AmazonGiftComponent';

describe('amazon-gift page', () => {
  test('should exchange button active once the amount is selected.', async () => {
    render(
      <RecoilRoot>
        <AmazonGiftComponent />
      </RecoilRoot>
    );

    const selectBtn = screen.getByTestId('btn-select-1000');
    const exchangeBtn = screen.getByTestId('btn-exchange');

    expect(exchangeBtn).toBeDisabled();

    await act(async () => {
      userEvent.click(selectBtn);
    });

    await waitFor(() => {
      expect(exchangeBtn).toBeEnabled();
    });
  });

  test('should click on `exchange button` and a dialog appear.', async () => {
    render(
      <RecoilRoot>
        <AmazonGiftComponent />
      </RecoilRoot>
    );

    const selectBtn = screen.getByTestId('btn-select-1000');
    const exchangeBtn = screen.getByTestId('btn-exchange');

    // 金額ボタンをクリックして`Amazonギフトに交換する`ボタンを Enabeld にする
    // MEMO:
    //      これを実行しないと`Amazonギフトに交換する`ボタンは disable のままになって押せない
    await act(async () => {
      userEvent.click(selectBtn);
    });

    await waitFor(() => {
      expect(exchangeBtn).toBeEnabled();
    });

    await act(async () => {
      const exchangeBtn = screen.getByTestId('btn-exchange');
      userEvent.click(exchangeBtn);
    });

    const exchangeDialog = screen.getByTestId('amazon-gift-exchange-dialog');
    expect(exchangeDialog).toBeInTheDocument();
  });
});
