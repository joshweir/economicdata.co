import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { fetchCountryIndicatorDataSuccess,
  fetchMoreCountryIndicatorDataSuccess } from './actions';

const initialState = {
  indicatorInfo: {},
  indicatorData: [],
  moreToLoad: true
};

const indicatorInfo = handleActions({
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, { payload }) => payload.indicatorInfo
}, initialState.indicatorInfo);

const indicatorData = handleActions({
  FETCH_COUNTRY_INDICATOR_DATA_SUCCESS: (state, { payload }) => payload.indicatorData,
  FETCH_MORE_COUNTRY_INDICATOR_DATA_SUCCESS: (state, { payload }) => ([
    ...state,
    ...payload.indicatorData
  ])
}, initialState.indicatorData);

const moreToLoad = handleActions({
  [combineActions(
    fetchCountryIndicatorDataSuccess,
    fetchMoreCountryIndicatorDataSuccess)]: (state, { payload }) => (
      payload.moreToLoad)
}, initialState.moreToLoad);

export default combineReducers({
  indicatorInfo,
  indicatorData,
  moreToLoad
});
