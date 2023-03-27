import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { AmazonGift } from '../AmazonGift';

describe('AmazonGiftComponent', () => {
  test.todo(
    'Need to implement: should price button is selected the exchange button must be enabled.'
  );
  // test('should price button is selected the exchange button must be enabled.', async () => {
  //   await act(() => {
  //     render(
  //       <RecoilRoot>
  //         <AmazonGift />
  //       </RecoilRoot>
  //     );
  //   });

  //   const exchangeBtn = screen.getByTestId('btn-exchange');
  //   expect(exchangeBtn).toBeDisabled();

  //   const selectBtn = screen.getByTestId('btn-select-1000');
  //   expect(selectBtn).toBeEnabled();
  //   await act(async () => {
  //     userEvent.click(selectBtn);
  //   });

  //   await waitFor(() => {
  //     expect(exchangeBtn).toBeEnabled();
  //   });
  // });

  test.todo('Need to implement: should exchange button click to show dialog');
  // test('should exchange button click to show dialog', async () => {
  //   await act(() => {
  //     render(
  //       <RecoilRoot>
  //         <AmazonGift />
  //       </RecoilRoot>
  //     );
  //   });

  //   const exchangeBtn = screen.getByTestId('btn-exchange');
  //   expect(exchangeBtn).toBeDisabled();

  //   const selectBtn = screen.getByTestId('btn-select-1000');
  //   expect(selectBtn).toBeEnabled();
  //   await act(async () => {
  //     userEvent.click(selectBtn);
  //   });

  //   await waitFor(() => {
  //     expect(exchangeBtn).toBeEnabled();
  //   });

  //   await act(async () => {
  //     userEvent.click(exchangeBtn);
  //   });

  //   const exchangeDialog = screen.getByTestId('amazon-gift-exchange-dialog');
  //   expect(exchangeDialog).toBeInTheDocument();
  // });

  test.todo('Need to implement: ポイント交換が実行できること');
  // test('ポイント交換が実行できること', async () => {
  //   await act(() => {
  //     render(
  //       <RecoilRoot>
  //         <AmazonGift />
  //       </RecoilRoot>
  //     );
  //   });

  //   const exchangeBtn = screen.getByTestId('btn-exchange');
  //   expect(exchangeBtn).toBeDisabled();

  //   const selectBtn = screen.getByTestId('btn-select-1000');
  //   expect(selectBtn).toBeEnabled();
  //   await act(async () => {
  //     userEvent.click(selectBtn);
  //   });

  //   await waitFor(() => {
  //     expect(exchangeBtn).toBeEnabled();
  //   });

  //   await act(async () => {
  //     userEvent.click(exchangeBtn);
  //   });

  //   const exchangeDialog = screen.getByTestId('amazon-gift-exchange-dialog');
  //   expect(exchangeDialog).toBeInTheDocument();

  //   const execExchangeBtn = screen.getByTestId('btn-exec-exchange');
  //   await act(async () => {
  //     userEvent.click(execExchangeBtn);
  //   });

  //   await waitFor(() => {
  //     const txtExchangeCompleted = screen.getByTestId('txt-exchange-completed');
  //     expect(txtExchangeCompleted).toBeInTheDocument();
  //   });
  // });
});
