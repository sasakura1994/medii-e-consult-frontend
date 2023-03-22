import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { profileMock } from '@/mocks/profileMock';
import type { ProfileEntityType } from '@/types/entities/profileEntity';

const dummyToken = 'test-token';

describe('useFetchProfile', () => {
  test('should return profile data when fetch succeeds.', async () => {
    const { result } = renderHook(() => useFetchProfile(dummyToken));

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
      rest.get('/api/doctor/profile', (_, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useFetchProfile(dummyToken));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await act(async () => result.current.mutate());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.profile).toBeUndefined();
    expect(result.current.error).toEqual({
      message: 'サーバーでエラーが発生しました',
      status: 500,
      url: '/api/doctor/profile',
    });

    await act(async () => {
      await result.current.mutate(undefined, false);
    });
  });
});
