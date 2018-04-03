import { push } from 'react-router-redux'
import { createAction } from 'redux-actions';
import * as types from '../types';
import { masterDataService, countryIndicatorService } from '../services';

const extractCountriesListFailure = (data) => {
  return {
    type: types.FETCH_COUNTRIES_LIST_FAILURE,
    error: data.error
  };
};

const extractCountryIndicatorsFailure = (data) => {
  return {
    type: types.FETCH_COUNTRY_INDICATORS_FAILURE,
    error: data.error
  };
};

export function extractCountriesList(countriesIndicators) {
  return (dispatch) => {
    dispatch({ type: types.FETCH_COUNTRIES_LIST });
    return masterDataService()
      .extractCountriesList({ from: countriesIndicators })
      .then(data => dispatch({
        type: types.FETCH_COUNTRIES_LIST_SUCCESS, data
      }))
      .catch(() => dispatch(extractCountriesListFailure({
        error: 'Oops! Something went wrong and we couldn\'t ' +
          'initialize the list of countries'
      })));
  };
}

export function setCountrySelected(country) {
  return (dispatch, getState) => {
    return masterDataService()
      .extractCountryIndicatorsList({
        from: getState().masterData.countriesIndicators, country
      })
      .then(data => dispatch({
        type: types.SELECT_COUNTRY,
        data: {
          country, countryIndicators: data
        }
      }))
      .catch(() => dispatch(extractCountryIndicatorsFailure({
        error: 'Oops! Something went wrong and we couldn\'t ' +
          'fetch the list of country indicators'
      })));
  };
}
// this will replace the above function:
export const selectCountry = createAction(types.SELECT_COUNTRY);
export const fetchCountryIndicatorsSuccess =
  createAction(types.FETCH_COUNTRY_INDICATORS_SUCCESS);
export const fetchCountryIndicatorsFailure =
  createAction(types.FETCH_COUNTRY_INDICATORS_FAILURE);

export function setCountryIndicatorSelected(countryIndicator) {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_COUNTRY_INDICATOR });
    return countryIndicatorService().getCountryIndicator({
      country: getState().masterData.countrySelected,
      indicator: countryIndicator
    })
    .then(({data}) => {
      const { countrySelected, countryIndicatorSelected } = data;
      dispatch(push(`/data/${countrySelected}/${countryIndicatorSelected}`));
      dispatch({ type: types.FETCH_COUNTRY_INDICATOR_SUCCESS, data });
      return data;
    })
    .catch((error) => {
      return dispatch({ type: types.FETCH_COUNTRY_INDICATOR_FAILURE, error });
    });
  };
}
