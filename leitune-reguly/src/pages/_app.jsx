import React, {useEffect} from 'react';
import i18n from '@src/services/i18n';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import {GlobalStyle} from "@src/components/global";

import {StateProvider} from "@src/store";
import Toast from "@src/components/toast";

import smoothscroll from 'smoothscroll-polyfill';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@public/vendor/odometer/odometer-theme-minimal.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    smoothscroll.polyfill();
  });
  return (
    <>
      <GlobalStyle />
      <I18nextProvider i18n={i18n}>
        <StateProvider>
          <Component {...pageProps} />
          <Toast />
        </StateProvider>
      </I18nextProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
