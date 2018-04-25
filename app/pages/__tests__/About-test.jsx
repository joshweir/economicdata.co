import React from 'react';
import { shallow } from 'enzyme';
import Page from '../../pages/Page';
import About from '../../pages/About';
import AboutContainer from '../../containers/About';

describe('About page', () => {
  let mountedComponent;
  let props;

  const component = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <About {...props} />
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
      content: 'A full, downloadable history of economic data for a number of indicators accross a range of countries for free - no registration, no strings attached, just download the data.',
      name: 'description'
    }]);
    expect(pageComponentProps.title)
    .toEqual('About | EconomicData.co');
  });

  test('renders the <Page> component with <About> container as child', () => {
    const pageComponentProps = component().find(Page).props();
    expect(pageComponentProps.children.type).toEqual(AboutContainer);
  });
});
