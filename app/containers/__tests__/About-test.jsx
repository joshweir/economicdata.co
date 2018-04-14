import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import About from '../../containers/About';

describe('<About />', () => {
  let props;
  let mountedComponent;
  let sandbox;

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
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders the <About> container', () => {
    expect(component()).toBeDefined();
  });
});
