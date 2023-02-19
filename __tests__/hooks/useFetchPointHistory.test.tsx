import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { useFetchPointHistory } from '@/hooks/useFetchPointHistory';
import { pointHistoriesMock } from '@/mocks/mocks';
import type { RenderHookResult } from '@testing-library/react';
import type { UseFetchPointHistoryType } from '@/hooks/useFetchPointHistory';
import type { PointHistoryEntityType } from '@/types/entities/pointHistoryEntity';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users/1';

describe('useFetchPointHistory', () => {
  test('should return pointHistories data when fetch succeeds.', async () => {
    let hookResult:
      | RenderHookResult<UseFetchPointHistoryType, unknown>
      | undefined;
    await act(async () => {
      hookResult = renderHook(() => useFetchPointHistory());
      await waitFor(() => !!hookResult?.result.current);
    });

    if (!hookResult?.result.current.pointHistories) return;

    const convertedData = pointHistoriesMock.map((pointHistory) =>
      fromNullToUndefined<PointHistoryEntityType>(pointHistory)
    );

    expect(hookResult?.result.current.isLoading).toBeFalsy();
    expect(hookResult?.result.current.pointHistories).toEqual(convertedData);
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

    let hookResult:
      | RenderHookResult<UseFetchPointHistoryType, unknown>
      | undefined;
    await act(async () => {
      hookResult = renderHook(() => useFetchPointHistory());
      await waitFor(() => !!hookResult?.result.current);
    });

    await act(async () => {
      await hookResult?.result.current.mutate();
    });

    expect(hookResult?.result.current.pointHistories).toBeUndefined();
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
