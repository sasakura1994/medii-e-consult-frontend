import { renderHook } from '@testing-library/react';
import { useQuestionary } from '@/features/questionary/useQuestionary';
import { useToken } from '@/hooks/authentication/useToken';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/router';

jest.mock('@/hooks/authentication/useToken');
jest.mock('@/hooks/useProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useQuestionary', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { HUBSPOT_PORTAL_ID: 'test_hubspot_portal_id' });
  });
  test('isAvailableが正しく設定されること', () => {
    (useToken as jest.Mock).mockReturnValue({ accountId: 'test_account_id' });
    (useProfile as jest.Mock).mockReturnValue({
      email: { mail_address: 'test@example.com' },
      profile: { status: 'PENDING_MANUAL' },
    });
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: 'test_id' },
    });

    const { result } = renderHook(() => useQuestionary());

    expect(result.current.isAvailable).toBe(true);
  });

  test('profileがCREATEDの場合、isAvailableがfalseになること', () => {
    (useToken as jest.Mock).mockReturnValue({ accountId: 'test_account_id' });
    (useProfile as jest.Mock).mockReturnValue({
      email: { mail_address: 'test@example.com' },
      profile: { status: 'CREATED' },
    });
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: 'test_id' },
    });

    const { result } = renderHook(() => useQuestionary());

    expect(result.current.isAvailable).toBe(false);
  });

  test('formIdがない場合、isAvailableがfalseになること', () => {
    (useToken as jest.Mock).mockReturnValue({ accountId: 'test_account_id' });
    (useProfile as jest.Mock).mockReturnValue({
      email: { mail_address: 'test@example.com' },
      profile: { status: 'PENDING_MANUAL' },
    });
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '' },
    });

    const { result } = renderHook(() => useQuestionary());

    expect(result.current.isAvailable).toBe(false);
  });
});
