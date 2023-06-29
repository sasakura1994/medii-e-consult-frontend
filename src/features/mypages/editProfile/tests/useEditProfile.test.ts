import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useEditProfile } from '@/features/mypages/editProfile/useEditProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { HospitalEntity } from '@/types/entities/hospitalEntity';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useSearchHospitals } from '@/hooks/api/hospital/useSearchHospitals';
import { loadLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/api/hospital/useFetchHospital');
jest.mock('@/hooks/api/hospital/useSearchHospitals');
jest.mock('@/libs/LocalStorageManager');

describe('useEditProfile', () => {
  const hospital = {
    hospital_id: 'hospital1',
    hospital_name: 'hospital1_name',
  } as HospitalEntity;

  const useFetchHospitalMock = useFetchHospital as jest.Mocked<typeof useFetchHospital>;
  (useFetchHospitalMock as jest.Mock).mockReturnValue({
    hospital,
  });

  const useSearchHospitalsMock = useSearchHospitals as jest.Mocked<typeof useSearchHospitals>;
  (useSearchHospitalsMock as jest.Mock).mockReturnValue({
    hospitals: [],
  });

  describe('初期化', () => {
    test('病院を選択している場合', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          hospital_id: 'hospital1',
          hospital_name: '',
        } as ProfileEntity,
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.hospitalInputType).toEqual('select');
    });

    test('病院が自由入力の場合', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          hospital_id: '',
          hospital_name: 'free input',
        } as ProfileEntity,
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.hospitalInputType).toEqual('free');
    });

    test('下書きがある場合', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {} as ProfileEntity,
      });

      const loadLocalStorageMock = loadLocalStorage as jest.Mocked<typeof loadLocalStorage>;
      (loadLocalStorageMock as jest.Mock).mockReturnValue(
        JSON.stringify({
          last_name: 'draft_last_name',
          hospital_id: '',
          hospital_name: 'free input',
        } as ProfileEntity)
      );

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: true }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.hospitalInputType).toEqual('free');
      expect(hooks.current.profile?.last_name).toEqual('draft_last_name');
    });

    test('下書きがあるが編集時の場合は使わない', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          last_name: 'not draft',
          hospital_id: '',
          hospital_name: 'free input not draft',
        } as ProfileEntity,
      });

      const loadLocalStorageMock = loadLocalStorage as jest.Mocked<typeof loadLocalStorage>;
      (loadLocalStorageMock as jest.Mock).mockReturnValue(
        JSON.stringify({
          last_name: 'draft',
          hospital_id: '',
          hospital_name: 'free input',
        } as ProfileEntity)
      );

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.profile?.last_name).toEqual('not draft');
    });
  });

  describe('setProfileFields', () => {
    test('プロフィールを更新', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          last_name: 'before',
          hospital_id: '',
          hospital_name: 'free input not draft',
        } as ProfileEntity,
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      await act(() => {
        hooks.current.setProfileFields({ last_name: 'after' });
      });

      expect(hooks.current.profile?.last_name).toEqual('after');
      expect(saveLocalStorage).not.toHaveBeenCalled();
    });

    test('登録時の場合は下書きにも保存', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          last_name: 'before',
          hospital_id: '',
          hospital_name: 'free input not draft',
        } as ProfileEntity,
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: true }), {
        wrapper: RecoilRoot,
      }).result;

      await act(() => {
        hooks.current.setProfileFields({ last_name: 'after' });
      });

      expect(hooks.current.profile?.last_name).toEqual('after');
      expect(saveLocalStorage).toHaveBeenCalled();
    });
  });

  describe('selectedHospital', () => {
    test('デフォルトの病院を選択肢として初期化', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          main_speciality: 'STUDENT',
        } as ProfileEntity,
      });

      const hospital = {
        hospital_id: 'hospital1',
        hospital_name: 'hospital1_name',
      } as HospitalEntity;

      const useFetchHospitalMock = useFetchHospital as jest.Mocked<typeof useFetchHospital>;
      (useFetchHospitalMock as jest.Mock).mockReturnValue({
        hospital,
      });

      const useSearchHospitalsMock = useSearchHospitals as jest.Mocked<typeof useSearchHospitals>;
      (useSearchHospitalsMock as jest.Mock).mockReturnValue({
        hospitals: [],
      });

      const hooks = await renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.selectedHospital).toEqual({ label: hospital.hospital_name, value: hospital.hospital_id });
    });
  });

  describe('selectedHospital', () => {
    test('初期化時はプロフィールで選択された病院', async () => {
      const hospital = {
        hospital_id: 'hospital1',
        hospital_name: 'Hospital1',
      } as HospitalEntity;

      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          hospital_id: hospital.hospital_id,
        } as ProfileEntity,
      });

      const useFetchHospitalMock = useFetchHospital as jest.Mocked<typeof useFetchHospital>;
      (useFetchHospitalMock as jest.Mock).mockReturnValue({
        hospital,
      });

      const useSearchHospitalsMock = useSearchHospitals as jest.Mocked<typeof useSearchHospitals>;
      (useSearchHospitalsMock as jest.Mock).mockReturnValue({
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

      const useSearchHospitalsMock = useSearchHospitals as jest.Mocked<typeof useSearchHospitals>;
      (useSearchHospitalsMock as jest.Mock).mockReturnValue({
        hospitals,
      });

      const profile = {
        birthday_year: 2000,
        birthday_month: 4,
        birthday_day: 1,
        qualified_year: 2020,
        hospital_id: hospitals[0].hospital_id,
      } as ProfileEntity;
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile,
      });

      const useFetchHospitalMock = useFetchHospital as jest.Mocked<typeof useFetchHospital>;
      (useFetchHospitalMock as jest.Mock).mockReturnValue({
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
