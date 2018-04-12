import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Link, IndexLink, withRouter } from 'react-router';
import sinon from 'sinon';
import NavItem
  from '../../components/NavItem';

describe('<NavItem />', () => {
  let props;
  let mountedComponent;
  let sandbox;
  let routerMock;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <NavItem {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      to: '/route',
      children: 'link content',
      onlyActiveOnIndex: true
    };
    sandbox = sinon.sandbox.create();
    mountedComponent = undefined;
  });

  afterEach(() => {
    if (sandbox) {
      sandbox.restore();
    }
  });

  describe('when the index prop is truthy', () => {
    it('renders an <IndexLink> with to prop and children', () => {
      const routerIsActiveSpy = sinon.spy(() => false);
      routerMock = {
        isActive: routerIsActiveSpy
      }
      props = {...props, router: routerMock};

      const comp = component().find(Link).first();
      expect(comp.props().to).toBe(props.to);
      expect(
        routerIsActiveSpy
        .withArgs(props.to, props.onlyActiveOnIndex)
        .calledOnce
      ).toBeTruthy();
      expect(comp.props().children).toBe(props.children);
    });
  });

  describe('when the index prop is falsy', () => {

  });
});
