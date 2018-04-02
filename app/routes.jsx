import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchCountryData, fetchDefaultCountryData,
  fetchCountryIndicatorData } from './fetch-data';
import { About, App, Contact, Country, CountryIndicator,
         LoginOrRegister } from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Country} fetchData={fetchDefaultCountryData} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="about" component={About} />
      <Route path="contact-us" component={Contact} />
      <Route
        path="data/:country/:indicator"
        component={CountryIndicator}
        fetchData={fetchCountryIndicatorData}
      />
      <Route path="data/:country" component={Country} fetchData={fetchCountryData} />
    </Route>
  );
};
