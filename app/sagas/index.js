import { fork } from 'redux-saga/effects';
import masterData from '../modules/masterData/sagas';
import country from '../modules/country/sagas';
import countryIndicators from '../modules/countryIndicators/sagas';

export default function* rootSaga() {
  yield fork(masterData);
  yield fork(country);
  yield fork(countryIndicators);
}
