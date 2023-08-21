import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import AssignPage from '@/pages/assign/[id]';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import * as useFetchChatRoom from '@/hooks/api/chat/useFetchChatRoom';
import { useRouter } from 'next/router';

jest.mock('@/hooks/api/chat/useFetchChatRoom');
jest.mock('next/router');

describe('Assign', () => {
  test('アサインページが表示される', async () => {
    const useFetchChatRoomMock = useFetchChatRoom as jest.Mocked<typeof useFetchChatRoom>;
    const data: FetchChatRoomResponseData = {
      chat_room: { status: 'CREATED' },
    } as FetchChatRoomResponseData;
    useFetchChatRoomMock.useFetchChatRoom.mockReturnValue({
      data,
      isLoading: false,
      error: '',
      mutate: jest.fn(),
    });

    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {
        id: 'test',
      },
    });

    render(
      <RecoilRoot>
        <AssignPage />
      </RecoilRoot>
    );

    const assignScreen = await act(async () => await waitFor(() => screen.getByTestId('assign-assign')));
    expect(assignScreen).toBeInTheDocument();
  });

  test('アサイン済みの場合は事例を表示する', async () => {
    const useFetchChatRoomMock = useFetchChatRoom as jest.Mocked<typeof useFetchChatRoom>;
    const data: FetchChatRoomResponseData = {
      chat_room: { status: 'ACTIVE', title: '10代 女性 難病' },
    } as FetchChatRoomResponseData;
    useFetchChatRoomMock.useFetchChatRoom.mockReturnValue({
      data,
      isLoading: false,
      error: '',
      mutate: jest.fn(),
    });

    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {
        id: 'test',
      },
    });

    render(
      <RecoilRoot>
        <AssignPage />
      </RecoilRoot>
    );

    const alreadyAssignedScreen = await act(
      async () => await waitFor(() => screen.getByTestId('assign-already-assigned'))
    );
    expect(alreadyAssignedScreen).toBeInTheDocument();
  });

  test('自身がアサインされてる場合はチャットページに飛ばす', async () => {
    const useFetchChatRoomMock = useFetchChatRoom as jest.Mocked<typeof useFetchChatRoom>;
    const data: FetchChatRoomResponseData = {
      assigned_to_me: true,
      chat_room: { status: 'ACTIVE', title: '10代 女性 難病' },
    } as FetchChatRoomResponseData;
    useFetchChatRoomMock.useFetchChatRoom.mockReturnValue({
      data,
      isLoading: false,
      error: '',
      mutate: jest.fn(),
    });

    const pushMock = jest.fn();
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {
        id: 'test',
      },
      push: pushMock,
    });

    render(
      <RecoilRoot>
        <AssignPage />
      </RecoilRoot>
    );
    expect(pushMock.mock.calls).toHaveLength(1);
  });
});
