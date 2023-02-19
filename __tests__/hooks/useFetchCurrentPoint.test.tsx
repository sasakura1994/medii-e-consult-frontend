import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { useFetchCurrentPoint } from '@/hooks/useFetchCurrentPoint';
import { currentPointMock } from '@/mocks/mocks';
import type { RenderHookResult } from '@testing-library/react';
import type { UseFetchCurrentPointType } from '@/hooks/useFetchCurrentPoint';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users/2';

describe('useFetchCurrentPoint', () => {
  test('should return currentPoint data when fetch succeeds.', async () => {
    let hookResult:
      | RenderHookResult<UseFetchCurrentPointType, unknown>
      | undefined;
    await act(async () => {
      hookResult = renderHook(() => useFetchCurrentPoint());
      await waitFor(() => !!hookResult?.result.current);
    });

    if (!hookResult?.result.current.currentPoint) return;

    expect(hookResult?.result.current.isLoading).toBeFalsy();
    expect(hookResult?.result.current.currentPoint).toEqual(
      currentPointMock.point
    );
    expect(hookResult?.result.current.error).toBeUndefined();

    // swr のキャッシュクリア
    await act(async () => {
      await hookResult?.result.current.mutate(undefined, false);
    });
  });

  test('should handle 500 error.', async () => {
    server.use(
      rest.get(dummyUrl, (_, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    let hookResult:
      | RenderHookResult<UseFetchCurrentPointType, unknown>
      | undefined;
    await act(async () => {
      hookResult = renderHook(() => useFetchCurrentPoint());
      await waitFor(() => !!hookResult?.result.current);
    });

    await act(async () => {
      await hookResult?.result.current.mutate();
    });

    expect(hookResult?.result.current.currentPoint).toBeUndefined();
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
