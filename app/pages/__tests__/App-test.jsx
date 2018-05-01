import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/Page';
import App from '../../pages/App';
import AppContainer from '../../containers/App';
import { title, meta, link } from '../assets';

describe('App page', () => {
  let mountedComponent;
  let props;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <App {...props} />
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
    .toEqual(meta);
    expect(pageComponentProps.title)
    .toEqual(title);
    expect(pageComponentProps.link)
    .toEqual(link);
  });

  test('renders the <Page> component with <App> container as child passing props to child', () => {
    const pageComponentProps = component().find(Page).props();
    expect(pageComponentProps.children.type).toEqual(AppContainer);
    expect(pageComponentProps.children.props.foo).toBe(props.foo);
  });
});
