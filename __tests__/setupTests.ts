import '@testing-library/jest-dom';

import { server } from '@/mocks/server';
beforeAll(() => server.listen()); // サーバーの起動
afterEach(() => server.resetHandlers()); // リクエストハンドラのリセット
afterAll(() => server.close()); // サーバーの停止
