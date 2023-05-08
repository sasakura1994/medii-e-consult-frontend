import { act, renderHook, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useClipboard } from '@/hooks/useClipboard';

const mockAccountId = 'example_account_id';
const clipboardUrl = `https://example.com/NewChatRoom?target_account_id=${mockAccountId}`;

// トーストライブラリのモック化
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('useClipboard', () => {
  let writeTextMock: jest.Mock;

  beforeAll(() => {
    // navigator.clipboard.writeText をモックする
    writeTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      configurable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {},
      configurable: true,
    });
  });

  test('should return the initial state', () => {
    const { result } = renderHook(() => useClipboard(clipboardUrl));
    expect(result.current.isError).toBe(false);
  });

  test('should copy the URL to the clipboard', async () => {
    const { result } = renderHook(() => useClipboard(clipboardUrl));
    await act(() => result.current.clipboard());
    await waitFor(() => {
      // テスト環境でクリップボードに書き込めないため、
      // navigator.clipboard.writeText が呼び出されたことだけを確認する
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(clipboardUrl);
    });
  });

  test('should show a toast message if one is provided', async () => {
    const successMessage = 'Successfully copied.';
    const { result } = renderHook(() => useClipboard(clipboardUrl));
    await act(() => result.current.clipboard(successMessage));
    await waitFor(() => {
      // テスト環境で toast ライブラリが機能しないため、
      // toast が呼び出されたことだけを確認する
      expect(toast).toHaveBeenCalledWith(successMessage);
    });
  });

  test('should show an error message if the copy fails', async () => {
    // navigator.clipboard.writeText をスローするためのモック関数を作成する
    navigator.clipboard.writeText = jest.fn(() => {
      throw new Error('Copy failed');
    });
    const { result } = renderHook(() => useClipboard(clipboardUrl));
    await act(() => result.current.clipboard());
    await waitFor(() => {
      // エラーが発生した場合、toast にエラーメッセージが表示されることを確認する
      expect(toast).toHaveBeenCalledWith('コピーに失敗しました。');
      expect(result.current.isError).toBe(true);
    });
  });
});
