import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {store} from "@src/store";
import {ZINDEX} from "@src/components/constants";
import ToastMessage from "@src/components/toast-message";

const Container = styled.div({
  position: 'fixed',
  top: '50px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  zIndex: ZINDEX.Modal,
});

export default function Toast() {
  const {state, dispatch} = useContext(store);
  return (
    <Container>
      {
        state.toast.messages.map(message => (
          <ToastMessage key={message.id} {...message} />
        ))
      }
    </Container>
  )
}
