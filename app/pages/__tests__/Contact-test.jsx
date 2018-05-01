import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/Page';
import Contact from '../../pages/Contact';
import ContactContainer from '../../containers/Contact';

describe('Contact page', () => {
  let mountedComponent;
  let props;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <Contact {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {foo: 'bar'};
  });

  test('renders the <Page> component with metadata, link and title', () => {
    const pageComponentProps = component().find(Page).props();
    expect(pageComponentProps.meta)
    .toEqual([{
      content: 'Get in touch with EconomicData.co',
      name: 'description'
    }]);
    expect(pageComponentProps.title)
    .toEqual('Contact Us | EconomicData.co');
  });

  test('renders the <Page> component with <Contact> container as child passing props to child', () => {
    const pageComponentProps = component().find(Page).props();
    expect(pageComponentProps.children.type).toEqual(ContactContainer);
    expect(pageComponentProps.children.props.foo).toBe(props.foo);
  });
});
