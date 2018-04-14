import reducer from '../../reducers/countryIndicator';
import * as types from '../../types';

describe('countryIndicator reducer', () => {
  const initialState = {
    indicatorData: [],
    indicatorInfo: {}
  };

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  test('handles FETCH_COUNTRY_INDICATOR_DATA_SUCCESS', () => {
    const indicatorInfo = {foo: 'bar'};
    const indicatorData = ['the', 'data'];
    expect(
      reducer(undefined, {
        type: types.FETCH_COUNTRY_INDICATOR_DATA_SUCCESS,
        payload: {indicatorInfo, indicatorData}
      })
    ).toEqual({
      ...initialState, indicatorInfo, indicatorData
    });
  });
});
