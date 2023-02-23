import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { useFetchPointHistory } from '@/hooks/useFetchPointHistory';
import { pointHistoriesMock } from '@/mocks/mocks';
import type { PointHistoryEntityType } from '@/types/entities/pointHistoryEntity';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users/1'; // TODO: 正規のURLに変更する

describe('useFetchPointHistory', () => {
  test('should return pointHistories data when fetch succeeds.', async () => {
    const { result } = renderHook(() => useFetchPointHistory());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.pointHistories).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    const convertedData = pointHistoriesMock.map((pointHistory) =>
      fromNullToUndefined<PointHistoryEntityType>(pointHistory)
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.pointHistories).toEqual(convertedData);
      expect(result.current.error).toBeUndefined();
    });

    await act(async () => {
      await result.current.mutate(undefined, false);
    });
  });

  test('should handle 500 error.', async () => {
    server.use(
      rest.get(dummyUrl, (_, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useFetchPointHistory());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pointHistories).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await act(async () => result.current.mutate());

    expect(result.current.pointHistories).toBeUndefined();
    expect(result.current.error).toEqual({
      message: 'サーバーでエラーが発生しました',
      status: 500,
      url: dummyUrl,
    });

    await act(async () => {
      await result.current.mutate(undefined, false);
    });
  });
});
