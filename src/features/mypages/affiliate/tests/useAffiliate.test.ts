import 'cross-fetch/polyfill';
import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { useAffiliate } from '../useAffiliate';
import { useToken } from '@/hooks/authentication/useToken';

const mockQrCodeUrl = 'http://example.com/qr_code.png';

jest.mock('@/hooks/authentication/useToken', () => ({
  useToken: jest.fn(),
}));

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
    jest.resetAllMocks();
    Object.assign(navigator, { clipboard: undefined });
    cleanup();
  });

  test('should get qrcode url when to called fetchQrCode.', async () => {
    (useToken as jest.Mock).mockReturnValue({ accountId: 'accountId' });
    const { result } = renderHook(() => useAffiliate());
    await waitFor(() => {
      expect(result.current.isError).toBe(false);
      expect(result.current.qrCodeUrl).toBe(mockQrCodeUrl);
    });
  });

  test('アカウントIDを含むURLが取得できること', async () => {
    (useToken as jest.Mock).mockReturnValue({ accountId: 'accountId' });
    const { result } = renderHook(() => useAffiliate());
    await waitFor(() => {
      expect(result.current.invitationUrl).toContain('accountId');
    });
  });
});
