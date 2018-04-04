import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from '../types';
import { countryIndicatorService } from '../services';
import { fetchCountryIndicatorDataSuccess,
         fetchCountryIndicatorDataFailure } from '../actions/countryIndicators';

export function* handleFetchCountryIndicatorData({ payload }) {
  let country;
  let indicator;
  if (typeof payload === 'object') {
    ({ country, indicator } = payload);
  } else {
    country = yield select(state => state.masterData.countrySelected);
    indicator = payload;
  }
  try {
    const { data } = yield call(countryIndicatorService().getCountryIndicator,
                            { country, indicator });
    yield put(push(`/data/${country}/${indicator}`));
    yield put(fetchCountryIndicatorDataSuccess(data));
  } catch (error) {
    yield put(fetchCountryIndicatorDataFailure(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_COUNTRY_INDICATOR_DATA,
    handleFetchCountryIndicatorData);
}
