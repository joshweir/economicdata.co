import { handleActions, combineActions } from 'redux-actions';
import { fetchCountryIndicatorData, fetchCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure } from '../countryIndicators/actions';

const initialState = false;

export default handleActions({
  [combineActions(
    fetchCountryIndicatorData)]: () => true,
  [combineActions(
    fetchCountryIndicatorDataSuccess,
    fetchCountryIndicatorDataFailure)]: () => false
}, initialState);
