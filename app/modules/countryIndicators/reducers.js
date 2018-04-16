import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const initialState = {
  indicatorInfo: {},
  indicatorData: []
};

const indicatorInfo = handleActions({
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, action) => action.payload.indicatorInfo
}, initialState.indicatorInfo);

const indicatorData = handleActions({
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, action) => action.payload.indicatorData
}, initialState.indicatorData);

export default combineReducers({
  indicatorInfo,
  indicatorData
});
