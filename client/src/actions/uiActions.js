import uiConfig from '../config/uiConfig';

export const APP_LOAD = 'APP_LOAD';
export const REDIRECT = 'REDIRECT';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const onLoad = token => ({ type: APP_LOAD, payload: token }); // TODO: to be used after auth implementation

export const onRedirect = () => ({ type: REDIRECT });

export const showNotification = ({ id = Math.random(), message = 'No message', duration = uiConfig.NOTIFICATION_DURATION }) =>
  ({ type: SHOW_NOTIFICATION, payload: { id, message, duration } });

export const removeNotification = () => ({ type: REMOVE_NOTIFICATION });
