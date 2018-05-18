import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { FETCH_COUNTRY_DATA,
  fetchCountryDataSuccess } from './actions';
import { getCountryData } from '../country/selectors';

export function* handleFetchCountryData({ payload }) {
  let country;
  if (typeof payload === 'object') {
    ({ country } = payload);
  } else {
    country = payload;
  }
  const countryData = yield select(state => getCountryData(state, country));
  yield put(push(`/data/${country}`));
  yield put(fetchCountryDataSuccess(countryData));
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COUNTRY_DATA, handleFetchCountryData);
}
