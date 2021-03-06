import React from 'react';
import { mount } from 'enzyme';
import { Link, IndexLink } from 'react-router';
import NavItem
  from '../../components/NavItem';

describe('<NavItem />', () => {
  let props = {
    to: '/route',
    children: 'link content',
    onlyActiveOnIndex: true
  };
  let mountedComponent;

  const component = () => {
    mountedComponent = mount(
      <NavItem {...props} />
    );
    return mountedComponent;
  };

  const mockRouterWithSpies = (spies) => {
    const mockRouter = {
      isActive: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
      setRouteLeaveHook: jest.fn()
    };
    return {...mockRouter, ...spies};
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  describe('when the index prop is truthy', () => {
    test('renders an <IndexLink> with to prop and children', () => {
      const routerIsActiveSpy = jest.fn();
      routerIsActiveSpy.mockReturnValue(false);
      props = {
        ...props,
        index: true,
        router: mockRouterWithSpies({isActive: routerIsActiveSpy})
      };
      const comp = component().find(IndexLink).first();
      expect(comp.props().to).toBe(props.to);
      expect(routerIsActiveSpy)
      .toBeCalledWith(props.to, props.onlyActiveOnIndex);
      expect(routerIsActiveSpy.mock.calls.length).toBe(1);
      expect(comp.props().children).toBe(props.children);
    });
  });

  describe('when the index prop is falsy', () => {
    test('renders a <Link> with to prop and children', () => {
      const routerIsActiveSpy = jest.fn();
      routerIsActiveSpy.mockReturnValue(false);
      props = {...props, router: mockRouterWithSpies({isActive: routerIsActiveSpy})};
      const comp = component().find(Link).first();
      expect(comp.props().to).toBe(props.to);
      expect(routerIsActiveSpy)
      .toBeCalledWith(props.to, props.onlyActiveOnIndex);
      expect(routerIsActiveSpy.mock.calls.length).toBe(1);
      expect(comp.props().children).toBe(props.children);
    });
  });

  describe('when router.isActive is truthy', () => {
    test('renders the link component parent with "active" class', () => {
      const routerIsActiveSpy = jest.fn();
      routerIsActiveSpy.mockReturnValue(true);
      props = {...props, router: mockRouterWithSpies({isActive: routerIsActiveSpy})};
      expect(component().find('li.nav-item').hasClass('active')).toBeTruthy();
    });
  });

  describe('when router.isActive is falsy', () => {
    test('renders the link component parent without "active" class', () => {
      const routerIsActiveSpy = jest.fn();
      routerIsActiveSpy.mockReturnValue(false);
      props = {...props, router: mockRouterWithSpies({isActive: routerIsActiveSpy})};
      expect(component().find('li.nav-item').hasClass('active')).toBeFalsy();
    });
  });
});
