import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { GroupEntity } from '@/types/entities/GroupEntity';

describe('useNewChatROom', () => {
  test('Select target doctor', async () => {
    const { result } = renderHook(() => useNewChatRoom());
    const doctor = {
      account_id: 'account_id',
    } as DoctorEntity;

    act(() => {
      result.current.changeDoctor(doctor);
    });

    expect(result.current.doctor?.account_id).toBe(doctor.account_id);
    expect(result.current.formData.target_doctor).toBe(doctor.account_id);
  });

  test('Select target group', async () => {
    const { result } = renderHook(() => useNewChatRoom());
    const group = {
      group_id: 'group_id',
    } as GroupEntity;

    act(() => {
      result.current.changeGroup(group);
    });

    expect(result.current.group?.group_id).toBe(group.group_id);
    expect(result.current.formData.group_id).toBe(group.group_id);
  });
});
