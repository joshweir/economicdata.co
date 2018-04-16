import { createActions } from 'redux-actions';
import { push } from 'react-router-redux';
import api from './api';

// actions
export const MANUAL_LOGIN_USER = 'MANUAL_LOGIN_USER';
export const LOGIN_SUCCESS_USER = 'LOGIN_SUCCESS_USER';
export const LOGIN_ERROR_USER = 'LOGIN_ERROR_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_SUCCESS_USER = 'SIGNUP_SUCCESS_USER';
export const SIGNUP_ERROR_USER = 'SIGNUP_ERROR_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_SUCCESS_USER = 'LOGOUT_SUCCESS_USER';
export const LOGOUT_ERROR_USER = 'LOGOUT_ERROR_USER';
export const TOGGLE_LOGIN_MODE = 'TOGGLE_LOGIN_MODE';

// Action Creators
export const {
  manualLoginUser,
  loginSuccessUser,
  loginErrorUser,
  signupUser,
  signupSuccessUser,
  signupErrorUser,
  logoutUser,
  logoutSuccessUser,
  logoutErrorUser,
  toggleLoginMode
} = createActions(
  MANUAL_LOGIN_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  SIGNUP_USER,
  SIGNUP_SUCCESS_USER,
  SIGNUP_ERROR_USER,
  LOGOUT_USER,
  LOGOUT_SUCCESS_USER,
  LOGOUT_ERROR_USER,
  TOGGLE_LOGIN_MODE
);

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(manualLoginUser());

    return api().login(data)
      .then(() => {
          dispatch(loginSuccessUser('You have been successfully logged in'));
          dispatch(push('/'));
      })
      .catch(() => {
        dispatch(loginErrorUser('Oops! Invalid username or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(signupUser());

    return api().signUp(data)
      .then(() => {
          dispatch(signupSuccessUser('You have successfully registered an account!'));
          dispatch(push('/'));
      })
      .catch(() => {
        dispatch(signupErrorUser('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(logoutUser());

    return api().logOut()
      .then(() => {
          dispatch(logoutSuccessUser());
      })
      .catch(() => {
        dispatch(logoutErrorUser());
      });
  };
}
