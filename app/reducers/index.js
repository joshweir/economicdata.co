import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import message from '../reducers/message';
import masterData from '../reducers/masterData';
import countryIndicator from '../reducers/countryIndicator';
import isFetching from '../reducers/isFetching';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  user,
  message,
  routing,
  masterData,
  countryIndicator
});

export default rootReducer;
