import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import {
  manualLoginUser,
  loginSuccessUser,
  signupUser,
  signupSuccessUser,
  logoutUser,
  logoutSuccessUser,
  toggleLoginMode,
  loginErrorUser,
  signupErrorUser,
  logoutErrorUser
} from './actions';

const initialState = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false
};

const isLogin = handleActions({
  TOGGLE_LOGIN_MODE: state => !state
}, initialState.isLogin);

const message = handleActions({
  [combineActions(
    manualLoginUser,
    loginSuccessUser,
    signupUser,
    signupSuccessUser,
    logoutUser,
    logoutSuccessUser,
    toggleLoginMode)]: () => '',
  [combineActions(
    loginErrorUser,
    signupErrorUser,
    logoutErrorUser)]: (state, { payload }) => payload
}, initialState.message);

const isWaiting = handleActions({
  [combineActions(
    manualLoginUser,
    signupUser,
    logoutUser)]: () => true,
  [combineActions(
    loginSuccessUser,
    signupSuccessUser,
    logoutSuccessUser,
    loginErrorUser,
    signupErrorUser,
    logoutErrorUser)]: () => false
}, initialState.isWaiting);

const authenticated = handleActions({
  [combineActions(
    loginSuccessUser,
    signupSuccessUser,
    logoutErrorUser)]: () => true,
  [combineActions(
    loginErrorUser,
    signupErrorUser,
    logoutSuccessUser)]: () => false
}, initialState.authenticated);

export default combineReducers({
  isLogin,
  message,
  isWaiting,
  authenticated
});
