import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from '../modules/messages/actions';
import { getMessage, getMessageType } from '../modules/messages/selectors';
import styles from '../css/components/message.css';

const cx = classNames.bind(styles);

const Message = ({message, type, dismissMessage}) => (
  <div
    className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS'
    })}
    onClick={dismissMessage}>{message}</div>
);

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    message: getMessage(state),
    type: getMessageType(state)
  };
}

export default connect(mapStateToProps, { dismissMessage })(Message);
