import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {store} from "@src/store";
import {toPixel} from "@src/services/utils";

const Main = styled.main(p => ({
  transition: 'all 0.3s',
  opacity: p.ready ? '1' : '0',
  // transform: p.ready ? 'translate(0px, 0px)' : 'scale(0px, 100px)'
}));

export function MainSection({children}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
  }, [])

  return (
    <Main ready={ready}>{children}</Main>
  )
}

MainSection.propTypes = {
  children: PropTypes.element.isRequired,
}
