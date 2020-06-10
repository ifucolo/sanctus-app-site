import React, {createContext, useReducer} from 'react';
import {
  CloseMenu,
  CloseModal,
  OpenMenu,
  OpenModal, RemoveToast, SaveOffset,
  ShowToast
} from "@src/store/actions";

const HANDLERS = [
  OpenModal,
  CloseModal,
  CloseMenu,
  OpenMenu,
  ShowToast,
  RemoveToast,
  SaveOffset,
]

const initialState = {
  modal: {
    open: false,
  },
  nav: {
    open: false,
    hidden: false,
  },
  toast: {
    messages: [],
  },
  page: {
    offsetY: 0,
  }
};
const store = createContext(initialState);
const { Provider } = store;

// eslint-disable-next-line react/prop-types
const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    const handler = HANDLERS.find(h => h.matches(prevState, action));
    if (!handler) {
      console.warn('No handler found for action', { action, prevState });
      return state;
    }
    return handler.execute(prevState, action);
  }, initialState, );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
