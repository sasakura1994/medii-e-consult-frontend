import styled from 'styled-components';

export const StyledHiddenScrollBar = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
