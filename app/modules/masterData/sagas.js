import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import {
  FETCH_COUNTRIES_LIST, FETCH_COUNTRY_INDICATORS,
  fetchCountriesListSuccess,
  fetchCountryIndicatorsSuccess } from './actions';
import { getCountriesForSelect,
  getCountryIndicatorsForSelect } from './selectors';

function* handleSelectCountry() {
  const data = yield select(state => getCountryIndicatorsForSelect(state));
  yield put(fetchCountryIndicatorsSuccess(data));
}

function* handleFetchCountriesList() {
  const data = yield select(state => getCountriesForSelect(state));
  yield put(fetchCountriesListSuccess(data));
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COUNTRY_INDICATORS, handleSelectCountry);
  yield takeLatest(FETCH_COUNTRIES_LIST, handleFetchCountriesList);
}
