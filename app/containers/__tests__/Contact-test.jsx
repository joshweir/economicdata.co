import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Contact from '../../containers/Contact';
import initialState from '../../tests/helpers/initialState';

const mockStore = configureMockStore();

describe('<Contact />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Contact store={store} />
    );
  });

  test('renders', () => {
    expect(wrapper.length).toEqual(1);
  });
});
