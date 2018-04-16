import { handleActions, combineActions } from 'redux-actions';
import { loginSuccessUser, signupSuccessUser } from '../users/actions';

const type = 'SUCCESS';
const initialState = {
  message: '',
  type
};

export default handleActions({
  [combineActions(
    loginSuccessUser,
    signupSuccessUser)]: (state, { payload }) => ({
      ...state, message: payload, type
    }),
  DISMISS_MESSAGE: state => ({
    ...state, message: '', type
  })
}, initialState);
