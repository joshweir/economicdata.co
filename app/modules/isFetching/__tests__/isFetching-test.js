/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { polyfill } from 'es6-promise';
import reducer from '../reducers';
import { FETCH_COUNTRY_INDICATOR_DATA, FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
  FETCH_COUNTRY_INDICATOR_DATA_FAILURE } from '../../countryIndicators/actions';
import { FETCH_COUNTRIES_LIST, FETCH_COUNTRIES_LIST_SUCCESS,
  FETCH_COUNTRIES_LIST_FAILURE } from '../../masterData/actions';

polyfill();

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = false;

describe('isFetching reducer', () => {
  test('returns the initial state', () => {
    expect(
      reducer(undefined, {type: 'FOO'})
    ).toEqual(initialState);
  });

  const expectIsFetching = ({expectedValue, type, state}) => {
    expect(
      reducer(state, {type})
    ).toEqual(expectedValue);
  };

  test('handles FETCH_COUNTRY_INDICATOR_DATA, FETCH_COUNTRIES_LIST ' +
     '(isFetching is true)', () => {
    const expectedValue = true;
    [
      FETCH_COUNTRY_INDICATOR_DATA,
      FETCH_COUNTRIES_LIST
    ].forEach(type => expectIsFetching({expectedValue, type}));
  });

  test('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS, ' +
     'FETCH_COUNTRY_INDICATOR_DATA_FAILURE, ' +
     'FETCH_COUNTRIES_LIST_SUCCESS, ' +
     'FETCH_COUNTRIES_LIST_FAILURE ' +
     '(isFetching is false)', () => {
    const expectedValue = false;
    [
      FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
      FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
      FETCH_COUNTRIES_LIST_SUCCESS,
      FETCH_COUNTRIES_LIST_FAILURE
    ].forEach(type => expectIsFetching({expectedValue, type}));
  });
});
