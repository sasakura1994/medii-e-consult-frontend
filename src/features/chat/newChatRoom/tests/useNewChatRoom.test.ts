import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { DoctorEntity } from '@/types/entities/doctorEntity';

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
});
