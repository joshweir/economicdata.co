import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Link, IndexLink } from 'react-router';
import sinon from 'sinon';
import NavItem
  from '../../components/NavItem';

describe('<NavItem />', () => {
  let props = {
    to: '/route',
    children: 'link content',
    onlyActiveOnIndex: true
  };
  let mountedComponent;
  let sandbox;

  const component = () => {
    mountedComponent = mount(
      <NavItem {...props} />
    );
    return mountedComponent;
  };

  const mockRouterWithSpies = (spies) => {
    const mockRouter = {
      isActive: sinon.spy(),
      push: sinon.spy(),
      replace: sinon.spy(),
      go: sinon.spy(),
      goBack: sinon.spy(),
      goForward: sinon.spy(),
      setRouteLeaveHook: sinon.spy()
    };
    return {...mockRouter, ...spies};
  };

  beforeEach(() => {
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
      props = {
        ...props,
        index: true,
        router: mockRouterWithSpies({isActive: routerIsActiveSpy})
      };
      const comp = component().find(IndexLink).first();
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
    it('renders a <Link> with to prop and children', () => {
      const routerIsActiveSpy = sinon.spy(() => false);
      props = {...props, router: mockRouterWithSpies({isActive: routerIsActiveSpy})};
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

  describe('when router.isActive is truthy', () => {
    it('renders the link component parent with "active" class', () => {
      const routerIsActiveSpy = sinon.spy(() => true);
      props = {...props, router: mockRouterWithSpies({isActive: routerIsActiveSpy})};
      expect(component().find('li.nav-item').hasClass('active')).toBeTruthy();
    });
  });

  describe('when router.isActive is falsy', () => {
    it('renders the link component parent without "active" class', () => {
      const routerIsActiveSpy = sinon.spy(() => false);
      props = {...props, router: mockRouterWithSpies({isActive: routerIsActiveSpy})};
      expect(component().find('li.nav-item').hasClass('active')).toBeFalsy();
    });
  });
});
