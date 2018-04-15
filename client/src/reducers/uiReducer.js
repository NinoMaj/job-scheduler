import {
  APP_LOAD,
  REDIRECT,
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/uiActions';

const defaultState = {
  appLoaded: false,
  currentUser: null,
  token: null,
  redirectTo: null,
  notifications: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.payload,
        appLoaded: true,
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case SHOW_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, action.payload] };
    case REMOVE_NOTIFICATION:
      return { ...state, notifications: state.notifications.slice(1) };
    default:
      return state;
  }
};
