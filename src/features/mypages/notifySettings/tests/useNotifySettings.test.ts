import { renderHook, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useNotifySettings } from '../useNotifySettings';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';
import * as useUpdateProfileModule from '@/hooks/api/doctor/useUpdateProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/api/doctor/useUpdateProfile');

type UseNotifySettingsType = ReturnType<typeof useNotifySettings>;

describe('NotifySettings', () => {
  beforeEach(() => {
    const useUpdateProfileMock = useUpdateProfileModule as jest.Mocked<
      typeof useUpdateProfileModule
    >;
    useUpdateProfileMock.useUpdateProfile.mockReturnValue({
      updateProfile: jest.fn().mockResolvedValue({}),
    });
  });

  test('メール・プッシュ通知両方受け取るを選択した場合に状態が変わること', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
      typeof useFetchProfileModule
    >;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        is_mail_notify: false,
        is_push_notify: false,
      } as ProfileEntity,
    });

    let hoooResult: { current: UseNotifySettingsType } | undefined;
    await act(() => {
      // useNotifySettings が呼ばれると 非同期（useFetchProfile）が走るので act で処理の完了を待つ
      hoooResult = renderHook(() => useNotifySettings(), {
        wrapper: RecoilRoot,
      }).result;
    });

    act(() => {
      const target = {
        target: { value: 'mail-push' },
      } as React.ChangeEvent<HTMLInputElement>;
      hoooResult?.current.changeNotifyNew(target);
    });

    expect(hoooResult?.current.profile?.is_mail_notify).toBe(true);
    expect(hoooResult?.current.profile?.is_push_notify).toBe(true);
  });

  test('メール通知を選択した場合に状態が変わること', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
      typeof useFetchProfileModule
    >;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        is_mail_notify: false,
        is_push_notify: true,
      } as ProfileEntity,
    });

    let hoooResult: { current: UseNotifySettingsType } | undefined;
    await act(() => {
      hoooResult = renderHook(() => useNotifySettings(), {
        wrapper: RecoilRoot,
      }).result;
    });

    act(() => {
      const target = {
        target: { value: 'mail' },
      } as React.ChangeEvent<HTMLInputElement>;
      hoooResult?.current.changeNotifyNew(target);
    });

    expect(hoooResult?.current.profile?.is_mail_notify).toBe(true);
    expect(hoooResult?.current.profile?.is_push_notify).toBe(false);
  });

  test('プッシュ通知を選択した場合に状態が変わること', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
      typeof useFetchProfileModule
    >;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        is_mail_notify: true,
        is_push_notify: false,
      } as ProfileEntity,
    });

    let hoooResult: { current: UseNotifySettingsType } | undefined;
    await act(() => {
      hoooResult = renderHook(() => useNotifySettings(), {
        wrapper: RecoilRoot,
      }).result;
    });

    act(() => {
      const target = {
        target: { value: 'push' },
      } as React.ChangeEvent<HTMLInputElement>;
      hoooResult?.current.changeNotifyNew(target);
    });

    expect(hoooResult?.current.profile?.is_mail_notify).toBe(false);
    expect(hoooResult?.current.profile?.is_push_notify).toBe(true);
  });

  test('メール通知を受け取るを選択した場合に状態が変わること', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
      typeof useFetchProfileModule
    >;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        not_seminar_mail_target: true,
      } as ProfileEntity,
    });

    let hoooResult: { current: UseNotifySettingsType } | undefined;
    await act(() => {
      hoooResult = renderHook(() => useNotifySettings(), {
        wrapper: RecoilRoot,
      }).result;
    });

    act(() => {
      const target = {
        target: { value: 'permit' },
      } as React.ChangeEvent<HTMLInputElement>;
      hoooResult?.current.changeNotifySeminar(target);
    });

    expect(hoooResult?.current.profile?.not_seminar_mail_target).toBe(false);
  });

  test('メール通知を受け取らないを選択した場合に状態が変わること', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
      typeof useFetchProfileModule
    >;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        not_seminar_mail_target: false,
      } as ProfileEntity,
    });

    let hoooResult: { current: UseNotifySettingsType } | undefined;
    await act(() => {
      hoooResult = renderHook(() => useNotifySettings(), {
        wrapper: RecoilRoot,
      }).result;
    });

    act(() => {
      const target = {
        target: { value: 'deny' },
      } as React.ChangeEvent<HTMLInputElement>;
      hoooResult?.current.changeNotifySeminar(target);
    });

    expect(hoooResult?.current.profile?.not_seminar_mail_target).toBe(true);
  });

  test('通知設定の更新が正常に完了した場合 isError は false であること', async () => {
    let hoooResult: { current: UseNotifySettingsType } | undefined;
    await act(() => {
      hoooResult = renderHook(() => useNotifySettings(), {
        wrapper: RecoilRoot,
      }).result;
    });

    await act(() => {
      hoooResult?.current.update();
    });

    expect(hoooResult?.current.isError).toBe(false);
  });
});
