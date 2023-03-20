import type {
  ResponseResolver,
  DefaultBodyType,
  RestContext,
  RestRequest,
  PathParams,
} from 'msw';
import { PostRequestResetPasswordResponseData } from './usePostRequestResetPassword';

/**
 * パスワードリセットリクエスト
 */
export const requestResetPasswordMock: PostRequestResetPasswordResponseData = {
  code: 1,
  message: '',
};
export const postRequestResetPasswordMock: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(requestResetPasswordMock));
};
