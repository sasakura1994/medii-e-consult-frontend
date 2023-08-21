import styled, { keyframes } from 'styled-components';

export const StyledHiddenScrollBar = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const fulfillingSquareSpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fulfillingSquareSpinnerInnerAnimation = keyframes`
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
`;

export const StyledSpinner = styled.div`
  box-sizing: border-box;
  animation: ${fulfillingSquareSpinnerAnimation} 4s infinite ease;

  &::after {
    content: '';
    box-sizing: border-box;
    vertical-align: top;
    display: inline-block;
    background-color: #5c6bc0;
    width: 100%;
    opacity: 1;
    animation: ${fulfillingSquareSpinnerInnerAnimation} 4s infinite ease-in;
  }
`;
