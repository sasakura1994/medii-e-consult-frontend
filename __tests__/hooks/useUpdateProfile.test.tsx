import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { profileMock } from '@/mocks/mocks';
import type { RenderHookResult } from '@testing-library/react';
import type { UseUpdateProfileType } from '@/hooks/useUpdateProfile';

const dummyUrl = 'https://jsonplaceholder.typicode.com/posts/1';

describe('useUpdateProfile', () => {
  test('should update profile.', async () => {
    const updateData = {
      ...profileMock,
      is_mail_notify: false,
      is_push_notify: true,
      not_seminar_mail_target: false,
    };

    let hookResult: RenderHookResult<UseUpdateProfileType, unknown> | undefined;
    await act(async () => {
      hookResult = renderHook(() => useUpdateProfile());
      await waitFor(() => !!hookResult?.result.current);
    });

    act(() => {
      hookResult?.result.current.updateProfile(updateData);
    });

    await waitFor(() => {
      expect(hookResult?.result.current.isSuccess).toBe(true);
      expect(hookResult?.result.current.isError).toBe(false);
    });

    // swr のキャッシュクリア
    await act(async () => {
      await hookResult?.result.current.mutate(undefined, false);
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

    let hookResult: RenderHookResult<UseUpdateProfileType, unknown> | undefined;
    await act(async () => {
      hookResult = renderHook(() => useUpdateProfile());
      await waitFor(() => !!hookResult?.result.current);
    });

    act(() => {
      hookResult?.result.current.updateProfile(updateData);
    });

    await act(async () => {
      await hookResult?.result.current.mutate();
    });

    expect(hookResult?.result.current.isSuccess).toBe(false);
    expect(hookResult?.result.current.isError).toBe(true);

    // swr のキャッシュクリア
    await act(async () => {
      await hookResult?.result.current.mutate(undefined, false);
    });
  });
});
