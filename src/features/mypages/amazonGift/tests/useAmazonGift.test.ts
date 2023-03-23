import { renderHook, act, waitFor, cleanup } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useAmazonGift } from '../useAmazonGift';
import { amazonGiftConfirmMock } from '../amazonGiftMock';

// afterEach(() => cleanup());

// describe('useAmazonGift', () => {
//   test('should exchange to amazon gifts.', async () => {
//     // 初期ステート
//     const defalultState = {
//       price: 0,
//       showExchangeDialog: false,
//       isExchange: false,
//       purchaseCompleted: false,
//     };

//     // 交換後のステート
//     const exchangedState = {
//       price: 0,
//       showExchangeDialog: true,
//       isExchange: false,
//       purchaseCompleted: true,
//     };

//     const { result } = renderHook(() => useAmazonGift(), {
//       wrapper: RecoilRoot,
//     });

//     await waitFor(() => {
//       expect(result.current.pointExchangeState).toEqual(defalultState);
//     });

//     await act(() => {
//       result.current.exchangeExec(1000);
//     });

//     await waitFor(() => {
//       expect(result.current.pointExchangeState).toEqual(exchangedState);
//     });
//   });

//   test('should fetched gift code', async () => {
//     const { result } = renderHook(() => useAmazonGift(), {
//       wrapper: RecoilRoot,
//     });

//     await act(() => {
//       result.current.showGiftCode('Mediistg0000000063', 'test');
//     });

//     await waitFor(() => {
//       expect(result.current.codeConfirmState.giftCode).toBe(
//         amazonGiftConfirmMock.gift_code
//       );
//     });
//   });
// });
