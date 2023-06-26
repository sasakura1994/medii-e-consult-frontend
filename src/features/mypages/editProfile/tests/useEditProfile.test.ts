import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useEditProfile } from '@/features/mypages/editProfile/useEditProfile';
import * as useFetchHospitalModule from '@/hooks/api/hospital/useFetchHospital';
import { HospitalEntity } from '@/types/entities/hospitalEntity';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import * as useSearchHospitalsModule from '@/hooks/api/hospital/useSearchHospitals';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/api/hospital/useFetchHospital');
jest.mock('@/hooks/api/hospital/useSearchHospitals');

describe('useEditProfile', () => {
  describe('selectedHospital', () => {
    test('初期化時はプロフィールで選択された病院', async () => {
      const hospital = {
        hospital_id: 'hospital1',
        hospital_name: 'Hospital1',
      } as HospitalEntity;

      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          hospital_id: hospital.hospital_id,
        } as ProfileEntity,
      });

      const useFetchHospitalMock = useFetchHospitalModule as jest.Mocked<typeof useFetchHospitalModule>;
      useFetchHospitalMock.useFetchHospital.mockReturnValue({
        hospital,
      });

      const useSearchHospitalsMock = useSearchHospitalsModule as jest.Mocked<typeof useSearchHospitalsModule>;
      useSearchHospitalsMock.useSearchHospitals.mockReturnValue({
        hospitals: [hospital],
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.selectedHospital?.label).toBe(hospital.hospital_name);
      expect(hooks.current.selectedHospital?.value).toBe(hospital.hospital_id);
    });

    test('検索したものを選択後', async () => {
      const hospitals = [
        {
          hospital_id: 'hospital1',
          hospital_name: 'Hospital1',
        } as HospitalEntity,
        {
          hospital_id: 'hospital2',
          hospital_name: 'Hospital2',
        } as HospitalEntity,
      ];

      const useSearchHospitalsMock = useSearchHospitalsModule as jest.Mocked<typeof useSearchHospitalsModule>;
      useSearchHospitalsMock.useSearchHospitals.mockReturnValue({
        hospitals,
      });

      const profile = {
        birthday_year: 2000,
        birthday_month: 4,
        birthday_day: 1,
        qualified_year: 2020,
        hospital_id: hospitals[0].hospital_id,
      } as ProfileEntity;
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile,
      });

      const useFetchHospitalMock = useFetchHospitalModule as jest.Mocked<typeof useFetchHospitalModule>;
      useFetchHospitalMock.useFetchHospital.mockReturnValue({
        hospital: hospitals[0],
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      await act(() => {
        hooks.current.selectHospital({ value: hospitals[1].hospital_id, label: hospitals[1].hospital_name });
      });

      expect(hooks.current.selectedHospital?.label).toBe(hospitals[1].hospital_name);
      expect(hooks.current.selectedHospital?.value).toBe(hospitals[1].hospital_id);
    });
  });
});
