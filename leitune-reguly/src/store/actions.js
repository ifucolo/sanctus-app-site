
export const ACTION_TYPES = {
  CLOSE_MODAL: 'CLOSE_MODAL',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MENU: 'CLOSE_MENU',
  OPEN_MENU: 'OPEN_MENU',
  SHOW_TOAST: 'SHOW_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  SAVE_OFFSET: 'SAVE_OFFSET',
}

export const SaveOffset = {
  matches(state, action) {
    return action.type === ACTION_TYPES.SAVE_OFFSET;
  },
  execute(state, action) {
    return {
      ...state,
      page: {
        ...state.page,
        offsetY: action.y,
      }
    }
  }
}

export const RemoveToast = {
  matches(state, action) {
    return action.type === ACTION_TYPES.REMOVE_TOAST;
  },
  execute(state, action) {
    return {
      ...state,
      toast: {
        ...state.toast,
        messages: state.toast.messages.filter(message => message.id !== action.id)
      }
    }
  }
}

export const ShowToast = {
  matches(state, action) {
    return action.type === ACTION_TYPES.SHOW_TOAST;
  },
  execute(state, action) {
    return {
      ...state,
      toast: {
        ...state.toast,
        messages: [...state.toast.messages, {
          id: Date.now(),
          ...action.data
        }],
      }
    }
  }
}

export const OpenModal = {
  matches(state, action) {
    return action.type === ACTION_TYPES.OPEN_MODAL;
  },
  execute(state, action) {
    window.location.hash = `#${action.name.toLowerCase()}`;
    return {
      ...state,
      modal: {
        ...state.modal,
        open: true,
        name: action.name,
      },
      nav: {
        ...state.nav,
        hidden: true,
      }
    }
  }
}

export const CloseModal = {
  matches(state, action) {
    return action.type === ACTION_TYPES.CLOSE_MODAL;
  },
  execute(state, action) {
    window.location.hash = '';
    return {
      ...state,
      modal: {
        ...state.modal,
        open: false,
      },
      nav: {
        ...state.nav,
        hidden: false,
      }
    }
  }
}

export const OpenMenu = {
  matches(state, action) {
    return action.type === ACTION_TYPES.OPEN_MENU
  },
  execute(state, action) {
    return {
      ...state,
      nav: {
        ...state.nav,
        open: true,
      }
    }
  }
}


export const CloseMenu = {
  matches(state, action) {
    return action.type === ACTION_TYPES.CLOSE_MENU
  },
  execute(state, action) {
    return {
      ...state,
      nav: {
        ...state.nav,
        open: false,
      }
    }
  }
}
