import type { ResponseResolver, DefaultBodyType, RestContext, RestRequest, PathParams } from 'msw';

/**
 * プロフィールモック
 */
export const profileMock = {
  document_file_path: '',
  document: null,
  last_name: '蜂谷',
  first_name: '庸正',
  last_name_hira: 'はちや',
  first_name_hira: 'つねまさ',
  birthday_year: 1978,
  birthday_month: 10,
  birthday_day: 7,
  main_speciality: 'KOKYUUKI',
  speciality_2: 'SOUGOUNAIKA',
  speciality_3: '',
  speciality_4: '',
  medical_specialities: ['SOUGOUNAIKA'],
  qualification: '',
  expertise: '',
  confimation_type: 'number',
  qualified_year: 1999,
  doctor_qualified_year: 1999,
  doctor_qualified_month: 10,
  doctor_qualified_day: 7,
  doctor_number: '888888',
  tel: '',
  status: 'VERIFIED',
  need_to_send_confimation: false,
  is_imperfect_profile: false,
  is_hospital_doctor: false,
  is_mail_notify: false,
  is_push_notify: true,
  not_seminar_mail_target: true,
  want_to_be_consultant: true,
  assignable: 0,
  graduation_year: null,
  use_prefecture: null,
  prefecture_code: '11',
  hospital_id: 'HS11-21-0206-09',
  hospital_name: '',
  graduated_university: 'null',
  is_invited: false,
  is_skip_confirmation_by_utm_source: false,
  questionary_selected_ids_csv: null,
  questionary_other: null,
};
export const getProfileMock: ResponseResolver<RestRequest<never, PathParams<string>>, RestContext, DefaultBodyType> = (
  req,
  res,
  ctx
) => {
  return res(ctx.status(200), ctx.json(profileMock));
};
export const updateProfileMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200));
};
