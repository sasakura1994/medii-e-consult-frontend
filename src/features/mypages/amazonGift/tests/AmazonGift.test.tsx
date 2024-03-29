import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor, cleanup } from '@testing-library/react';

import { AmazonGift } from '../AmazonGift';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

const priceListMock = [1000, 3000, 5000, 10000];

jest.mock('@/hooks/api/doctor/useFetchProfile');

jest.mock('@/features/mypages/pointHistory/useFetchCurrentPoint', () => ({
  useFetchCurrentPoint: jest.fn(() => {
    return {
      currentPoint: 3500,
    };
  }),
}));

jest.mock('@/hooks/api/amazonGift/useFetchAmazonGift', () => ({
  useFetchAmazonGift: jest.fn(() => {
    return {
      amazonGifts: [
        {
          uid: 66,
          created_date: '2023-03-20T13:51:41',
          status: 'CONFIRMED',
          size: 1000,
          request_id: 'Mediistg0000000066',
          last_displayed_date: null,
        },
        {
          uid: 65,
          created_date: '2023-03-13T22:06:05',
          status: 'UNCONFIRMED',
          size: 1000,
          request_id: 'Mediistg0000000065',
          last_displayed_date: null,
        },
        {
          uid: 63,
          created_date: '2023-02-20T15:55:32',
          status: 'CONFIRMED',
          size: 1000,
          request_id: 'Mediistg0000000063',
          last_displayed_date: null,
        },
      ],
    };
  }),
}));

const getRender = async () => {
  await act(() => {
    render(<AmazonGift />);
  });
};

afterEach(() => cleanup());

describe('AmazonGiftComponent', () => {
  test('Mediiポイントが表示されること', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'VERIFIED',
      },
    });
    getRender();
    const mediiPointText = screen.getByTestId('txt-current-point');
    expect(mediiPointText.textContent).toBe('3,500');
  });

  test('金額交換ボタンが表示されること', async () => {
    getRender();
    priceListMock.forEach((price) => {
      const selectBtn = screen.getByTestId(`btn-select-${price}`);
      expect(selectBtn).toBeInTheDocument();
    });
  });

  test('ユーザーがVERIFIEDでない時にボタンが無効になっていること', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'PENDING_MANUAL',
      },
    });
    getRender();

    const selectBtn1000 = screen.getByTestId('btn-select-1000');
    expect(selectBtn1000).toBeDisabled();

    const selectBtn3000 = screen.getByTestId('btn-select-3000');
    expect(selectBtn3000).toBeDisabled();

    const selectBtn5000 = screen.getByTestId('btn-select-5000');
    expect(selectBtn5000).toBeDisabled();

    const selectBtn10000 = screen.getByTestId('btn-select-10000');
    expect(selectBtn10000).toBeDisabled();
  });

  test('3000円までのボタンがアクティブでそれ以外は非アクティブになっていること', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'VERIFIED',
      },
    });
    getRender();

    const selectBtn1000 = screen.getByTestId('btn-select-1000');
    expect(selectBtn1000).toBeEnabled();

    const selectBtn3000 = screen.getByTestId('btn-select-3000');
    expect(selectBtn3000).toBeEnabled();

    const selectBtn5000 = screen.getByTestId('btn-select-5000');
    expect(selectBtn5000).toBeDisabled();

    const selectBtn10000 = screen.getByTestId('btn-select-10000');
    expect(selectBtn10000).toBeDisabled();
  });

  test('有効な金額交換ボタンをクリックするとAmazonギフトに交換するボタンがアクティブになること', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'VERIFIED',
      },
    });
    getRender();

    const btnExchange = screen.getByTestId('btn-exchange');
    expect(btnExchange).toBeDisabled();

    const selectBtn = screen.getByTestId('btn-select-3000');
    await act(async () => {
      userEvent.click(selectBtn);
    });

    expect(btnExchange).toBeEnabled();
  });

  test('Amazonギフトに交換するボタンクリックするとダイアログが表示されること', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'VERIFIED',
      },
    });
    getRender();

    const selectBtn = screen.getByTestId('btn-select-1000');
    await act(async () => {
      userEvent.click(selectBtn);
    });

    const btnExchange = screen.getByTestId('btn-exchange');
    await act(async () => {
      userEvent.click(btnExchange);
    });

    const dialog = screen.getByTestId('amazon-gift-exchange-dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('ポイント交換が実行できること', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'VERIFIED',
      },
    });
    await getRender();

    const selectBtn = screen.getByTestId('btn-select-1000');
    await act(async () => {
      userEvent.click(selectBtn);
    });

    const btnExchange = screen.getByTestId('btn-exchange');
    await act(async () => {
      userEvent.click(btnExchange);
    });

    const execExchangeBtn = screen.getByTestId('btn-exec-exchange');
    await act(async () => {
      userEvent.click(execExchangeBtn);
    });

    waitFor(() => {
      const txtExchangeCompleted = screen.getByTestId('txt-exchange-completed');
      expect(txtExchangeCompleted).toBeInTheDocument();
    });
  });

  test.todo('Amazonギフト一覧が表示されること');
});
