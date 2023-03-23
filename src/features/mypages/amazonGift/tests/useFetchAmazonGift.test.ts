import { renderHook, act, waitFor, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { useFetchAmazonGift } from '../useFetchAmazonGift';
import { amazonGiftsMock } from '../amazonGiftMock';
import type { AmazonGiftEntityType } from '../amazonGiftEntity';

const url = 'https://jsonplaceholder.typicode.com/users/4'; // TODO: 正規のURLに変える

// afterEach(() => cleanup());

// describe('useFetchAmazonGift', () => {
//   test('should fetch amazon gift data.', async () => {
//     const { result } = renderHook(() => useFetchAmazonGift());

//     expect(result.current.isLoading).toBe(true);
//     expect(result.current.amazonGifts).toBeUndefined();
//     expect(result.current.error).toBeUndefined();

//     const convertedData = amazonGiftsMock.map((amazonGift) =>
//       fromNullToUndefined<AmazonGiftEntityType>(amazonGift)
//     );

//     await waitFor(() => {
//       expect(result.current.isLoading).toBe(false);
//       expect(result.current.amazonGifts).toEqual(convertedData);
//       expect(result.current.error).toBeUndefined();
//     });

//     // swr のキャッシュクリア
//     await act(async () => result.current.mutate(undefined, false));
//   });

//   test('should handle 500 error.', async () => {
//     server.use(
//       rest.get(url, (_, res, ctx) => {
//         return res.once(ctx.status(500));
//       })
//     );

//     const { result } = renderHook(() => useFetchAmazonGift());

//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.amazonGifts).toBeUndefined();
//     expect(result.current.error).toBeUndefined();

//     await act(async () => result.current.mutate());

//     expect(result.current.amazonGifts).toBeUndefined();
//     expect(result.current.error).toEqual({
//       message: 'サーバーでエラーが発生しました',
//       status: 500,
//       url: url,
//     });

//     await act(async () => {
//       await result.current.mutate(undefined, false);
//     });
//   });
// });
