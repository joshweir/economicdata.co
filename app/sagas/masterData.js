import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as types from '../types';
import { masterDataService } from '../services';
import { fetchCountryIndicatorsSuccess,
         fetchCountryIndicatorsFailure } from '../actions/masterData';

function* handleSelectCountry({ payload: country }) {
  const from = yield select(state => state.masterData.countriesIndicators);
  try {
    const data = yield call(masterDataService().extractCountryIndicatorsList,
                            { from, country });
    yield put(fetchCountryIndicatorsSuccess(data));
  } catch (error) {
    yield put(fetchCountryIndicatorsFailure(
            'Oops! Something went wrong and we couldn\'t ' +
            'fetch the list of country indicators'));
  }
}

export default function* rootSaga() {
  yield takeLatest(types.SELECT_COUNTRY, handleSelectCountry);
}
