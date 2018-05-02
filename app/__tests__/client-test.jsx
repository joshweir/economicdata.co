import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Index from '../client';
import initialState from '../tests/helpers/initialState';
import configureStore from '../store/configureStore';
import createRoutes from '../routes';

describe('client.jsx', () => {
  let renderedClient;
  let store;
  let history;
  let routes;

  const rendered = (state = initialState) => {
    if (!renderedClient) {
      global.window.__INITIAL_STATE__ = state;
      store = configureStore(initialState, browserHistory);
      history = syncHistoryWithStore(browserHistory, store);
      routes = createRoutes(store);
      renderedClient = Object.assign(
        {}, Index, { _reactInternalInstance: 'censored' });
    }
    return renderedClient;
  };

  test('renders without crashing', () => {
    expect(JSON.stringify(rendered())).toMatchSnapshot();
  });

  test('renders <Provider> passing store as props', () => {
    expect(JSON.stringify(rendered().props.store))
    .toEqual(JSON.stringify(store));
  });

  test('renders <Router> as children with props', () => {
    const renderedChildren = rendered().props.children;
    expect(renderedChildren.type).toEqual(Router);
    expect(JSON.stringify(renderedChildren.props.history))
    .toEqual(JSON.stringify(history));
    renderedChildren.props.onUpdate();
    expect(global.window.__INITIAL_STATE__).toEqual(null);
  });

  test('renders routes as children of <Router>', () => {
    expect(JSON.stringify(rendered().props.children.props.children))
    .toEqual(JSON.stringify(routes));
  });
});
