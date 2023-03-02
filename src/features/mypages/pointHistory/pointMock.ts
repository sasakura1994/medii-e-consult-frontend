import type {
  ResponseResolver,
  DefaultBodyType,
  RestContext,
  RestRequest,
  PathParams,
} from 'msw';

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
