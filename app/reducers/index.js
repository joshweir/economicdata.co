import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../modules/users/reducers';
import message from '../modules/messages/reducers';
import masterData from '../modules/masterData/reducers';
import country from '../modules/country/reducers';
import countryIndicator from '../modules/countryIndicators/reducers';
import isFetching from '../modules/isFetching/reducers';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  user,
  message,
  routing,
  masterData,
  countryIndicator,
  country
});

export default rootReducer;
