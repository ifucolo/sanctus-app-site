import {useEffect, useState} from "react";

const SIZES = {
  tablet: 992,
  desktop: 1200,
}

export function useResizeListener() {
  const [value, setValue] = useState({
    deviceWidth: 0,
    deviceHeight: 0,
  });

  function handleResize() {
    setValue({
      deviceWidth: window.innerWidth,
      deviceHeight: window.innerHeight,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...value,
    isMobile: value.deviceWidth < SIZES.tablet,
    isTablet: value.deviceWidth >= SIZES.tablet && value.deviceWidth < SIZES.desktop,
    isDesktop: value.deviceWidth >= SIZES.desktop
  };
}

export const MOBILE = `@media (max-width: ${SIZES.tablet - 1}px)`
export const TABLET = `@media (min-width: ${SIZES.tablet}px) and (max-width: ${SIZES.desktop - 1}px)`;
export const DESKTOP = `@media (min-width: ${SIZES.desktop}px)`;
