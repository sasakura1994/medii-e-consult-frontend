import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useMedicalCareerSpecialities } from '../useMedicalCareerSpecialities';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { MedicalCareerSpecialitiesProps } from '../MedicalCareerSpecialities';

jest.mock('@/hooks/medicalSpeciality/useMedicalSpeciality');

const medicalSpecialities: MedicalSpecialityEntity[] = [
  { speciality_code: 'ALLERGY', name: 'アレルギー内科' } as MedicalSpecialityEntity,
  { speciality_code: 'BYOURI', name: '病理科' } as MedicalSpecialityEntity,
  { speciality_code: 'GANKA', name: '眼科' } as MedicalSpecialityEntity,
  { speciality_code: 'HIHUKA', name: '皮膚科' } as MedicalSpecialityEntity,
];

describe('useMedicalCareerSpecialities', () => {
  test('editProfileMode', async () => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<typeof useMedicalSpeciality>;
    (useMedicalSpecialityMock as jest.Mock).mockReturnValue({
      medicalSpecialities,
    });

    const props = {
      profile: {
        main_speciality: 'ALLERGY',
        speciality_2: 'BYOURI',
        speciality_3: 'GANKA',
        speciality_4: 'HIHUKA',
      } as ProfileEntity,
    };

    const hooks = await renderHook(
      () => useMedicalCareerSpecialities(props as unknown as MedicalCareerSpecialitiesProps),
      {}
    ).result;

    expect(hooks.current.selectedMedicalSpecialities).toEqual(medicalSpecialities.slice(1));
  });
});
