import {useEffect, useState} from "react";
import {WINDOW_SIZES} from "@src/services/constants";

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
    isMobile: value.deviceWidth < WINDOW_SIZES.tablet,
    isTablet: value.deviceWidth >= WINDOW_SIZES.tablet && value.deviceWidth < WINDOW_SIZES.desktop,
    isDesktop: value.deviceWidth >= WINDOW_SIZES.desktop
  };
}

export const MOBILE = `@media (max-width: ${WINDOW_SIZES.tablet - 1}px)`
export const TABLET = `@media (min-width: ${WINDOW_SIZES.tablet}px) and (max-width: ${WINDOW_SIZES.desktop - 1}px)`;
export const DESKTOP = `@media (min-width: ${WINDOW_SIZES.desktop}px)`;
