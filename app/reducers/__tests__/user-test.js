import reducer from '../../reducers/user';
import * as types from '../../types';

describe('Users reducer', () => {
  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  test('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  test('handles MANUAL_LOGIN_USER', () => {
    expect(
      reducer(undefined, {type: types.MANUAL_LOGIN_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  test('handles LOGIN_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGIN_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true,
      message: ''
    });
  });

  test('handles LOGIN_ERROR_USER', () => {
    const message = 'Success';
    expect(
      reducer(undefined, {type: types.LOGIN_ERROR_USER, message})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false,
      message
    });
  });

  test('handles SIGNUP_USER', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  test('handles SIGNUP_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true
    });
  });

  test('handles SIGNUP_ERROR_USER', () => {
    const message = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, {type: types.SIGNUP_ERROR_USER, message})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false,
      message
    });
  });

  test('handles LOGOUT_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  test('handles LOGOUT_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false
    });
  });

  test('handles LOGOUT_ERROR_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_ERROR_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true,
      isLogin: true
    });
  });

  test('handles TOGGLE_LOGIN_MODE', () => {
    expect(
      reducer(undefined, {type: types.TOGGLE_LOGIN_MODE})
    ).toEqual({
      ...initialState,
      isLogin: false
    });
  });
});
