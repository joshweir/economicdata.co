import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/Page';
import LoginOrRegister from '../../pages/LoginOrRegister';
import LoginOrRegisterContainer from '../../containers/LoginOrRegister';

describe('LoginOrRegister page', () => {
  let mountedComponent;
  let props;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <LoginOrRegister {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {};
  });

  test('renders the <Page> component with metadata and title', () => {
    const pageComponentProps = component().find(Page).props();
    expect(pageComponentProps.meta)
    .toEqual([{
      content: 'Sign in to EconomicData.co',
      name: 'description'
    }]);
    expect(pageComponentProps.title)
    .toEqual('Sign In | EconomicData.co');
  });

  test('renders the <Page> component with <LoginOrRegister> container as child', () => {
    const pageComponentProps = component().find(Page).props();
    expect(pageComponentProps.children.type).toEqual(LoginOrRegisterContainer);
  });
});
