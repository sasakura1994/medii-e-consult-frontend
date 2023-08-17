import styled from 'styled-components';

// TODO: こちら不要なので削除
export const StyledHiddenScrollBar = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
