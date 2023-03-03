import { renderHook, act } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { profileMock } from '@/mocks/profileMock';

const dummyUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // TODO: 正規のURLに変更する

describe('useUpdateProfile', () => {
  test('should update profile.', async () => {
    const updateData = {
      ...profileMock,
      is_mail_notify: false,
      is_push_notify: true,
      not_seminar_mail_target: false,
    };

    const { result } = renderHook(() => useUpdateProfile());

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);

    await act(async () => result.current.updateProfile(updateData));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);

    await act(async () => {
      await result.current.mutate(undefined, false);
    });
  });

  test('should handle 500 error.', async () => {
    const updateData = {
      ...profileMock,
      is_mail_notify: false,
      is_push_notify: true,
      not_seminar_mail_target: false,
    };

    server.use(
      rest.put(dummyUrl, (_, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useUpdateProfile());

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);

    await act(async () => {
      result.current.updateProfile(updateData);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);

    await act(async () => {
      await result.current.mutate(undefined, false);
    });
  });
});
