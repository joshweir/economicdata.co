import { fork } from 'redux-saga/effects';
import masterData from './masterData';

export default function* rootSaga() {
  yield fork(masterData);
}
