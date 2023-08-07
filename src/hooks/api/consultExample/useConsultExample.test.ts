import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useConsultExample } from '../../../features/consultExample/useConsultExample';
import { useFetchMedicalSpecialities } from '../medicalCategory/useFetchMedicalSpecialities';
import { ConsultExampleEntity } from '@/types/entities/ConsultExampleEntity';

jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');

describe('useConsultExample', () => {
  const useFetchMedicalSpecialitiesMock =
    useFetchMedicalSpecialities as jest.Mocked<
      typeof useFetchMedicalSpecialities
    >;
  (useFetchMedicalSpecialitiesMock as jest.Mock).mockReturnValue({
    medicalSpecialities: [
      {
        speciality_code: 'speciality',
        name: 'speciality name',
      },
    ],
  });

  test('getAgeText', () => {
    const hookResult = renderHook(() => useConsultExample()).result;

    expect(hookResult.current.getAgeText(20)).toBe('20代');
    expect(hookResult.current.getAgeText(10)).toBe('10代');
    expect(hookResult.current.getAgeText(9)).toBe('小児(9歳)');
  });

  test('getCategoryName', () => {
    const hookResult = renderHook(() => useConsultExample()).result;

    expect(
      hookResult.current.getCategoryName({
        speciality_code: 'speciality',
      } as ConsultExampleEntity)
    ).toBe('speciality name');
  });

  test('getGenderText', () => {
    const hookResult = renderHook(() => useConsultExample()).result;

    expect(hookResult.current.getGenderText('man', 9)).toBe('男児');
    expect(hookResult.current.getGenderText('woman', 9)).toBe('女児');
    expect(hookResult.current.getGenderText('man', 10)).toBe('男性');
    expect(hookResult.current.getGenderText('woman', 10)).toBe('女性');
  });
});
