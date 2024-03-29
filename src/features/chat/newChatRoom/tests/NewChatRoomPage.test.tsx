import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import NewChatRoomPage from '@/pages/newchatroom';
import { useRouter } from 'next/router';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/authentication/useAuthenticationOnPage');
jest.mock('@/hooks/api/account/useFetchFlags');

(useFetchFlag as jest.Mock).mockReturnValue({
  flag: false,
  isLoading: false,
});

describe('/newchatroom', () => {
  test('医学生はコンサルを作成出来ない', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        main_speciality: 'STUDENT',
        status: 'VERIFIED',
      },
    });

    await act(async () => {
      render(<NewChatRoomPage />);
    });

    expect(await act(() => screen.queryByTestId('for-student'))).toBeInTheDocument();
  });

  test('プロフィールが無効の場合はダイアログを表示', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        status: 'CREATED',
      },
    });

    await act(() => {
      render(<NewChatRoomPage />);
    });

    expect(await act(() => screen.queryByTestId('imcomplete-profile-modal'))).toBeInTheDocument();
  });

  test('医師確認中のメッセージを表示', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        status: 'PENDING_AUTO',
      },
    });

    await act(() => {
      render(<NewChatRoomPage />);
    });

    expect(await act(() => screen.queryByTestId('document-confirming-message'))).toBeInTheDocument();
  });

  describe('e-detailパラメータのモーダル', () => {
    describe('パラメータが存在する', () => {
      beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
          query: { from: 'e-detail' },
        });

        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: {
            status: 'VERIFIED',
          },
        });
      });

      test('表示', async () => {
        await act(() => {
          render(<NewChatRoomPage />);
        });

        await waitFor(() => {
          expect(screen.queryByTestId('e-detail-modal')).toBeInTheDocument();
        });
      });

      test('コンサル済みの場合は表示しない', async () => {
        (useFetchFlag as jest.Mock).mockReturnValue({
          flag: true,
          isLoading: false,
        });

        await act(() => {
          render(<NewChatRoomPage />);
        });

        await waitFor(() => {
          expect(screen.queryByTestId('e-detail-modal')).not.toBeInTheDocument();
        });
      });
    });

    describe('パラメータが存在しない', () => {
      beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
          query: {},
        });

        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: {
            status: 'VERIFIED',
          },
        });
      });

      test('表示しない', async () => {
        await act(() => {
          render(<NewChatRoomPage />);
        });

        await waitFor(async () => {
          expect(await act(() => screen.queryByTestId('e-detail-modal'))).not.toBeInTheDocument();
        });
      });
    });
  });
});
