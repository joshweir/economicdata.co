import React from 'react';
import { mount } from 'enzyme';
import About from '../../containers/About';

describe('<About />', () => {
  let props;
  let mountedComponent;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <About {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {};
    mountedComponent = undefined;
  });

  it('renders the <About> container', () => {
    expect(component()).toBeDefined();
  });
});
