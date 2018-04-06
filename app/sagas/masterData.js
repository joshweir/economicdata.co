import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as types from '../types';
import { masterDataService } from '../services';
import { fetchCountryIndicatorsSuccess,
         fetchCountryIndicatorsFailure,
         fetchCountriesListSuccess,
         fetchCountriesListFailure } from '../actions/masterData';

function* handleSelectCountry({ payload: country }) {
  const from = yield select(state => state.masterData.countriesIndicators);
  try {
    const data = yield call(masterDataService().extractCountryIndicatorsList,
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
    const data = yield call(masterDataService().extractCountriesList, {from});
    yield put(fetchCountriesListSuccess(data));
  } catch (error) {
    yield put(fetchCountriesListFailure(
      'Oops! Something went wrong and we couldn\'t ' +
        'initialize the list of countries'
    ));
  }
}

export default function* rootSaga() {
  yield takeLatest(types.SELECT_COUNTRY, handleSelectCountry);
  yield takeLatest(types.FETCH_COUNTRIES_LIST, handleFetchCountriesList);
}
