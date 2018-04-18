import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Message from '../../containers/Message';
import { getMessage, getMessageType } from '../../modules/messages/selectors';
import { dismissMessage } from '../../modules/messages/actions';

const mockStore = configureMockStore();

describe('<Message />', () => {
  let wrapper;
  let store;
  let initialState = {
    message: {
      message: '',
      type: 'SUCCESS'
    }
  };

  describe('mapStateToProps and mapDispatchToProps', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = shallow(
        <Message store={store} />
      );
    });

    test('receives message from state', () => {
      expect(wrapper.props().message)
      .toEqual(getMessage(initialState));
    });

    test('receives message type from state', () => {
      expect(wrapper.props().type)
      .toEqual(getMessageType(initialState));
    });

    test('receives dismissMessage from dispatch', () => {
      expect(wrapper.props().dismissMessage())
      .toEqual(dismissMessage());
    });
  });

  test('renders the message as a child of the message div', () => {
    initialState = {
      message: {
        message: 'the message',
        type: 'SUCCESS'
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <Message store={store} />
    );
    expect(wrapper.dive().find('.message').text())
    .toEqual(getMessage(initialState));
  });

  test('dispatches dismissMessage on click of the message div', () => {
    initialState = {
      message: {
        message: 'the message',
        type: 'SUCCESS'
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <Message store={store} />
    );
    wrapper.dive().find('.message').simulate('click');
    expect(store.getActions()).toEqual([dismissMessage()]);
  });

  describe('when message is not empty', () => {
    test('renders message div with show class', () => {
      initialState = {
        message: {
          message: 'the message',
          type: 'SUCCESS'
        }
      };
      store = mockStore(initialState);
      wrapper = shallow(
        <Message store={store} />
      );
      expect(wrapper.dive().find('.message.show')).toHaveLength(1);
    });
  });

  describe('when message is empty', () => {
    test('renders message div without show class', () => {
      initialState = {
        message: {
          message: '',
          type: 'SUCCESS'
        }
      };
      store = mockStore(initialState);
      wrapper = shallow(
        <Message store={store} />
      );
      const subComponent = wrapper.dive().find('.message');
      expect(subComponent).toHaveLength(1);
      expect(subComponent.hasClass('show')).toBeFalsy();
    });
  });

  describe('when message type is SUCCESS', () => {
    test('renders message div with success class', () => {
      initialState = {
        message: {
          message: 'the message',
          type: 'SUCCESS'
        }
      };
      store = mockStore(initialState);
      wrapper = shallow(
        <Message store={store} />
      );
      expect(wrapper.dive().find('.message.success')).toHaveLength(1);
    });
  });

  describe('when message type is not SUCCESS', () => {
    test('renders message div without success class', () => {
      initialState = {
        message: {
          message: '',
          type: 'FAIL'
        }
      };
      store = mockStore(initialState);
      wrapper = shallow(
        <Message store={store} />
      );
      const subComponent = wrapper.dive().find('.message');
      expect(subComponent).toHaveLength(1);
      expect(subComponent.hasClass('success')).toBeFalsy();
    });
  });
});
