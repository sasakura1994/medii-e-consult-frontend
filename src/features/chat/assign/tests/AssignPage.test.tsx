import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import AssignPage from '@/pages/assign/[id]';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import * as useFetchChatRoom from '@/hooks/api/chat/useFetchChatRoom';
import { useRouter } from 'next/router';
import { useCanAnswer } from '@/hooks/api/chat/useCanAnswer';
import { useUpdateOpenStatus } from '@/hooks/api/chat/usePatchUpdateOpenStatus';

jest.mock('@/hooks/api/chat/useFetchChatRoom');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/chat/useCanAnswer');
jest.mock('@/hooks/api/chat/usePatchUpdateOpenStatus');

(useUpdateOpenStatus as jest.Mock).mockReturnValue({ updateOpenStatus: jest.fn() });

describe('Assign', () => {
  test('権限読み込み中はローディングを表示', () => {
    (useCanAnswer as jest.Mock).mockReturnValue({});

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
    (useRouterMock as jest.Mock).mockReturnValue({ query: { id: 'test' } });

    render(<AssignPage />);

    expect(screen.queryByTestId('loading')).toBeInTheDocument();
  });

  test('権限がない場合はその旨を表示', () => {
    (useCanAnswer as jest.Mock).mockReturnValue({ data: { enable: false } });

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
    (useRouterMock as jest.Mock).mockReturnValue({ query: { id: 'test' } });

    render(<AssignPage />);

    expect(screen.queryByTestId('cannot-assign')).toBeInTheDocument();
  });

  test('アサインページが表示される', async () => {
    (useCanAnswer as jest.Mock).mockReturnValue({ data: { enable: true } });

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

    render(<AssignPage />);

    const assignScreen = await act(async () => await waitFor(() => screen.getByTestId('assign-assign')));
    expect(assignScreen).toBeInTheDocument();
  });

  test('アサイン済みの場合は事例を表示する', async () => {
    (useCanAnswer as jest.Mock).mockReturnValue({ data: { enable: true } });

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

    render(<AssignPage />);

    const alreadyAssignedScreen = await act(
      async () => await waitFor(() => screen.getByTestId('assign-already-assigned'))
    );
    expect(alreadyAssignedScreen).toBeInTheDocument();
  });

  test('自身がアサインされてる場合はチャットページに飛ばす', async () => {
    (useCanAnswer as jest.Mock).mockReturnValue({ data: { enable: true } });

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

    render(<AssignPage />);
    expect(pushMock.mock.calls).toHaveLength(1);
  });
});
