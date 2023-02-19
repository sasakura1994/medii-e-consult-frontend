import { fromNullToUndefined } from '@/libs/apiResponse';

type ResponseDataType = {
  id: number | undefined;
  name: string;
  nickname: string | undefined | null;
  email: string;
  career: string | undefined | null;
  comment: string | undefined | null;
};

const responseDataMock = {
  id: 1,
  name: 'Leanne Graham',
  nickname: null,
  email: 'Sincere@april.biz',
  career: null,
  comment: null,
};

describe('apiResponse', () => {
  test('should object null  converted to undefined.', async () => {
    expect(responseDataMock.nickname).toBeNull();
    expect(responseDataMock.career).toBeNull();
    expect(responseDataMock.comment).toBeNull();

    const convertedMock =
      fromNullToUndefined<ResponseDataType>(responseDataMock);
    expect(convertedMock.nickname).toBeUndefined();
    expect(convertedMock.career).toBeUndefined();
    expect(convertedMock.comment).toBeUndefined();
  });
});
