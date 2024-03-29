import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

import * as apiClient from '@/libs/apiClient';
import { AxiosInstance } from 'axios';
import { PostResetPasswordResponseData } from '@/hooks/api/account/usePostPasswordReset';

import { useRouter } from 'next/router';
import InitPassword from '@/pages/initpassword';

jest.mock('@/libs/apiClient');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('InitPassword', () => {
  test('完了してリダイレクトする', async () => {
    const apiClientMock = apiClient as jest.Mocked<typeof apiClient>;
    const data: PostResetPasswordResponseData = { code: 1, message: '' };
    apiClientMock.createApiClient.mockReturnValue({
      post: jest.fn(() => Promise.resolve({ data })),
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
    } as unknown as AxiosInstance);

    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    const pushMock = jest.fn();
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {
        token: 'test',
      },
      push: pushMock,
    });

    await act(() => {
      render(<InitPassword />);
    });

    await act(() => {
      userEvent.type(screen.getByTestId('first-password'), '11111111');
      userEvent.type(screen.getByTestId('second-password'), '11111111');
    });

    await act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    expect(pushMock.mock.calls).toHaveLength(1);
  });
});
