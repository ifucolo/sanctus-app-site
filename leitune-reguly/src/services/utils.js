import {useResizeListener} from "@src/services/responsive";
import {WINDOW_SIZES} from "@src/services/constants";


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
