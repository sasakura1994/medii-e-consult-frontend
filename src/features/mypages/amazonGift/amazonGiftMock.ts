import type {
  ResponseResolver,
  DefaultBodyType,
  RestContext,
  RestRequest,
  PathParams,
} from 'msw';

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
