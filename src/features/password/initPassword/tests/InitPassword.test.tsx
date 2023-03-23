import React from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as apiClient from '@/libs/apiClient';
import { AxiosInstance } from 'axios';
import { PostResetPasswordResponseData } from '@/hooks/api/account/usePostPasswordReset';
import InitPasswordPage from '@/pages/InitPassword';
import { useRouter } from 'next/router';

jest.mock('@/libs/apiClient');
jest.mock('next/router');

describe('InitPassword', () => {
  test('完了してリダイレクトする', async () => {
    const apiClientMock = apiClient as jest.Mocked<typeof apiClient>;
    const data: PostResetPasswordResponseData = { code: 1, message: '' };
    apiClientMock.createApiClient.mockReturnValue({
      post: jest.fn(() => Promise.resolve({ data })),
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
      render(
        <RecoilRoot>
          <InitPasswordPage />
        </RecoilRoot>
      );
    });

    fireEvent.change(screen.getByLabelText('first_password'), {
      target: { value: '11111111' },
    });
    fireEvent.change(screen.getByLabelText('second_password'), {
      target: { value: '11111111' },
    });
    fireEvent.click(screen.getByTestId('agree-privacy-policy'));
    fireEvent.click(screen.getByTestId('agree-terms-of-use'));
    fireEvent.click(screen.getByTestId('agree-details'));

    await act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    expect(pushMock.mock.calls).toHaveLength(1);
  });
});
