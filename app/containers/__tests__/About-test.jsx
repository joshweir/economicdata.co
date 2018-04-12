/*
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import About from '../../containers/About';
import * as AboutImage from '../../images/fx2.jpg';

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
    console.log('image!!!', AboutImage);
    const spy = sinon.spy(() => '../images/fx2.jpg');
    sandbox
    .stub(AboutImage, 'default')
    .callsFake(spy);
    //expect(component()).toExist();
  });
});
*/
