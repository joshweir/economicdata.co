import reducer from '../../reducers/isFetching';
import * as types from '../../types';

describe('isFetching reducer', () => {
  const initialState = false;

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {})
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
      types.FETCH_COUNTRY_INDICATOR_DATA,
      types.FETCH_COUNTRIES_LIST
    ].forEach(type => expectIsFetching({expectedValue, type}));
  });

  test('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS, ' +
     'FETCH_COUNTRY_INDICATOR_DATA_FAILURE, ' +
     'FETCH_COUNTRIES_LIST_SUCCESS, ' +
     'FETCH_COUNTRIES_LIST_FAILURE ' +
     '(isFetching is false)', () => {
    const expectedValue = false;
    [
      types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
      types.FETCH_COUNTRY_INDICATOR_DATA_FAILURE,
      types.FETCH_COUNTRIES_LIST_SUCCESS,
      types.FETCH_COUNTRIES_LIST_FAILURE
    ].forEach(type => expectIsFetching({expectedValue, type}));
  });
});
