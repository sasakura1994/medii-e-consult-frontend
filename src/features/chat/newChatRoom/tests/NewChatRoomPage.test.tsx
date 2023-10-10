import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import NewChatRoomPage from '@/pages/newchatroom';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('/newchatroom', () => {
  test('nmoユーザー且つプロフィール未入力の場合はモーダル表示', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        registration_source: 'nmo',
        last_name_hira: '',
        status: 'VERIFIED',
      },
    });

    await act(() => {
      render(
        <RecoilRoot>
          <NewChatRoomPage />
        </RecoilRoot>
      );
    });

    expect(await act(() => screen.queryByTestId('nmo-modal'))).toBeInTheDocument();
  });

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
      render(
        <RecoilRoot>
          <NewChatRoomPage />
        </RecoilRoot>
      );
    });

    expect(await act(() => screen.queryByTestId('for-student'))).toBeInTheDocument();
  });

  test('プロフィールが無効の場合はダイアログを表示', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'CREATED',
      },
    });

    await act(() => {
      render(
        <RecoilRoot>
          <NewChatRoomPage />
        </RecoilRoot>
      );
    });

    expect(await act(() => screen.queryByTestId('imcomplete-profile-modal'))).toBeInTheDocument();
  });

  test('医師確認中のメッセージを表示', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'PENDING_AUTO',
      },
    });

    await act(() => {
      render(
        <RecoilRoot>
          <NewChatRoomPage />
        </RecoilRoot>
      );
    });

    expect(await act(() => screen.queryByTestId('document-confirming-message'))).toBeInTheDocument();
  });
});
