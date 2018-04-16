import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import api from './api';
import {
  FETCH_COUNTRIES_LIST, FETCH_COUNTRY_INDICATORS,
  fetchCountriesListSuccess, fetchCountriesListFailure,
  fetchCountryIndicatorsSuccess,
  fetchCountryIndicatorsFailure } from './actions';

function* handleSelectCountry({ payload: country }) {
  const from = yield select(state => state.masterData.countriesIndicators);
  try {
    const data = yield call(api().extractCountryIndicatorsList,
                            { from, country });
    yield put(fetchCountryIndicatorsSuccess(data));
  } catch (error) {
    yield put(fetchCountryIndicatorsFailure(
      'Oops! Something went wrong and we couldn\'t ' +
      'fetch the list of country indicators'
    ));
  }
}

function* handleFetchCountriesList({ payload: from }) {
  try {
    const data = yield call(api().extractCountriesList, {from});
    yield put(fetchCountriesListSuccess(data));
  } catch (error) {
    yield put(fetchCountriesListFailure(
      'Oops! Something went wrong and we couldn\'t ' +
        'initialize the list of countries'
    ));
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COUNTRY_INDICATORS, handleSelectCountry);
  yield takeLatest(FETCH_COUNTRIES_LIST, handleFetchCountriesList);
}
