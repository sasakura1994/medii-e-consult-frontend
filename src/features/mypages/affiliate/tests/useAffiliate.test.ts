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

    // モック化する fetch 関数
    global.fetch = jest.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
        ok: true,
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: 'OK',
        type: 'basic',
        url: '',
      } as Response)
    );

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
    // fetch のモックをリセット
    (global.fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
    Object.assign(navigator, { clipboard: undefined });
    cleanup();
  });

  test('アカウントIDを含むURLが取得できること', async () => {
    (useToken as jest.Mock).mockReturnValue({ accountId: 'accountId' });
    const { result } = renderHook(() => useAffiliate());
    await waitFor(() => {
      expect(result.current.invitationUrl).toContain('accountId');
    });
  });
});
