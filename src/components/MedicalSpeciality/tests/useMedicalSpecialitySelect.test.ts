import { renderHook } from '@testing-library/react';
import { useMedicalSpecialitySelect } from '../useMedicalSpecialitySelect';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useMedicalSpecialitySelect', () => {
  describe('getMedicalSpecialitiesForCategory', () => {
    test('医学生は含まない', () => {
      const medicalSpecialities: MedicalSpecialityEntity[] = [
        { speciality_code: 'ALLERGY', medical_speciality_category_id: 'INTERNAL_MEDICINE' } as MedicalSpecialityEntity,
        { speciality_code: 'STUDENT', medical_speciality_category_id: 'OTHER' } as MedicalSpecialityEntity,
        { speciality_code: 'BYOURI', medical_speciality_category_id: 'OTHER' } as MedicalSpecialityEntity,
      ];

      const hooks = renderHook(() => useMedicalSpecialitySelect(medicalSpecialities), {}).result;

      expect(hooks.current.getMedicalSpecialitiesForCategory('OTHER')).toEqual([
        { speciality_code: 'BYOURI', medical_speciality_category_id: 'OTHER' } as MedicalSpecialityEntity,
      ]);
    });
  });
});
