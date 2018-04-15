import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import ui from './uiReducer';
import jobs from './jobsReducer';

export default combineReducers({
  ui,
  jobs,
  router: routerReducer,
});
