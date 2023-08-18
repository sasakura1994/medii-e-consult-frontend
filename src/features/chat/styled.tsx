import styled from 'styled-components';

// TODO: こちら不要なので削除
export const StyledHiddenScrollBar = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledOverlay = styled.div<{ scrollContentHeight: string }>`
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
  &::after {
    z-index: 200;
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: ${({ scrollContentHeight }) => scrollContentHeight};
    background-color: #333;
    opacity: 0.5;
  }
`;
