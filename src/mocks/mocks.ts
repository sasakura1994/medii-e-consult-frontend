import type {
  ResponseResolver,
  DefaultBodyType,
  RestContext,
  RestRequest,
  PathParams,
} from 'msw';

/**
 * プロフィールモック
 */
export const profileMock = {
  commedical_speciality: 'KOKYUUKI',
  document_file_path: '',
  is_commedical: 0,
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
  hospital_id: '',
  hospital_name: 'TMG',
  graduated_university: 'null',
  is_invited: false,
  is_skip_confirmation_by_utm_source: false,
  questionary_selected_ids_csv: null,
  questionary_other: null,
};
export const getProfileMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(profileMock));
};
export const updateProfileMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200));
};

/**
 * Mediiポイントモック
 */
export const currentPointMock = {
  point: 8000,
};
export const getCurrentPointMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(currentPointMock));
};

/**
 * Mediiポイント履歴モック
 */
export const pointHistoriesMock = [
  {
    account_id: 'AC10-6226-9933-69',
    before: 1000,
    created_date: '2023-02-13T15:03:11',
    delta: 1500,
    ref_id: 'ser:3f818005-f94a-4367-b6e8-29cdec991f7a',
    uid: 415,
  },
  {
    account_id: 'AC10-6226-9933-69',
    before: 0,
    created_date: '2023-02-13T13:45:29',
    delta: 1000,
    ref_id: 'con:d8c8830a-2984-42d8-94bc-a71b77c5d290',
    uid: 414,
  },
];
export const getPointHistoriesMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(pointHistoriesMock));
};

/**
 * Amazonギフトリストモック
 */
export const amazonGiftsMock = [
  {
    uid: 63,
    created_date: '2023-02-20T15:55:32',
    status: 'CONFIRMED',
    size: 1000,
    request_id: 'Mediistg0000000063',
    last_displayed_date: null,
  },
  {
    uid: 64,
    created_date: '2023-02-21T15:55:32',
    status: 'CONFIRMED',
    size: 3000,
    request_id: 'Mediistg0000000064',
    last_displayed_date: null,
  },
];
export const getAmazonGiftsMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(amazonGiftsMock));
};
export const postAmazonGiftsMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200));
};

/**
 * Amazonギフトコード確認データモック
 */
export const amazonGiftConfirmMock = {
  code: 1,
  gift_code: 'CVTK-U92MC3-8BC8AA',
  message: '',
};
export const getAmazonGiftConfirmMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(amazonGiftsMock));
};
export const postAmazonGiftConfirmMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200));
};
