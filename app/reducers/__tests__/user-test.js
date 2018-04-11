import expect from 'expect';
import reducer from '../../reducers/user';
import * as types from '../../types';

describe('Users reducer', () => {
  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('handles MANUAL_LOGIN_USER', () => {
    expect(
      reducer(undefined, {type: types.MANUAL_LOGIN_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  it('handles LOGIN_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGIN_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true,
      message: ''
    });
  });

  it('handles LOGIN_ERROR_USER', () => {
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

  it('handles SIGNUP_USER', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  it('handles SIGNUP_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true
    });
  });

  it('handles SIGNUP_ERROR_USER', () => {
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

  it('handles LOGOUT_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_USER})
    ).toEqual({
      ...initialState,
      isWaiting: true,
      message: ''
    });
  });

  it('handles LOGOUT_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_SUCCESS_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: false
    });
  });

  it('handles LOGOUT_ERROR_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_ERROR_USER})
    ).toEqual({
      ...initialState,
      isWaiting: false,
      authenticated: true,
      isLogin: true
    });
  });

  it('handles TOGGLE_LOGIN_MODE', () => {
    expect(
      reducer(undefined, {type: types.TOGGLE_LOGIN_MODE})
    ).toEqual({
      ...initialState,
      isLogin: false
    });
  });
});
