import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { act, renderHook } from '@testing-library/react';
import { useMedicalCareerSpecialities } from '../useMedicalCareerSpecialities';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { MedicalCareerProps } from '../MedicalCareer';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';

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

    const hooks = await renderHook(() => useMedicalCareerSpecialities(props as unknown as MedicalCareerProps), {
      wrapper: RecoilRoot,
    }).result;

    expect(hooks.current.selectedMedicalSpecialities).toEqual(medicalSpecialities);
  });

  test('moveSelectedMedicalSpeciality', async () => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<typeof useMedicalSpeciality>;
    (useMedicalSpecialityMock as jest.Mock).mockReturnValue({
      medicalSpecialities,
    });

    const selectMedicalSpecialities = jest.fn();

    const props = {
      profile: {
        main_speciality: 'ALLERGY',
        speciality_2: 'BYOURI',
        speciality_3: 'GANKA',
        speciality_4: 'HIHUKA',
      } as ProfileEntity,
      selectMedicalSpecialities,
    };

    const hooks = await renderHook(() => useMedicalCareerSpecialities(props as unknown as MedicalCareerProps), {
      wrapper: RecoilRoot,
    }).result;

    await act(() => hooks.current.moveSelectedMedicalSpeciality(1, 2));

    expect(selectMedicalSpecialities.mock.calls[0][0]).toEqual([
      medicalSpecialities[0],
      medicalSpecialities[2],
      medicalSpecialities[1],
      medicalSpecialities[3],
    ]);
  });

  test('toggleMedicalSpeciality', async () => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<typeof useMedicalSpeciality>;
    (useMedicalSpecialityMock as jest.Mock).mockReturnValue({
      medicalSpecialities,
    });

    const selectMedicalSpecialities = jest.fn();

    const props = {
      profile: {
        main_speciality: 'ALLERGY',
        speciality_2: 'BYOURI',
        speciality_3: 'GANKA',
        speciality_4: 'HIHUKA',
      } as ProfileEntity,
      selectMedicalSpecialities,
    };

    const hooks = await renderHook(() => useMedicalCareerSpecialities(props as unknown as MedicalCareerProps), {
      wrapper: RecoilRoot,
    }).result;

    await act(() => hooks.current.toggleMedicalSpeciality(medicalSpecialities[1]));

    expect(selectMedicalSpecialities.mock.calls[0][0]).toEqual([
      medicalSpecialities[0],
      medicalSpecialities[2],
      medicalSpecialities[3],
    ]);
  });
});
