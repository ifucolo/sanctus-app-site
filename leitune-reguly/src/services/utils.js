import {useResizeListener} from "@src/services/responsive";
import {WINDOW_SIZES} from "@src/services/constants";

export function containBackground(url) {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  }
}

export function toPixel(n) {
  return `${n}px`;
}

export function scrollTo(id) {
  return () => {
    const element = document.getElementById(id);
    if (element && 'scrollIntoView' in element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    } else {
      window.location.hash = `#${id}`;
    }
  }
}

export function isInViewport (elem) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 && bounding.top <= (window.pageYOffset)
  );
};
