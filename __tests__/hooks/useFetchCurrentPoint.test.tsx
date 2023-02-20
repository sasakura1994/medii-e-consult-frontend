import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { useFetchCurrentPoint } from '@/hooks/useFetchCurrentPoint';
import { currentPointMock } from '@/mocks/mocks';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users/2';

describe('useFetchCurrentPoint', () => {
  test('should return currentPoint data when fetch succeeds.', async () => {
    const { result } = renderHook(() => useFetchCurrentPoint());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.currentPoint).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.currentPoint).toEqual(currentPointMock.point);
      expect(result.current.error).toBeUndefined();
    });

    // swr のキャッシュクリア
    await act(async () => result.current.mutate(undefined, false));
  });

  test('should handle 500 error.', async () => {
    server.use(
      rest.get(dummyUrl, (_, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useFetchCurrentPoint());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentPoint).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    // API実行後にエラーを受け取りたいのでキャッシュを更新する
    await act(async () => result.current.mutate());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentPoint).toBeUndefined();
    expect(result.current.error).toEqual({
      message: 'サーバーでエラーが発生しました',
      status: 500,
      url: dummyUrl,
    });

    await act(async () => result.current.mutate(undefined, false));
  });
});
