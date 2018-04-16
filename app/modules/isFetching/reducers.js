import { handleActions, combineActions } from 'redux-actions';
import { fetchCountryIndicatorData, fetchCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure } from '../countryIndicators/actions';
import { fetchCountriesList, fetchCountriesListSuccess,
  fetchCountriesListFailure } from '../masterData/actions';

const initialState = false;

export default handleActions({
  [combineActions(
    fetchCountryIndicatorData,
    fetchCountriesList)]: () => true,
  [combineActions(
    fetchCountryIndicatorDataSuccess,
    fetchCountryIndicatorDataFailure,
    fetchCountriesListSuccess,
    fetchCountriesListFailure)]: () => false
}, initialState);
