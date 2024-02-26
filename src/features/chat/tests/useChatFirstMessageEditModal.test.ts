import { act, renderHook } from '@testing-library/react';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { useChatFirstMessageEditModal } from '../useChatFirstMessageEditModal';
import { useAxios } from '@/hooks/network/useAxios';

jest.mock('@/hooks/network/useAxios');

describe('useChatFirstMessageEditModal', () => {
  test('update', async () => {
    const patch = jest.fn();
    patch.mockResolvedValue({ data: undefined });
    (useAxios as jest.Mock).mockReturnValue({ axios: { patch } });

    const onClose = jest.fn();
    const updateMessageMutate = jest.fn();
    const { result } = renderHook(() =>
      useChatFirstMessageEditModal({
        chatRoomId: 'chatroomid',
        firstMessage: {
          uid: 100,
          message: 'first message',
        } as unknown as ChatData,
        updateMessageMutate,
        onClose,
      })
    );

    act(() => result.current.setMessage('updated message'));
    await act(async () => await result.current.update());

    expect(onClose).toBeCalled();
    expect(updateMessageMutate).toBeCalledWith(100, { uid: 100, message: 'updated message' });
  });
});
