import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Index from '../client';
import initialState from '../tests/helpers/initialState';
import configureStore from '../store/configureStore';
import createRoutes from '../routes';
import { About, App, Contact, Country, CountryIndicator,
         LoginOrRegister } from '../pages';

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

  describe('Routes', () => {
    const rootRoute = rendered().props.children.props.children;
    const [
      indexRoute,
      loginRoute,
      aboutRoute,
      contactRoute,
      countryIndicatorRoute,
      countryRoute
    ] = rootRoute.props.children;

    test('root path renders the <App> page', () => {
      expect(rootRoute.type).toEqual(Route);
      expect(rootRoute.props.component).toEqual(App);
    });

    test('index route renders the <Country> page', () => {
      expect(indexRoute.type).toEqual(IndexRoute);
      expect(indexRoute.props.component).toEqual(Country);
    });

    test('login route matches "login" path and renders the <Country> page', () => {
      expect(loginRoute.type).toEqual(Route);
      expect(loginRoute.props.component).toEqual(LoginOrRegister);
      expect(loginRoute.props.path).toEqual('login');
    });

    test('login route matches "login" path and renders the <LoginOrRegister> page', () => {
      expect(loginRoute.type).toEqual(Route);
      expect(loginRoute.props.component).toEqual(LoginOrRegister);
      expect(loginRoute.props.path).toEqual('login');
    });

    test('about route matches "about" path and renders the <About> page', () => {
      expect(aboutRoute.type).toEqual(Route);
      expect(aboutRoute.props.component).toEqual(About);
      expect(aboutRoute.props.path).toEqual('about');
    });

    test('contact-us route matches "contact-us" path and renders the <Contact> page', () => {
      expect(contactRoute.type).toEqual(Route);
      expect(contactRoute.props.component).toEqual(Contact);
      expect(contactRoute.props.path).toEqual('contact-us');
    });

    test('country indicator route matches "data/:country/:indicator" path ' +
         'and renders the <CountryIndicator> page', () => {
      expect(countryIndicatorRoute.type).toEqual(Route);
      expect(countryIndicatorRoute.props.component).toEqual(CountryIndicator);
      expect(countryIndicatorRoute.props.path)
      .toEqual('data/:country/:indicator');
    });

    test('country route matches "data/:country" path ' +
         'and renders the <Country> page', () => {
      expect(countryRoute.type).toEqual(Route);
      expect(countryRoute.props.component).toEqual(Country);
      expect(countryRoute.props.path)
      .toEqual('data/:country');
    });
  });
});
