import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import {COLORS} from "@src/components/constants";
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";


const Message = styled.p(p => ({
  background: COLORS.White,
  color: COLORS.Red,
  border: `1px solid ${COLORS.Red}`,
  padding: '8px',
  width: '50%',
  textAlign: 'center',
  borderRadius: '5px',
  boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.2)",
  transition: 'all 0.3s',
  '&.-enter, &.-exit': {
    transform: 'translateY(-20px)',
    opacity: 0,
  },
  '&.-display': {
    transform: 'translateY(0px)',
    opacity: 1,
  },

}));

const STAGES = [
  {
    name: '-enter',
    duration: 300
  },
  {
    name: '-display',
    duration: 4000
  },
  {
    name: '-exit',
    duration: 300
  }
];

export default function ToastMessage({ id, text, type }) {
  const [stage, setStage] = useState(0);
  const {dispatch} = useContext(store);

  useEffect(() => {
    const current = STAGES[stage];
    const next = STAGES[stage+1];
    const timeoutId = setTimeout(() => {
      if (next) {
        setStage(stage+1);
      } else {
        dispatch({ type: ACTION_TYPES.REMOVE_TOAST, id })
      }
    }, current.duration);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [stage]);

  return (
    <Message className={STAGES[stage].name} type={type}>{text}</Message>
  )
}

ToastMessage.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}
