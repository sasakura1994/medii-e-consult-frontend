import { useEffect, useState } from 'react';

const breakpointWidth = 1024;

export const useBreakpoint = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return {
    isMobile: width < breakpointWidth,
    isPc: width >= breakpointWidth,
  };
};
