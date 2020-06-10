import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {COLORS, ZINDEX} from "@src/components/constants";
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";
import CloseIcon from '@material-ui/icons/Close';

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
});

const Close = styled.div({
  position: 'absolute',
  top: '15px',
  right: '15px',
  color: COLORS.Black,
  zIndex: ZINDEX.Modal
})

export default function Modal({children, name}) {
  const { state, dispatch } = useContext(store);
  const [ready, setReady] = useState(false);

  const closeModal = () => dispatch({type: ACTION_TYPES.CLOSE_MODAL});

  useEffect(() => {
    setReady(state.modal.open);
    document.getElementsByTagName('body')[0].style.overflow = state.modal.open ? 'hidden' : 'scroll';
  }, [state.modal.open])

  if (!state.modal.open || name !== state.modal.name) {
    return null;
  }

  return (
    <Overlay onClick={closeModal} ready={ready}>
      <Card onClick={e => e.stopPropagation()}>
        <Close onClick={closeModal}>
          <CloseIcon />
        </Close>
        {children}
      </Card>
    </Overlay>
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
}
