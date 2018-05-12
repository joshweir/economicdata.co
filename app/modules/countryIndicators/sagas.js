import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from './api';
import { FETCH_COUNTRY_INDICATOR_DATA, fetchCountryIndicatorDataSuccess,
  fetchMoreCountryIndicatorDataSuccess,
  fetchCountryIndicatorDataFailure } from './actions';
import { getCountrySelected } from '../masterData/selectors';

export function* handleFetchCountryIndicatorData({ payload }) {
  let country;
  let indicator;
  let releaseDateBefore;
  if (typeof payload === 'object') {
    ({ country, indicator, releaseDateBefore } = payload);
  } else {
    country = yield select(state => getCountrySelected(state));
    indicator = payload;
  }
  try {
    const { data } = yield call(api().getCountryIndicator,
                            { country, indicator, releaseDateBefore });
    if (releaseDateBefore) {
      yield put(fetchMoreCountryIndicatorDataSuccess(data));
    } else {
      yield put(push(`/data/${country}/${indicator}`));
      yield put(fetchCountryIndicatorDataSuccess(data));
    }
  } catch (error) {
    yield put(fetchCountryIndicatorDataFailure(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COUNTRY_INDICATOR_DATA,
    handleFetchCountryIndicatorData);
}
