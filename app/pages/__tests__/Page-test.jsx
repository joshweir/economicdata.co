import React from 'react';
import { shallow } from 'enzyme';
import Helmet from 'react-helmet';
import Page from '../../pages/Page';

describe('Page page', () => {
  let mountedComponent;
  let props;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <Page {...props}><div className="the-child" /></Page>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      title: 'the title',
      meta: [{
        name: 'description',
        content: 'the meta'
      }],
      link: ['the link']
    };
  });

  test('renders the <Helmet> component with metadata and title', () => {
    const helmetComponentProps = component().find(Helmet).props();
    expect(helmetComponentProps.meta)
    .toEqual(props.meta);
    expect(helmetComponentProps.title)
    .toEqual(props.title);
  });

  test('renders the <Page> component with <About> container as child', () => {
    const children = component().children();
    expect(children.length).toEqual(2);
    expect(children.find('.the-child').length).toEqual(1);
  });
});
