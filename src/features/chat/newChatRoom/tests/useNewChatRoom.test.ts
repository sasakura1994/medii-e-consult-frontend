import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { DoctorEntity } from '@/types/entities/doctorEntity';
import { GroupEntity } from '@/types/entities/GroupEntity';
import { RecoilRoot } from 'recoil';

describe('useNewChatROom', () => {
  test('Select target doctor', async () => {
    const { result } = renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });
    const doctor = {
      account_id: 'account_id',
    } as DoctorEntity;

    act(() => {
      result.current.changeDoctor(doctor);
    });

    expect(result.current.doctor?.account_id).toBe(doctor.account_id);
    expect(result.current.chatRoom.target_doctor).toBe(doctor.account_id);
  });

  test('Select target group', async () => {
    const { result } = renderHook(() => useNewChatRoom(), {
      wrapper: RecoilRoot,
    });
    const group = {
      group_id: 'group_id',
    } as GroupEntity;

    act(() => {
      result.current.changeGroup(group);
    });

    expect(result.current.group?.group_id).toBe(group.group_id);
    expect(result.current.chatRoom.group_id).toBe(group.group_id);
  });
});
