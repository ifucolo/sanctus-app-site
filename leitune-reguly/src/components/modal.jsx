import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {COLORS, ZINDEX} from "@src/services/constants";
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";
import {DESKTOP} from "@src/services/responsive";
import smoothscroll from "smoothscroll-polyfill";

const Overlay = styled.div(p => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgb(0,0,0,0.5)',
  zIndex: ZINDEX.Modal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: p.ready ? '1' : '0',
  transition: 'opacity 0.3s',
}));

const Card = styled.div({
  position: 'relative',
  width: 'calc(100% - 20px)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  [DESKTOP]: {
    width: 'auto',
  }
});

export default function Modal({children, name}) {
  const { state, dispatch } = useContext(store);
  const [ready, setReady] = useState(false);

  const closeModal = () => dispatch({type: ACTION_TYPES.CLOSE_MODAL});

  useEffect(() => {
    setReady(state.modal.open);
    document.getElementsByTagName('body')[0].style.overflow = state.modal.open ? 'hidden' : 'scroll';
  }, [state.modal.open]);

  const handleWindowClose = (e) => {
    console.log('>>>>>>>>>>', state.modal.open);
    if (state.modal.open) {
      closeModal();
    }
  };

  useEffect(() => {
    smoothscroll.polyfill();
    window.addEventListener('popstate', handleWindowClose);
    return () => {
      window.removeEventListener('popstate', handleWindowClose);
    };
  });

  if (!state.modal.open || name !== state.modal.name) {
    return null;
  }

  return (
    <Overlay onClick={closeModal} ready={ready}>
      <Card onClick={e => e.stopPropagation()}>
        {children}
      </Card>
    </Overlay>
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
}
