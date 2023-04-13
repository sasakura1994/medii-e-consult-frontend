export type DoctorEntity = {
  doctor_id: string;
  account_id: string;
  last_name: string;
  first_name: string;
  last_name_hira: string;
  first_name_hira: string;
  speciality_1: string;
  speciality_2: string | null;
  speciality_3: string | null;
  speciality_4: string | null;
  hospital_id: string;
  hospital_name: string;
  graduated_university: string;
  qualified_year: number;
  qualification: string;
  expertise: string;
};
