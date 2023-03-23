import { renderHook, act } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { useSWRConfig } from 'swr';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import { profileMock } from '@/mocks/profileMock';

const dummyToken = 'test-token';

describe('useUpdateProfile', () => {
  test.todo('Need to implement: should update profile.');
  //   test('should update profile.', async () => {
  //     const updateData = {
  //       ...profileMock,
  //       is_mail_notify: false,
  //       is_push_notify: true,
  //       not_seminar_mail_target: false,
  //     };

  //     const { result } = renderHook(() => useUpdateProfile(dummyToken));

  //     expect(result.current.isSuccess).toBe(false);
  //     expect(result.current.isError).toBe(false);

  //     await act(async () => result.current.updateProfile(updateData));

  //     expect(result.current.isSuccess).toBe(true);
  //     expect(result.current.isError).toBe(false);
  //   });

  test.todo('Need to implement: should handle 500 error.');
  //   test('should handle 500 error.', async () => {
  //     const updateData = {
  //       ...profileMock,
  //       is_mail_notify: false,
  //       is_push_notify: true,
  //       not_seminar_mail_target: false,
  //     };

  //     server.use(
  //       rest.post('/api/doctor/update_profile', (_, res, ctx) => {
  //         return res.once(ctx.status(500));
  //       })
  //     );

  //     const { result } = renderHook(() => useUpdateProfile(dummyToken));

  //     expect(result.current.isSuccess).toBe(false);
  //     expect(result.current.isError).toBe(false);

  //     await act(async () => {
  //       result.current.updateProfile(updateData);
  //     });

  //     expect(result.current.isSuccess).toBe(false);
  //     expect(result.current.isError).toBe(true);
  //   });
});
