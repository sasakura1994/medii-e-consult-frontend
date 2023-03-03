import type {
  ResponseResolver,
  DefaultBodyType,
  RestContext,
  RestRequest,
  PathParams,
} from 'msw';

export const getQrCodeMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200));
};
