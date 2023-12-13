import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

import PasswordResetRequestPage from '@/pages/passwordresetrequest';
import { PostRequestResetPasswordResponseData } from '@/hooks/api/account/usePostRequestResetPassword';
import * as apiClient from '@/libs/apiClient';
import { AxiosInstance } from 'axios';

jest.mock('@/libs/apiClient');

describe('PasswordResetRequest', () => {
  test('結果を表示する', async () => {
    const apiClientMock = apiClient as jest.Mocked<typeof apiClient>;
    apiClientMock.createApiClient.mockReturnValue({
      post: jest.fn(() => Promise.resolve({ data: data, status: 204 })),
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
    } as unknown as AxiosInstance);
    const data: PostRequestResetPasswordResponseData = { code: 1, message: '' };

    await act(() => {
      render(<PasswordResetRequestPage />);
    });

    await act(() => userEvent.type(screen.getByRole('textbox'), 'dummy@example.com'));
    await act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    const headingEditProfileEdit = screen.getByTestId('result-text');
    expect(headingEditProfileEdit).toBeInTheDocument();
  });
});
