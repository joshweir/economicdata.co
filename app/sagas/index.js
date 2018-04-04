import { fork } from 'redux-saga/effects';
import masterData from './masterData';
import countryIndicators from './countryIndicators';

export default function* rootSaga() {
  yield fork(masterData);
  yield fork(countryIndicators);
}
