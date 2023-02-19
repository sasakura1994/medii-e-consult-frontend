import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { profileMock } from '@/mocks/mocks';
import type { RenderHookResult } from '@testing-library/react';
import type { UseFetchProfileType } from '@/hooks/useFetchProfile';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users';

describe('useFetchProfile', () => {
  test('should return profile data when fetch succeeds.', async () => {
    let hookResult: RenderHookResult<UseFetchProfileType, unknown> | undefined;
    await act(async () => {
      hookResult = renderHook(() => useFetchProfile());
      await waitFor(() => !!hookResult?.result.current);
    });

    expect(hookResult?.result.current.isLoading).toBeFalsy();
    expect(hookResult?.result.current.profile).toEqual(
      fromNullToUndefined(profileMock)
    );
    expect(hookResult?.result.current.error).toBeUndefined();

    // swr のキャッシュクリア
    await act(async () => {
      await hookResult?.result.current.mutate(undefined, false);
    });
  });

  test('should handle 500 error.', async () => {
    server.use(
      rest.get(dummyUrl, (req, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    let hookResult: RenderHookResult<UseFetchProfileType, unknown> | undefined;
    await act(async () => {
      hookResult = renderHook(() => useFetchProfile());
      await waitFor(() => !!hookResult?.result.current);
    });

    await act(async () => {
      await hookResult?.result.current.mutate();
    });

    expect(hookResult?.result.current.profile).toBeUndefined();
    expect(hookResult?.result.current.error).toEqual({
      message: 'サーバーでエラーが発生しました',
      status: 500,
      url: dummyUrl,
    });

    // swr のキャッシュクリア
    await act(async () => {
      await hookResult?.result.current.mutate(undefined, false);
    });
  });
});
