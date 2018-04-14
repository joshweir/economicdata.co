import reducer from '../../reducers/message';
import * as types from '../../types';

describe('Message reducer', () => {
  const initialState = {
    message: '',
    type: 'SUCCESS'
  };

  const stateWithMessage = {
    message: 'a message',
    type: 'SUCCESS'
  };

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  test('handles LOGIN_SUCCESS_USER', () => {
    const message = 'the message';
    expect(
      reducer(undefined, {type: types.LOGIN_SUCCESS_USER, message})
    ).toEqual({
      ...initialState,
      message
    });
  });

  test('handles SIGNUP_SUCCESS_USER', () => {
    const message = 'the message';
    expect(
      reducer(undefined, {type: types.SIGNUP_SUCCESS_USER, message})
    ).toEqual({
      ...initialState,
      message
    });
  });

  test('handles DISMISS_MESSAGE', () => {
    expect(
      reducer(stateWithMessage, {type: types.DISMISS_MESSAGE})
    ).toEqual(initialState);
  });
});
