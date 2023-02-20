import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { profileMock } from '@/mocks/mocks';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const dummyUrl = 'https://jsonplaceholder.typicode.com/users'; // TODO: 正規のURLに変更する

describe('useFetchProfile', () => {
  test('should return profile data when fetch succeeds.', async () => {
    const { result } = renderHook(() => useFetchProfile());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.profile).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    const convertedData = fromNullToUndefined<ProfileEntityType>(profileMock);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.profile).toEqual(convertedData);
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

    const { result } = renderHook(() => useFetchProfile());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await act(async () => result.current.mutate());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toBeUndefined();
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
