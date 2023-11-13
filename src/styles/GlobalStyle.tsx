import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ openModalCount: number }>`
  body {
    overflow: ${({ openModalCount }) => (openModalCount > 0 ? 'hidden' : 'auto')};
  }
`;
