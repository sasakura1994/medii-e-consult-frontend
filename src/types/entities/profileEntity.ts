export type ProfileEntity = {
  commedical_speciality: string;
  document_file_path: string;
  is_commedical: number;
  document: File | undefined | null;
  last_name: string;
  first_name: string;
  last_name_hira: string;
  first_name_hira: string;
  birthday_year: number;
  birthday_month: number;
  birthday_day: number;
  main_speciality: string;
  speciality_2: string;
  speciality_3: string;
  speciality_4: string;
  medical_specialities: string[];
  qualification: string;
  expertise: string;
  confimation_type: string;
  qualified_year: number;
  doctor_qualified_year: number;
  doctor_qualified_month: number;
  doctor_qualified_day: number;
  doctor_number: string;
  tel: string;
  status: string;
  need_to_send_confimation: boolean;
  is_imperfect_profile: boolean;
  is_hospital_doctor: boolean;
  is_mail_notify: boolean;
  is_push_notify: boolean;
  not_seminar_mail_target: boolean;
  want_to_be_consultant: boolean;
  assignable: number;
  graduation_year: string | undefined | null;
  use_prefecture: string | undefined | null;
  prefecture_code: string;
  hospital_id: string;
  hospital_name: string;
  graduated_university: string | undefined | null;
  is_invited: boolean;
  is_skip_confirmation_by_utm_source: boolean;
  questionary_selected_ids_csv: string | undefined | null;
  questionary_other: string | undefined | null;
};
