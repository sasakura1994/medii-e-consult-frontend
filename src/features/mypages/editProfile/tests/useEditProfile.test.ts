import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import { useEditProfile } from '@/features/mypages/editProfile/useEditProfile';
import { useFetchHospital } from '@/hooks/api/hospital/useFetchHospital';
import { HospitalEntity } from '@/types/entities/hospitalEntity';
import { useFetchProfile, mutateFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useSearchHospitals } from '@/hooks/api/hospital/useSearchHospitals';
import { loadLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useRouter } from 'next/router';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/api/hospital/useFetchHospital');
jest.mock('@/hooks/api/hospital/useSearchHospitals');
jest.mock('@/hooks/api/doctor/useUpdateProfile');
jest.mock('@/libs/LocalStorageManager');
jest.mock('next/router');

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
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: true }), {
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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.profile?.last_name).toEqual('not draft');
    });
  });

  describe('setProfileFields', () => {
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: true }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
        hooks.current.setProfileFields({ last_name: 'after' });
      });

      expect(hooks.current.profile?.last_name).toEqual('after');
      expect(saveLocalStorage).toHaveBeenCalled();
    });
  });

  describe('setHospitalName', () => {
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

    test('病院の自由入力', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          hospital_id: 'hospital',
          hospital_name: '',
        } as ProfileEntity,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
        hooks.current.setHospitalName('hospital name');
      });

      expect(hooks.current.profile?.hospital_name).toEqual('hospital name');
      expect(hooks.current.hospitalInputType).toEqual('free');
    });
  });

  describe('selectedHospital', () => {
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.selectedHospital).toEqual({ label: hospital.hospital_name, value: hospital.hospital_id });
    });
  });

  describe('selectedHospital', () => {
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
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

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
        hooks.current.selectHospital({ value: hospitals[1].hospital_id, label: hospitals[1].hospital_name });
      });

      expect(hooks.current.selectedHospital?.label).toBe(hospitals[1].hospital_name);
      expect(hooks.current.selectedHospital?.value).toBe(hospitals[1].hospital_id);
    });
  });

  describe('selectMedicalSpecialities', () => {
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

    test('科を選択', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          main_speciality: '',
          speciality_2: '',
          speciality_3: '',
          speciality_4: '',
        } as ProfileEntity,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
        hooks.current.selectMedicalSpecialities([
          { speciality_code: 'A' } as MedicalSpecialityEntity,
          { speciality_code: 'B' } as MedicalSpecialityEntity,
          { speciality_code: 'C' } as MedicalSpecialityEntity,
          { speciality_code: 'D' } as MedicalSpecialityEntity,
        ]);
      });

      expect(hooks.current.profile?.main_speciality).toEqual('A');
      expect(hooks.current.profile?.speciality_2).toEqual('B');
      expect(hooks.current.profile?.speciality_3).toEqual('C');
      expect(hooks.current.profile?.speciality_4).toEqual('D');
    });
  });

  describe('submit', () => {
    test('プロフィールの更新処理', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
        } as ProfileEntity,
      });

      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        push: pushMock,
      });

      const updateProfileMock = jest.fn().mockResolvedValue({ response: { data: {} } });
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: updateProfileMock,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      await act(() => {
        hooks.current.submit();
      });

      expect(mutateFetchProfile).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith('/editprofile/completed');
      expect(updateProfileMock).toHaveBeenCalled();
    });

    test('新規登録時は医師確認へ', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
        } as ProfileEntity,
      });

      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });

      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        push: pushMock,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: true }), {
        wrapper: RecoilRoot,
      }).result;

      await act(() => {
        hooks.current.submit();
      });

      expect(pushMock).toHaveBeenCalledWith('/document');
    });
  });

  describe('toggleQuestionaryItem', () => {
    beforeEach(() => {
      const useUpdateProfileMock = useUpdateProfile as unknown as jest.Mock<typeof useUpdateProfile>;
      (useUpdateProfileMock as jest.Mock).mockReturnValue({
        updateProfile: jest.fn().mockResolvedValue({ data: {} }),
      });
    });

    test('アンケート項目を追加で選択', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          questionary_selected_ids_csv: '1,2',
        } as ProfileEntity,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
        hooks.current.toggleQuestionaryItem(3);
      });

      expect(hooks.current.profile?.questionary_selected_ids_csv).toEqual('1,2,3');
    });

    test('アンケート項目を非選択に', async () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          questionary_selected_ids_csv: '1,2,3',
        } as ProfileEntity,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: false }), {
        wrapper: RecoilRoot,
      }).result;

      act(() => {
        hooks.current.toggleQuestionaryItem(2);
      });

      expect(hooks.current.profile?.questionary_selected_ids_csv).toEqual('1,3');
    });
  });

  describe('saveProfile', () => {
    test('通知設定がデフォルト（両方オフ）の場合は両方オンにする', async () => {
      (loadLocalStorage as jest.Mock).mockReturnValue(undefined);

      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          is_mail_notify: false,
          is_push_notify: false,
          graduated_university: 'uni',
          hospital_name: '',
        } as ProfileEntity,
      });

      const updateProfile = jest.fn();
      updateProfile.mockResolvedValue({
        data: {},
      });
      const useUpdateProfileMock = useUpdateProfile as jest.Mock;
      useUpdateProfileMock.mockReturnValue({
        updateProfile,
      });

      const hooks = renderHook(() => useEditProfile({ isRegisterMode: true }), {
        wrapper: RecoilRoot,
      }).result;

      await act(async () => await hooks.current.saveProfile());

      const formData = new FormData();
      formData.append('birthday_year', '2000');
      formData.append('birthday_month', '4');
      formData.append('birthday_day', '1');
      formData.append('qualified_year', '2020');
      formData.append('is_mail_notify', 'true');
      formData.append('is_push_notify', 'true');
      formData.append('graduated_university', 'uni');
      formData.append('hospital_name', '');

      const calledFormData = updateProfile.mock.calls[0][0] as FormData;

      expect(Array.from(calledFormData.keys())).toMatchObject(Array.from(formData.keys()));
      expect(Array.from(calledFormData.values())).toMatchObject(Array.from(formData.values()));
    });
  });
});
