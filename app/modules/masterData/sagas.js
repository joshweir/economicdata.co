import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import {
  FETCH_COUNTRY_INDICATORS,
  fetchCountryIndicatorsSuccess } from './actions';
import { getCountryIndicatorsForSelect } from './selectors';

function* handleSelectCountry() {
  const data = yield select(state => getCountryIndicatorsForSelect(state));
  yield put(fetchCountryIndicatorsSuccess(data));
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COUNTRY_INDICATORS, handleSelectCountry);
}
