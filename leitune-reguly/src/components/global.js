import {createGlobalStyle} from "styled-components";
import {COLORS} from "@src/components/constants";

const resetCss = `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`


// src: url('/fonts/roboto-condensed/RobotoCondensed-Light.ttf');
// src: url('/fonts/roboto-condensed/RobotoCondensed-LightItalic.ttf');

export const GlobalStyle = createGlobalStyle`
  ${resetCss}

  @font-face {
    font-family: 'Roboto Condensed';
    src: url('/fonts/roboto-condensed/RobotoCondensed-Regular.ttf');
  }

  @font-face {
    font-family: 'Roboto Condensed';
    src: url('/fonts/roboto-condensed/RobotoCondensed-Bold.ttf');
    font-weight: bold;
  }

  @font-face {
    font-family: 'Roboto Condensed';
    src: url('/fonts/roboto-condensed/RobotoCondensed-BoldItalic.ttf');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto Condensed';
    src: url('/fonts/roboto-condensed/RobotoCondensed-Italic.ttf');
    font-style: italic;
  }


  body {
    font-family: 'Roboto Condensed';
    background: ${COLORS.LightGray};
  }

`;
