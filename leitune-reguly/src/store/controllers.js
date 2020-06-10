import {useContext} from "react";
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";

export function useController() {
  const {state, dispatch} = useContext(store);
  return [state, {
    openModal: (name) => dispatch({type: ACTION_TYPES.OPEN_MODAL, name }),
    closeModal: () => dispatch({ type: ACTION_TYPES.CLOSE_MODAL }),
    saveScrollOffset: (y) => dispatch({ type: ACTION_TYPES.SAVE_OFFSET, y }),
    closeMenu: () => dispatch({ type: ACTION_TYPES.CLOSE_MENU }),
    openMenu: () => dispatch({ type: ACTION_TYPES.OPEN_MENU }),
  }];
}
