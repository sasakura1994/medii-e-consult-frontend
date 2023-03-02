import 'cross-fetch/polyfill';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAffiliate } from '../useAffiliate';
import { UseAffiliateType } from '../useAffiliate';

const mockAccountId = 'example_account_id';
const mockQrCodeUrl = 'http://example.com/qr_code.png';
const mockClipboardUrl = 'http://example.com/clipboard';

describe('useAffiliate', () => {
  beforeEach(() => {
    // createObjectURL のモック
    global.URL.createObjectURL = jest.fn().mockReturnValue(mockQrCodeUrl);

    // navigator のモック
    Object.assign(navigator, {
      clipboard: {
        text: '',
        readText() {
          return Promise.resolve(this.text);
        },
        writeText(data: string) {
          this.text = data;
          return Promise.resolve();
        },
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Object.assign(navigator, { clipboard: undefined });
  });

  test('should get qrcode url when to called fetchQrCode.', async () => {
    let hookResult: { current: UseAffiliateType } | undefined;
    await act(() => {
      hookResult = renderHook(() => useAffiliate(mockAccountId)).result;
    });

    expect(hookResult?.current.isError).toBe(false);
    expect(hookResult?.current.qrCodeUrl).toBe(mockQrCodeUrl);
  });
});
